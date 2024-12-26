/*
  Warnings:

  - The primary key for the `gamesModel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Status` on the `gamesModel` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `gamesModel` table. All the data in the column will be lost.
  - The primary key for the `userModel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorID` to the `gamesModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `gamesModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `gamesModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gamesModel" DROP CONSTRAINT "gamesModel_pkey",
DROP COLUMN "Status",
DROP COLUMN "Title",
ADD COLUMN     "authorID" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "gamesModel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "gamesModel_id_seq";

-- AlterTable
ALTER TABLE "userModel" DROP CONSTRAINT "userModel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "userModel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "userModel_id_seq";

-- DropTable
DROP TABLE "Example";

-- CreateIndex
CREATE INDEX "gamesModel_authorID_idx" ON "gamesModel"("authorID");
