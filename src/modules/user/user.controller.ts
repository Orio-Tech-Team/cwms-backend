import { Request, Response } from "express";
import UserDTO from "./dto/user.dto";
import User from "./user.model";
import bcrypt from "bcryptjs";
import generateAccessToken from "../../functions/generate_token";
//
export const login = async (req: Request, res: Response) => {
  const { user_id, password } = req.body;
  if (user_id != "" && password != "") {
    const user = await User.findOne({ where: { user_id } });
    if (!user) {
      return res.json({
        message: "User not found!",
        data: [],
        status: 404,
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken(user.id, user.type);
      return res.json({
        message: "Login Successfully!",
        data: [
          {
            token: accessToken,
          },
        ],
        status: 200,
      });
    } else {
      return res.json({
        data: [],
        message: "Invalid email or password!",
        status: 400,
      });
    }
  }

  return res.json({
    message: "user_id and password cannot be empty!",
    status: 500,
    data: [],
  });
};
//
export const register = async (req: Request, res: Response) => {
  const user_data: UserDTO = req.body;

  console.log(user_data);

  if (user_data.user_id == "" || user_data.password == "") {
    return res.json({
      message: "Please Insert UserId and Password!",
      status: 500,
      data: [],
    });
  }

  const user_already_exist: boolean = await userCheckerFunction(
    user_data.user_id
  );
  const email_already_exist: boolean = await userEmailCheckerFunction(
    user_data.email
  );

  if (user_already_exist) {
    return res.json({
      message: "User Already Exist!",
      status: 500,
      data: [],
    });
  }
  if (email_already_exist) {
    return res.json({
      message: "Email Already Exist!",
      status: 500,
      data: [],
    });
  }
  //   Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(user_data.password, salt);
  //
  // Create User
  const user = await User.create({
    ...user_data,
    password: hashedPassword,
  });
  //
  if (user) {
    const accessToken = generateAccessToken(user.id, user.type);
    return res.json({
      message: "User Created Successfully",
      status: 200,
      data: [
        {
          token: accessToken,
        },
      ],
    });
  }
  return res.json({
    message: "Invalid Data!",
    status: 500,
    data: [],
  });
  //
};
//
export const findAll = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.findAll({
      attributes: [
        "id",
        "user_name",
        "user_id",
        "account_number",
        "email",
        "phone_number",
        "status",
      ],
    });
    return res.json({
      message: "Success",
      status: 200,
      data: allUsers,
    });
  } catch (err: any) {
    return res.json({
      data: [],
      message: err.message,
      status: 500,
    });
  }
};
//
const userCheckerFunction = async (user_id: string): Promise<boolean> => {
  const UserExist = await User.findOne({
    where: {
      user_id,
    },
  });

  if (UserExist) return true;
  return false;
};
const userEmailCheckerFunction = async (email: string): Promise<boolean> => {
  const UserExist = await User.findOne({
    where: {
      email,
    },
  });

  if (UserExist) return true;
  return false;
};
//
