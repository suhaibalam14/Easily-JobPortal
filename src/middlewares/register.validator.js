import { body, validationResult } from "express-validator";

const registrationValidator = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is empty!"),
    body("email")
      .notEmpty()
      .withMessage("Email is empty!")
      .trim()
      .isEmail()
      .withMessage("Invalid email!"),
    body("password")
      .notEmpty().withMessage('Password must not be empty!')
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)
      .withMessage("Password must contain at least one special character"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  var validationErrors = validationResult(req);

  if (!validationErrors.isEmpty())
    return res.render("login-register", {
      error: null,
      success:null,
      msg: null,
      registrationError: validationErrors.array()[0].msg,
      loginError:null
    });
  next();
};

export default registrationValidator;
