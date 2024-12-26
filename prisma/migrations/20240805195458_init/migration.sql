-- CreateTable
CREATE TABLE "Example" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userModel" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gamesModel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "Title" TEXT NOT NULL,
    "Status" BOOLEAN NOT NULL,
    "reviewDesc" TEXT,
    "starRating" INTEGER NOT NULL,

    CONSTRAINT "gamesModel_pkey" PRIMARY KEY ("id")
);
