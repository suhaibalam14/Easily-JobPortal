export default class ApplicantModel {
  constructor(id, recruiterId, jobId, name, email, contact, resumeUrl) {
    this.id = id;
    this.recruiterId = recruiterId;
    this.jobId = jobId;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resumeUrl = resumeUrl;
  }
  static filterApplicant(jobId, recruiterId) {
    const recApplicant = applicants.filter(
      (a) => a.jobId == jobId && a.recruiterId == recruiterId
    );
    return recApplicant;
  }

  static add(recruiterId, jobId, name, email, contact, resumeUrl) {
    const newApplicant = new ApplicantModel(
      applicants.length + 1,
      recruiterId,
      jobId,
      name,
      email,
      contact,
      resumeUrl
    );
    applicants.push(newApplicant)
    return newApplicant;
  }
}

export var applicants = [
  new ApplicantModel(
    1,
    1,
    1,
    "John Doe",
    "john.doe@example.com",
    9876543210,
    "/resumes/resume-1.pdf"
  ),
  new ApplicantModel(
    2,
    1,
    1,
    "Jane Smith",
    "jane.smith@example.com",
    8765432109,
    "/resumes/resume-2.pdf"
  ),
  new ApplicantModel(
    3,
    3,
    3,
    "Michael Brown",
    "michael.brown@example.com",
    7654321098,
    "/resumes/resume-3.pdf"
  ),
  new ApplicantModel(
    4,
    1,
    7,
    "Emily Davis",
    "emily.davis@example.com",
    6543210987,
    "/resumes/resume-4.pdf"
  ),
  new ApplicantModel(
    5,
    2,
    9,
    "David Wilson",
    "david.wilson@example.com",
    5432109876,
    "/resumes/resume-5.pdf"
  ),
  new ApplicantModel(
    6,
    1,
    1,
    "Olivia Taylor",
    "olivia.taylor@example.com",
    4321098765,
    "/resumes/resume-6.pdf"
  ),
];
