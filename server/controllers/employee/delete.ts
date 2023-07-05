import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const deletee = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);

    const deletedRows = await prisma.employee.deleteMany({
      where: {
        employeeID: {
          in: data,
        },
      },
    });
    console.log(deletedRows);
    res.send(deletedRows);
  } catch (error: any) {
    console.log(error.code);

    console.log(error);
    res.status(500).json({
      details: error,
      error: "Internal Server Error",
    });
  }
};

module.exports = deletee;
