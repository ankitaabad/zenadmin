-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('BUYER', 'SELLER');

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(32) NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "type" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Catalog" (
    "id" VARCHAR(32) NOT NULL,
    "sellerid" VARCHAR(32) NOT NULL,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" VARCHAR(32) NOT NULL,
    "catalogId" VARCHAR(32) NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" VARCHAR(32) NOT NULL,
    "buyerId" VARCHAR(32) NOT NULL,
    "sellerId" VARCHAR(32) NOT NULL,
    "orderItems" JSONB NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Catalog_sellerid_key" ON "Catalog"("sellerid");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
