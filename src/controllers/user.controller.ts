import { NextFunction, Request, Response } from "express";
import { primsa } from "../libs/prisma";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "../config/config";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const encryptPassword = await bcrypt.hash(password, salt);
    const newUser = await primsa.user.create({
      data: {
        username,
        password: encryptPassword,
      },
    });
    res.json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await primsa.user.findFirst({
      where: {
        username,
      },
    });
    //Validate username
    if (!user)
      return res
        .status(404)
        .json({ message: "username or password is incorrect!" });
    //Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(404)
        .json({ message: "username or password is incorrect!" });
    //Generate token
    const token = await jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY || "secret",
      { expiresIn: 60 * 60 * 8 }
    );
    //Serialize cookie
    const serialized = cookie.serialize("myCookie", token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 8,
      sameSite: "none"
    });
    res.setHeader("Set-Cookie", serialized);
    res.json({
      token,
    });
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await primsa.user.findMany();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getProfile =async(req: Request, res: Response)=>{
  try { 
    const user = await primsa.user.findFirst({
      where: {
        id: Number(req.userId)
      }
    });
    res.json({
      id: user?.id,
      username: user?.username
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await primsa.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(deletedUser);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
