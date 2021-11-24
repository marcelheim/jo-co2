-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "notificationEmail" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataClient" (
    "id" INTEGER NOT NULL,
    "name" TEXT,

    CONSTRAINT "DataClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailNotification" (
    "id" SERIAL NOT NULL,
    "dataClientId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "thresholds" TEXT NOT NULL,

    CONSTRAINT "EmailNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailNotification_dataClientId_key" ON "EmailNotification"("dataClientId");

-- CreateIndex
CREATE UNIQUE INDEX "EmailNotification_userId_key" ON "EmailNotification"("userId");

-- AddForeignKey
ALTER TABLE "EmailNotification" ADD CONSTRAINT "EmailNotification_dataClientId_fkey" FOREIGN KEY ("dataClientId") REFERENCES "DataClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailNotification" ADD CONSTRAINT "EmailNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
