-- CreateEnum
CREATE TYPE "Status" AS ENUM ('seen', 'unseen');

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverName" TEXT NOT NULL,
    "receiverEmail" TEXT NOT NULL,
    "message" TEXT,
    "image" TEXT,
    "status" "Status" NOT NULL DEFAULT 'unseen',

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);
