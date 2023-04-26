import profileModel from "../models/profileModel.js";
import placementModel from "../models/placementModel.js";
import { ObjectId } from "mongodb";
import testModel from "../models/testModel.js";
import noticeModel from "../models/noticeModel.js";
import placementMaterialModel from "../models/placementMaterialModel.js";
export const createProfileCtrl = async (req, res) => {
  try {
    const profile = new profileModel({
      ...req.body,
      photourl: req.files.photourl[0].filename,
      resume: req.files.resume[0].filename,
    });
    await profile.save();
    res.status(200).json({ message: "profile created success", success: true });
  } catch (error) {
    res.status(500).json({
      message: "profile creation failed",
      success: false,
      error: error.message,
    });
  }
};

export const getAllDrives = async (req, res) => {
  try {
    const alldrives = await placementModel.find({}).populate("postedBy");
    res.status(200).json(alldrives);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch all drives", error });
  }
};

export const getallplacedcompanies = async (req, res) => {
  try {
    const allcompanies = await profileModel.find(
      { userId: req.params.id },
      { placedData: 1 }
    );
    res.status(200).send(allcompanies);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch placed data" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const getprofile = await profileModel
      .find({ _id: req.params.id })
      .populate("user");
    res.status(200).json(getprofile);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch placed data" });
  }
};

export const getProfileUrl = async (req, res) => {
  try {
    const getprofile = await profileModel
      .find({ user: req.params.id })
      .populate("drivesApplied");

    res.status(200).json(getprofile);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch placed data" });
  }
};

export const updateProfile = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  // if (req.files) {
  //   if (req.files?.photourl[0]) {
  //     req.body.photourl = req.files.photourl[0].filename;
  //   } else if (req.files?.resume[0]) {
  //     req.body.resume = req.files.resume[0].filename;
  //   } else if (req.files?.photourl[0] && req.files?.resume[0]) {
  //     req.body.photourl = req.files.photourl[0].filename;
  //     req.body.resume = req.files.resume[0].filename;
  //   }
  // }

  try {
    profileModel.findOneAndUpdate(
      { user: req.body.user },
      req.body,
      { new: true },
      (err, detail) => {
        // Handle any possible database errors
        if (err) return res.status(500).send("failed to update profile");
        return res
          .status(200)
          .send({ message: "profile updated success", detail });
      }
    );
  } catch (error) {
    res.status(501).json({ message: "failed to update details" });
  }
};

export const getDrive = async (req, res) => {
  try {
    const drive = await placementModel
      .findById(req.params.id)
      .populate("postedBy");
    res.status(200).json(drive);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch drive" });
  }
};

export const applyDrive = async (req, res) => {
  try {
    var { id } = req.params;

    const userId = req.body.userId;
    const profile = await profileModel.findOne({ user: userId });
    await placementModel.findByIdAndUpdate(
      { _id: id },
      {
        $push: { applicants: profile._id },
      },
      { new: true }
    );

    const updatedprofile = await profileModel.findOneAndUpdate(
      { user: userId },
      {
        $push: { drivesApplied: id },
      },
      { new: true }
    );

    res.status(200).json({ message: "applied to drive success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "applied to drive failed", error });
  }
};

export const getAllAppliedDrives = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await profileModel.findOne({ user: id });
    res.status(200).json(list.drivesApplied);
  } catch (error) {
    res.status(500).json({ message: "failed to fetch applied drive", error });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await testModel.find({});
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getAllAddedMaterial = async (req, res) => {
  try {
    const materials = await placementMaterialModel.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    const user = await profileModel.findOne({ user: req.params.id });
    res
      .status(200)
      .json({ read: user.readnotifications, unread: user.unreadnotifications });
  } catch (error) {
    res.status(501).send(error);
  }
};

export const markNotificationsRead = async (req, res) => {
  try {
    const user = await profileModel.findOne({ user: req.params.id });
    // Push all unread notifications to the read notifications array
    user.readnotifications.push(...user.unreadnotifications);
    // Empty the unread notifications array
    user.unreadnotifications = [];
    // Save the updated profile
    await user.save();
    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).send("Server error", error);
  }
};

export const getNotices = async (req, res) => {
  try {
    const notices = await noticeModel.find({});
    res.status(200).json(notices);
  } catch (error) {
    res.status(501).send("Failed to fetch notices");
  }
};
