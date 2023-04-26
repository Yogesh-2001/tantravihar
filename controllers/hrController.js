import allPlacementModel from "../models/allPlacementModel.js";
import placementModel from "../models/placementModel.js";
import profileModel from "../models/profileModel.js";
import { transporter } from "../server.js";

export const getAllDrives = async (req, res) => {
  try {
    const { id } = req.params;
    const allDrives = await placementModel.find({ postedBy: id });

    res.status(200).json({ drives: allDrives });
  } catch (error) {
    res.status(501).json({
      message: "Failed to fetch  drive",
      success: false,
      error: error,
    });
  }
};

export const getParticularDrive = async (req, res) => {
  try {
    const { id } = req.params;
    const Drive = await placementModel.findById(id).populate({
      path: "applicants",
      model: "profile-details",
      populate: {
        path: "user",
        model: "users",
        select: "name email",
      },
    });

    res.status(200).json(Drive);
  } catch (error) {
    res.status(501).json({
      message: "Failed to fetch  drive",
      success: false,
      error: error,
    });
  }
};

export const placeStudents = async (req, res) => {
  const { driveId, studentIds, Package } = req.body;

  // create a new StudentPlacement document in the database
  const studentPlacement = new allPlacementModel({
    driveId,
    placedStudentList: studentIds,
    packagePlaced: Package,
    placedOn: Date.now(),
  });

  const Emails = await profileModel
    .find({ _id: { $in: studentIds } }, "user")
    .populate("user", "email");

  await profileModel.updateMany(
    { _id: { $in: studentIds } },
    { $set: { placed: true } }
  );
  const companyName = await placementModel
    .findById(driveId)
    .select("-_id companyName");

  try {
    // save the document to the database
    await studentPlacement.save();
    // update profile details of each student placed
    for (let i = 0; i < studentIds.length; i++) {
      const student = await profileModel.findById(studentIds[i]);
      student.placedData.push({
        driveId,
        Package,
        placedOn: Date.now(),
      });
      await student.save();
    }

    sendMail(Emails, companyName, Package);

    res
      .status(200)
      .json({ success: true, message: "students placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

const sendMail = (Emails, companyName, Package) => {
  var mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: Emails,
    subject: "TPO cell vidyalankar",
    template: "email",
    context: {
      company: companyName,
      package: Package,
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
