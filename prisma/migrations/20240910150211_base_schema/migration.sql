-- CreateTable
CREATE TABLE "books" (
    "code" TEXT NOT NULL,
    "tittle" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "memberCode" TEXT NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Member" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "books_memberCode_key" ON "books"("memberCode");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "Member"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
