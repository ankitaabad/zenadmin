-- AddForeignKey
ALTER TABLE "Catalog" ADD CONSTRAINT "Catalog_sellerid_fkey" FOREIGN KEY ("sellerid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
