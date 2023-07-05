import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const add = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    const { employeeID } = await prisma.employee.create({
      data: {
        ...data,
      },
    });

    res.send({
      status: "success",
    });
  } catch (error: any) {
    console.log(error.code);
    if (error.code === "P2002") {
      res.status(500).json({
        error: `${error.meta.target} already exists`,
      });
    } else {
      console.log(error);
      res.status(500).json({
        details: error,
        error: "Internal Server Error",
      });
    }
  }
};

module.exports = add;
