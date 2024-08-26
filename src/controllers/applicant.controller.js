import ApplicantModel, { applicants } from "../models/applicant.model.js";
import JobModel from "../models/job.model.js";
import { sendMail } from "../nodemailer/nodeMailer.js";

export default class ApplicantController {
  getAllApplicants(req, res) {
    res.render("applicant-list", { applicants: applicants });
  }
  getRecApplicant(req, res) {
    const jobId = req.params.id;
    const recruiterId = req.session.userId;
    const job = JobModel.getJob(jobId);
    const recApplicants = ApplicantModel.filterApplicant(jobId, recruiterId); 
    res.render("applicant-list", {
      applicants: recApplicants,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
      job: job,
    });
  }

  getApply(req, res) {
    const jobId = req.params.id;
    const job = JobModel.getJob(jobId);
    res.render("apply", {
      job: job,
      error:null
    });
  }

  postApply(req, res) {
    const {recruiterId, jobId, name, email, contact } = req.body;
    const resumeUrl = '/resumes/' + req.file.filename;
    const job = JobModel.getJob(jobId);
    const newApplicant = ApplicantModel.add(recruiterId, jobId, name, email, contact, resumeUrl);
    sendMail(name, email, job)
    res.render('applied',{
      name:name
    })
  }
}
