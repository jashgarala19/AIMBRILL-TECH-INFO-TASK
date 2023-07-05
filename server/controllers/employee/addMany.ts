import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const addMany = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const { data } = req.body;

    const { count } = await prisma.employee.createMany({
      data: [...data],
    });
    res.send({
      data,
    });
  } catch (error: any) {
    console.log(error);
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

module.exports = addMany;
