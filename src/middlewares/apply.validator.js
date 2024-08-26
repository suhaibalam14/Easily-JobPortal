import { body, validationResult } from "express-validator";
import JobModel from "../models/job.model.js";

const applyValidator = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is empty!"),
    body("email")
      .notEmpty()
      .withMessage("Email is empty!")
      .isEmail()
      .withMessage("Invalid email"),
    body("contact")
      .notEmpty()
      .withMessage("Contact number is empty!")
      .isMobilePhone("en-IN")
      .withMessage("Invalid contact number format"),
    body("resumeUrl").custom((value, { req }) => {
      if (!req.file) throw new Error("Resume file is required!");
      return true;
    }),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  var validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const id = req.body.jobId;
    const job = JobModel.getJob(id);
    return res.render("apply", {
      error: validationErrors.array()[0].msg,
      job: job,
    });
  }

  next();
};

export default applyValidator;
