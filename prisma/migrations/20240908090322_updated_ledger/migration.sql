-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ledger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmerId" TEXT NOT NULL,
    "ledgerBookId" TEXT NOT NULL,
    "saleDate" DATETIME NOT NULL,
    "recieveDate" DATETIME,
    "acres" REAL NOT NULL DEFAULT 0,
    "saleamount" REAL NOT NULL DEFAULT 0,
    "dueAmount" REAL NOT NULL DEFAULT 0,
    "reciveAmount" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL,
    "notesSale" TEXT,
    "notesRecieve" TEXT,
    "amountPerAcre" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Ledger_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ledger_ledgerBookId_fkey" FOREIGN KEY ("ledgerBookId") REFERENCES "LedgerBook" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ledger" ("acres", "createdAt", "dueAmount", "farmerId", "id", "ledgerBookId", "notesRecieve", "notesSale", "recieveDate", "reciveAmount", "saleDate", "saleamount", "status", "updatedAt") SELECT "acres", "createdAt", "dueAmount", "farmerId", "id", "ledgerBookId", "notesRecieve", "notesSale", "recieveDate", "reciveAmount", "saleDate", "saleamount", "status", "updatedAt" FROM "Ledger";
DROP TABLE "Ledger";
ALTER TABLE "new_Ledger" RENAME TO "Ledger";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
