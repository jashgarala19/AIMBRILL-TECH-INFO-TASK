/*
  Warnings:

  - Changed the type of `joiningDate` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `birthDate` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `salaryDetails` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "joiningDate",
ADD COLUMN     "joiningDate" INTEGER NOT NULL,
DROP COLUMN "birthDate",
ADD COLUMN     "birthDate" INTEGER NOT NULL,
DROP COLUMN "salaryDetails",
ADD COLUMN     "salaryDetails" BIGINT NOT NULL;
