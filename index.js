import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import UserController from "./src/controllers/user.controller.js";
import JobController from "./src/controllers/job.controller.js";
import registrationValidator from "./src/middlewares/register.validator.js";
import { auth } from "./src/middlewares/auth.middleware.js";
import newPostValidator from "./src/middlewares/newJob.validator.js";
import updateJobValidator from "./src/middlewares/update-job.validator.js";
import ApplicantController from "./src/controllers/applicant.controller.js";
import { uploadFile } from "./src/middlewares/fileUpload.middleware.js";
import applyValidator from "./src/middlewares/apply.validator.js";
import { setLastVisit  } from "./src/middlewares/lastVisit.middleware.js";
import cookieParser from "cookie-parser";
import loginValidator from "./src/middlewares/login.validator.js";

const app = express();

//parse form data
app.use(express.urlencoded({ extended: true }));

//view engines
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));
app.use(express.static("public"));
app.use(expressEjsLayouts);
app.use(express.json());
app.use(cookieParser())
app.use(setLastVisit)

//session
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const userController = new UserController();
const jobController = new JobController();
const applicantController = new ApplicantController();

app.get("/", userController.home);

//user related api - login and register
app.get("/getAllUsers", userController.getAllUsers);
app.get("/recruiter", userController.getLoginRegister);
app.post("/register", registrationValidator, userController.postRegister);
app.post("/login", loginValidator, userController.postLogin);

//job seeker api - list all jobs from all recruiters
app.get("/jobs", jobController.getAllJobs);
app.get("/jobs/uniJob/:id", jobController.uniJob);
app.get("/jobs/uniJobApplicant/:id", jobController.uniJobApplicant);

//recruiters jog page
app.get("/recJob", auth, userController.recJob);
app.get("/recruiter/addJob", auth, jobController.newJobForm);
app.post("/recruiter/addJob", auth, newPostValidator, jobController.addNewJob);
app.get("/recruiter/getUpdateForm/:id", auth, jobController.getUpdateForm);
app.post(
  "/recruiter/postUpdateForm",
  auth,
  updateJobValidator,
  jobController.postUpdateJob
);
app.get("/recruiter/delete/:id", auth, jobController.deletePost);

//Specific recruiter's applicants
app.get("/recruiter/applicant/:id", auth, applicantController.getRecApplicant);

//get all applicants
app.get("/applicants", applicantController.getAllApplicants);

//apply to jobs
app.get("/getApply/:id", applicantController.getApply);
app.post(
  "/postApply",
  uploadFile.single("resumeUrl"),
  applyValidator,
  applicantController.postApply
);

//logout
app.get("/logout", userController.logout);

//search
app.post('/search', jobController.search)

//Not found
app.use((req, res) => {
  res.render("not-found");
});


//server listening
app.listen(4000, () => {
  console.log("Server is listening @ http://localhost:4000");
});
