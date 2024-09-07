-- CreateTable
CREATE TABLE "Farmer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ledger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmerId" TEXT NOT NULL,
    "ledgerBookId" TEXT NOT NULL,
    "saleDate" DATETIME NOT NULL,
    "recieveData" DATETIME NOT NULL,
    "acres" REAL NOT NULL,
    "amount" REAL NOT NULL,
    "dueAmount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "reciveAmount" REAL NOT NULL,
    "notesSale" TEXT,
    "notesRecieve" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Ledger_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ledger_ledgerBookId_fkey" FOREIGN KEY ("ledgerBookId") REFERENCES "LedgerBook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LedgerBook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "perAcreAmount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_name_village_key" ON "Farmer"("name", "village");
