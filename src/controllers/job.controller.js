import JobModel, { jobs } from "../models/job.model.js";

export default class JobController {
  getAllJobs(req, res) {
    res.render("job-list", {
      jobs: jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  addNewJob(req, res) {
    const {
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      applyBy,
      skillsRequired,
      numberOfOpenings,
    } = req.body;

    const recruiterId = req.session.userId;
    JobModel.addNewJob(
      recruiterId,
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      applyBy,
      skillsRequired,
      numberOfOpenings
    );
    const recPost = JobModel.filterJobs(recruiterId);
    return res.render("rec-job", {
      jobs: recPost,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });

  }

  newJobForm(req, res) {
    res.render("job-post", {
      userEmail: req.session.userEmail,
      postError: null,
      userName: req.session.userName,
    });
  }

  uniJob(req, res) {
    const id = req.params.id;
    const job = JobModel.getJob(id);
    res.render("uniJob", {
      job: job,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  uniJobApplicant(req, res) {
    const id = req.params.id;
    const job = JobModel.getJob(id);
    res.render("uniJob-applicant", {
      job: job,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  getUpdateForm(req, res) {
    const id = req.params.id;
    const job = JobModel.getJob(id);
    res.render("update-form", {
      userName: req.session.userName,
      userEmail: req.session.userEmail,
      updateError: null,
      job: job,
    });
  }

  postUpdateJob(req, res) {
    JobModel.update(req.body);
    const recruiterId = req.session.userId;
    const jobs = JobModel.filterJobs(recruiterId);
    return res.render("rec-job", {
      jobs: jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
  deletePost(req, res) {
    const id = req.params.id;
    const job = JobModel.deleteJob(id);
    const recruiterId = req.session.userId;
    const jobs = JobModel.filterJobs(recruiterId);
    return res.render("rec-job", {
      jobs: jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }


  search(req, res){
    const input = req.body.input;
    const filteredJobs = JobModel.filterSearchJobs(input)
    res.render("job-list", {
      jobs: filteredJobs,
    });
  }

}
