import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req: any, res: any, next: any) => {
  
  try {
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });


    res.json({ newUser });
  } catch (e) {
    next(e);
  }
};

export const signin = async (req: any, res: any) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    res.json({ message: "username does not exist." });
    return;
  } else {
    const isValid = await comparePasswords(req.body.password, user.password);
    if (!isValid) {
      res.json({ message: "password is not valid" });
      return;
    }
    const token = createJWT(user);
    res.json({ token });
  }
};
