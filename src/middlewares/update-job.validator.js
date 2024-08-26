import { body, validationResult } from "express-validator";
import JobModel from "../models/job.model.js";

const updateJobValidator = async (req, res, next) => {
  const rules = [
    body("jobLocation").notEmpty().withMessage("Location is empty!"),
    body("companyName").notEmpty().withMessage("Company name is empty!"),
    body("salary").notEmpty().withMessage("Salary is empty!"),
    body("numberOfOpenings")
      .notEmpty()
      .withMessage("Open positions is empty")
      .isInt({ gt: 0 })
      .withMessage("Open positions must be greater than 0"),
    body("skillsRequired").notEmpty().withMessage("Skills required is empty!"),
    body("applyBy").notEmpty().withMessage("Date is empty"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  var validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const id = req.body.id;
    const job = JobModel.getJob(id);

    return res.render("update-form", {
      userEmail: req.session.userEmail,
      updateError: validationErrors.array()[0].msg,
      job: job,
      userName: req.session.userName,
    });
  }

  next();
};

export default updateJobValidator;
