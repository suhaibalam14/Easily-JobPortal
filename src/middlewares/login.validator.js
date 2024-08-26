import { body, validationResult } from "express-validator";

const loginValidator = async (req, res, next) => {
  const rules = [
    body("email")
      .notEmpty()
      .withMessage("Email is empty!")
      .trim()
      .isEmail()
      .withMessage("Invalid email!"),
    body("password")
      .notEmpty().withMessage('Password must not be empty!')
      .isLength({ min: 8 })
      .withMessage("Invalid password")
      .matches(/[A-Z]/)
      .withMessage("Invalid password")
      .matches(/[a-z]/)
      .withMessage("Invalid password")
      .matches(/[0-9]/)
      .withMessage("Invalid password")
      .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)
      .withMessage("Invalid password"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  var validationErrors = validationResult(req);

  if (!validationErrors.isEmpty())
    return res.render("login-register", {
      error: null,
      success:null,
      msg: null,
      registrationError: null,
      loginError: validationErrors.array()[0].msg,
    });
  next();
};

export default loginValidator;
