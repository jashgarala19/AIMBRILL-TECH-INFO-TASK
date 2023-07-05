/*
  Warnings:

  - You are about to alter the column `salaryDetails` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "salaryDetails" SET DATA TYPE INTEGER;
