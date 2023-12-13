-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "bio" SET DEFAULT '';

-- CreateTable
CREATE TABLE "BooksImage" (
    "bookId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BooksImage_bookId_key" ON "BooksImage"("bookId");

-- AddForeignKey
ALTER TABLE "BooksImage" ADD CONSTRAINT "BooksImage_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
