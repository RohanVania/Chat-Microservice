-- CreateEnum
CREATE TYPE "Role" AS ENUM ('patient', 'doctor');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'patient';
