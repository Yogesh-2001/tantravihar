import userModel from "../models/userModel.js";
import noticeModel from "../models/noticeModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import placementModel from "../models/placementModel.js";
// const placed = require("../models/placementModel.js").default
import profileModel from "../models/profileModel.js";
import allPlacementModel from "../models/allPlacementModel.js";
import materialModel from "../models/placementMaterialModel.js";
import testModel from "../models/testModel.js";
import { transporter } from "../server.js";
export const addStudents = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //validations

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered ",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    // Otherwise, return a generic error message
    res.status(500).json({ error: "Server error" });
  }
};

export const addNotice = async (req, res) => {
  try {
    const notice = new noticeModel(req.body);
    await notice.save();
    res.status(200).json({ success: true, message: "notice added success" });
  } catch (error) {
    res.status(501).json({
      message: "Failed to add notice",
      success: false,
    });
  }
};

export const addPlacement = async (req, res) => {
  try {
    if (req.file.size > 1024 * 1024 * 2) {
      return res
        .status(400)
        .json({ message: "File size should not exceed 2MB" });
    }
    const notice = new placementModel({
      ...req.body,
      jdfile: req.file.filename,
    });
    await notice.save();
    await getEmails(req.body.companyName, req.body.lastApplyDate);

    res.status(200).json({ success: true, message: "placement added success" });
  } catch (error) {
    res.status(501).json({
      message: "Failed to add placement",
      success: false,
      error: error,
    });
  }
};
const getEmails = async (companyName, lastApplyDate) => {
  const Emails = await profileModel.find({}, "user").populate("user", "email");
  const emails = Emails?.map((entry) => entry.user.email);
  console.log(emails);
  sendMail(emails, companyName, lastApplyDate);
};

const sendMail = (Emails, companyName, lastApplyDate) => {
  var mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: Emails,
    subject: "New Placement Drive Added - TPO cell vidyalankar",
    template: "placement",
    context: {
      companyName: companyName,
      lastApplyDate: new Date(lastApplyDate).toDateString(),
    },
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      return true;
    }
  });
};

export const allstudents = async (req, res) => {
  try {
    const allstudents = await profileModel.find({}).populate("user");
    const allCompanies = await placementModel.find({});
    res.status(200).json({ allstudents, allCompanies });
  } catch (error) {
    res.status(501).json({
      message: "Failed to fetch students",
      success: false,
      error: error,
    });
  }
};

export const addPlacedStudent = async (req, res) => {
  try {
    // profileModel.updateMany({_id:{$in:}})
    allPlacementModel.insertMany(req.body, (err, resp) => {
      res.status(200).send({ message: "placed students added successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "student adding failed",
      success: false,
      error: error,
    });
  }
};

export const getAllPlaced = async (req, res) => {
  try {
    const allplaced = await allPlacementModel.find({});
    const aggrcount = await allPlacementModel.aggregate([
      { $group: { _id: "$company", count: { $sum: 1 } } },
    ]);

    const branchCount = await allPlacementModel.aggregate([
      { $group: { _id: "$branch", count: { $sum: 1 } } },
    ]);

    res.status(200).json({ allplaced, aggrcount, branchCount });
  } catch (error) {
    res.status(501).json({
      message: "fetch  failed",
      success: false,
      error: error,
    });
  }
};

export const createTest = async (req, res) => {
  const newTest = new testModel(req.body);

  newTest.save((err, test) => {
    if (err) {
      console.log(err);
      res.status(501).json({ message: "Test Creation failed" });
    } else {
      res.status(200).json({ message: "Test Created Success" });
    }
  });
};

export const getAllPlacedStudents = async (req, res) => {
  try {
    allPlacementModel
      .find({})
      .populate({
        path: "placedStudentList",
        select: "user branch photourl -_id name email",
        populate: [
          {
            path: "user",
            select: "name email",
          },
          {
            path: "branch",
            select: "branch",
          },
        ],
      })
      .populate({
        path: "driveId",
        select: "companyName packagePlaced -_id",
      })
      .select("-__v")
      .exec((err, result) => {
        if (err) {
          // handle error
        }
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const AddPlacementMaterial = (req, res) => {
  if (req.file.size > 1024 * 1024 * 2) {
    return res.status(400).json({ message: "File size should not exceed 2MB" });
  }
  materialModel
    .create({ ...req.body, material: req.file.filename })
    .then((response) => {
      res.status(200).send("Added new material");
    })
    .catch((error) => {
      console.log(error);
      res.status(501).send("Failed to add material");
    });
};

export const addNotification = async (req, res) => {
  try {
    const newNotification = req.body.message;
    const users = await profileModel.find();
    users.forEach(async (user) => {
      user.unreadnotifications.push({
        message: newNotification,
      });
      await user.save();
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
};
