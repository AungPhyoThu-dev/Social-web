-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "password" TEXT NOT NULL,
    "bio" TEXT,
    "image" TEXT,
    "birthday" DATETIME,
    "country" TEXT,
    "city" TEXT,
    "gender" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "relationship" TEXT,
    "jobtitle" TEXT,
    "company" TEXT,
    "profileBgColor" TEXT DEFAULT '#667eea',
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("bio", "birthday", "city", "company", "country", "created", "email", "gender", "id", "image", "jobtitle", "name", "password", "phoneNumber", "profileBgColor", "relationship", "role", "username") SELECT "bio", "birthday", "city", "company", "country", "created", "email", "gender", "id", "image", "jobtitle", "name", "password", "phoneNumber", "profileBgColor", "relationship", "role", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
