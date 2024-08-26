import UserModel from "../models/user.model.js";
import { jobs } from "../models/job.model.js";
import JobModel from "../models/job.model.js";

export default class UserController {
  home(req, res) {
    res.render("index", {
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  getAllUsers(req, res) {
    const users = UserModel.getAllUsers();
    res.status(200).send(users);
  }
  getLoginRegister(req, res) {
    res.render("login-register", {
      msg: null,
      error: null,
      registrationError: null,
      success: null,
      loginError: null
    });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.addUser(name, email, password);
    res.render("login-register", {
      msg: "Registration successfull!",
      error: null,
      registrationError: null,
      success: null,
      loginError:null
    });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isUserRegistered(email, password);
    if (!user) {
      res.render("login-register", {
        msg: null,
        error: "Invalid credentials!",
        success: null,
        registrationError: null,
        loginError:null
      });
    } else {
      req.session.userEmail = email;
      req.session.userName = user.name;
      req.session.userId = user.id;

      const recPost = JobModel.filterJobs(user.id);
      return res.render("rec-job", {
        jobs: recPost,
        userEmail: req.session.userEmail,
        userName: req.session.userName,
      });
    }
  }

  recJob(req, res) {
    const recPost = JobModel.filterJobs(req.session.userId);
    return res.render("rec-job", {
      jobs: recPost,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) console.log("Error:" + err);
    });
    res.redirect("/");
  }
}
