import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const list = async (req: Request, res: Response) => {
  try {
    
    const allrecords = await prisma.employee.findMany({
      select: {
        id: false,
        employeeID: true,
        employeeName: true,
        employeeStatus: true,
        joiningDate: true,
        birthDate: true,
        skills: true,
        salaryDetails: true,
        address: true,
      },
    });


    res.status(200).send(allrecords);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
module.exports = list;
