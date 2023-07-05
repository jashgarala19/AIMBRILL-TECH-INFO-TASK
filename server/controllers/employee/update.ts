import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const employeeExists = async (id: string) => {
  return await prisma.employee.findUnique({
    where: {
      employeeID: id,
    },
  });
};
const update = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const id = req.params.id;
    console.log(data);

    if (!(await employeeExists(id))) {
      return res.send({
        error: "Record not found for updation or Wrong Params",
      });
    }
    const { employeeID } = await prisma.employee.update({
      where: {
        employeeID: id,
      },
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
      res.send({
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

module.exports = update;
