import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin Zeyd",
    email: "zeyd@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    saved: ["6046d84baddf7020b0078ab9"],
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
