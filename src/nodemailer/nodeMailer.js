import nodemailer from "nodemailer";

export async function sendMail(name, email, job) {
  //create a mail transport-SMTP
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "suhaibalam142@gmail.com",
      pass: "tyna bjfd vifw rpla",
    },
  });

  //configure email
  const mailOptions = {
    from: "suhaibalam142@gmail.com",
    to: email,
    subject: `Thank you for applying to ${job.jobDesignation} at ${job.companyName}`,
    html: `


      <p>Dear <strong>${name}</strong>,</p>

      <img src="https://www.shutterstock.com/image-vector/illustration-calligraphic-inscription-congratulations-vector-600nw-2458690315.jpg" alt="" style="display: block; margin: 0 auto 20px;"> 

      <p>Thank you for your interest in the <strong>${job.jobDesignation}</strong> position at <strong>${job.companyName}</strong>. We have received your application and appreciate you taking the time to apply.</p>

      <p>We are currently reviewing all applications and will be in touch with you soon regarding the next steps in the hiring process.</p>

      <p>In the meantime, feel free to visit our website or follow us on social media to learn more about our company and culture.</p>

      <p>Thank you again for your application. We wish you all the best in your job search!</p>

      <p>Sincerely,</p>
      <p>The <strong>${job.companyName}</strong> Team</p>
    `
  };
  //send email
  try {
    const result = transport.sendMail(mailOptions);
    console.log("mail send successfully");
  } catch (err) {
    console.log("Mail error: " + err);
  }
}
// sendMail();
