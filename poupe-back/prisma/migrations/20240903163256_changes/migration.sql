/*
  Warnings:

  - Changed the type of `salary` on the `users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "salary",
ADD COLUMN     "salary" DOUBLE PRECISION NOT NULL;

ALTER TABLE "Expenditure" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

ALTER TABLE "Balance" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;