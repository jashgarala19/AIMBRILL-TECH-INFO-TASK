-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "employeeID" TEXT NOT NULL,
    "employeeName" TEXT NOT NULL,
    "employeeStatus" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "skills" TEXT[],
    "salaryDetails" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeID_key" ON "Employee"("employeeID");
