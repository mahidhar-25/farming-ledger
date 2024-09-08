/*
  Warnings:

  - You are about to drop the column `amount` on the `Ledger` table. All the data in the column will be lost.
  - You are about to drop the column `recieveData` on the `Ledger` table. All the data in the column will be lost.
  - Added the required column `recieveDate` to the `Ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saleamount` to the `Ledger` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ledger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmerId" TEXT NOT NULL,
    "ledgerBookId" TEXT NOT NULL,
    "saleDate" DATETIME NOT NULL,
    "recieveDate" DATETIME NOT NULL,
    "acres" REAL NOT NULL,
    "saleamount" REAL NOT NULL,
    "dueAmount" REAL NOT NULL,
    "reciveAmount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "notesSale" TEXT,
    "notesRecieve" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Ledger_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ledger_ledgerBookId_fkey" FOREIGN KEY ("ledgerBookId") REFERENCES "LedgerBook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ledger" ("acres", "createdAt", "dueAmount", "farmerId", "id", "ledgerBookId", "notesRecieve", "notesSale", "reciveAmount", "saleDate", "status", "updatedAt") SELECT "acres", "createdAt", "dueAmount", "farmerId", "id", "ledgerBookId", "notesRecieve", "notesSale", "reciveAmount", "saleDate", "status", "updatedAt" FROM "Ledger";
DROP TABLE "Ledger";
ALTER TABLE "new_Ledger" RENAME TO "Ledger";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
