import bcrypt from 'bcryptjs/dist/bcrypt';

const users = [
  {
    name: 'Admin User',
    email: 'mail@josealonso.dev',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'jdoe@josealonso.dev',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane Doe',
    email: 'janed@josealonso.dev',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
