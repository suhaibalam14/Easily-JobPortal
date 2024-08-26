export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static getAllUsers() {
    return users;
  }
  static addUser(name, email, password) {
    const newUser = new UserModel(users.length + 1, name, email, password);
    users.push(newUser);
  }

  static isUserRegistered(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }
}

var users = [
  {
    id: 1,
    name: "Adam",
    email: "adam@gmail.com",
    password: "Password@123",
  },
  {
    id: 2,
    name: "Eve",
    email: "eve@gmail.com",
    password: "Password@123",
  },
  {
    id: 3,
    name: "Suhaib",
    email: "suhaib@gmail.com",
    password: "Password@123",
  },
];
