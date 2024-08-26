export default class JobModel {
  constructor(
    id,
    recruiterId,
    jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    applyBy,
    skillsRequired,
    numberOfOpenings
  ) {
    this.id = parseInt(id);
    this.recruiterId = parseInt(recruiterId);
    this.jobCategory = jobCategory;
    this.jobDesignation = jobDesignation;
    this.jobLocation = jobLocation;
    this.companyName = companyName;
    this.salary = salary;
    this.numberOfOpenings = parseInt(numberOfOpenings);
    this.skillsRequired = skillsRequired;
    this.applyBy = applyBy;
  }
  static filterJobs(userId) {
    const filteredJobs = jobs.filter((j) => j.recruiterId == userId);
    return filteredJobs;
  }

  static addNewJob(
    recruiterId,
    jobCategory,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    applyBy,
    skillsRequired,
    numberOfOpenings
  ) {
    let newJob = new JobModel(
      jobs.length + 1,
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

    jobs.push(newJob);
    return newJob;
  }

  static getJob(id) {
    const job = jobs.find((j) => j.id == id);
    return job;
  }

  static update(job) {
    const index = jobs.findIndex(
      (i) => i.id == job.id && i.recruiterId == job.recruiterId
    );
    jobs[index] = job;
  }
  static deleteJob(id) {
    const index = jobs.findIndex((i) => i.id == id);
    const job = jobs.splice(index, 1);
    return job;
  }
  static filterSearchJobs(input){
    const filteredJobs = jobs.filter(j=>j.companyName.toLowerCase().includes(input.toLowerCase()))
    return filteredJobs;
  }
}

export var jobs = [
  new JobModel(
    1,
    1,
    "Technology",
    "Software Engineer",
    "Bangalore",
    "Google",
    "15-20",
    "2023-09-10",
    "JavaScript, React, Node.js",
    5
  ),
  new JobModel(
    2,
    1,
    "Marketing",
    "Digital Marketing Specialist",
    "Mumbai",
    "Amazon",
    "8-12",
    "2023-08-25",
    "SEO, SEM, Social Media Marketing",
    2
  ),
  new JobModel(
    3,
    2,
    "Finance",
    "Financial Analyst",
    "Delhi",
    "JPMorgan Chase",
    "12-16",
    "2023-09-05",
    "Financial Modeling, Excel, Data Analysis",
    1
  ),
  new JobModel(
    4,
    3,
    "Healthcare",
    "Registered Nurse",
    "Chennai",
    "Apollo Hospitals",
    "5-7",
    "2023-08-31",
    "Nursin,Patient Car,Critical Care",
    10,
    "2023-08-18 09:00 AM"
  ),
  new JobModel(
    5,
    1,
    "Technology",
    "Front-End Developer",
    "Bengaluru",
    "Wipro",
    "8-12",
    "2024-09-05",
    "HTML, CSS, JavaScript, React",
    3
  ),
  new JobModel(
    6,
    2,
    "Marketing",
    "Content Marketing Manager",
    "Mumbai",
    "Hindustan Unilever",
    "10-15",
    "2024-09-30",
    "Content Strategy, SEO, Social Media",
    1
  ),
  new JobModel(
    7,
    3,
    "Finance",
    "Accountant",
    "Delhi",
    "Ernst & Young",
    "6-9",
    "2024-09-10",
    "Accounting, Taxation, Excel",
    2
  ),
  new JobModel(
    8,
    1,
    "Healthcare",
    "Medical Coder",
    "Chennai",
    "Apollo Hospitals",
    "4-6",
    "2024-08-30",
    "Medical Terminology, Coding, ICD-10",
    4
  ),
  new JobModel(
    9,
    3,
    "Sales",
    "Sales Representative",
    "Hyderabad",
    "Amazon",
    "7-10",
    "2024-09-25",
    "Sales, Communication, Customer Relationship",
    6
  ),
];
