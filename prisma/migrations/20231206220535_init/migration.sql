-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "bio" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "ProfilePhoto" (
    "userProfileId" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Books" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(56) NOT NULL DEFAULT 'Untitled',
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookUser" (
    "bookId" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Chapters" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(56) NOT NULL DEFAULT 'Untitled',
    "content" TEXT NOT NULL,

    CONSTRAINT "Chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookChapters" (
    "bookId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(56) NOT NULL DEFAULT 'Untitled',
    "content" TEXT NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookNotes" (
    "bookId" TEXT NOT NULL,
    "noteId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserComments" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_id_key" ON "UserProfile"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProfilePhoto_userProfileId_key" ON "ProfilePhoto"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfilePhoto_photoId_key" ON "ProfilePhoto"("photoId");

-- CreateIndex
CREATE UNIQUE INDEX "BookUser_bookId_key" ON "BookUser"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "BookUser_userId_key" ON "BookUser"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BookChapters_chapterId_key" ON "BookChapters"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "BookNotes_bookId_key" ON "BookNotes"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "BookNotes_noteId_key" ON "BookNotes"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "UserComments_commentId_key" ON "UserComments"("commentId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilePhoto" ADD CONSTRAINT "ProfilePhoto_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookUser" ADD CONSTRAINT "BookUser_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookUser" ADD CONSTRAINT "BookUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookChapters" ADD CONSTRAINT "BookChapters_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookChapters" ADD CONSTRAINT "BookChapters_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookNotes" ADD CONSTRAINT "BookNotes_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookNotes" ADD CONSTRAINT "BookNotes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserComments" ADD CONSTRAINT "UserComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserComments" ADD CONSTRAINT "UserComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
