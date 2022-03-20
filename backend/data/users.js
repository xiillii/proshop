import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'mail@josealonso.dev',
    password: bcrypt.hashSync(
      '123456',
      Number(process.env.PASSWORD_HASH_LENGTH)
    ),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'jdoe@josealonso.dev',
    password: bcrypt.hashSync(
      '123456',
      Number(process.env.PASSWORD_HASH_LENGTH)
    ),
  },
  {
    name: 'Jane Doe',
    email: 'janed@josealonso.dev',
    password: bcrypt.hashSync(
      '123456',
      Number(process.env.PASSWORD_HASH_LENGTH)
    ),
  },
];

export default users;
