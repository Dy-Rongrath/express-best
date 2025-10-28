import { connectDB, disconnectDB } from "../config/db.js";
import { UserModel } from "../modules/users/user.model.js";

export interface Migration {
  name: string;
  up: () => Promise<void>;
  down: () => Promise<void>;
}

const migrations: Migration[] = [
  {
    name: "create_indexes",
    up: async () => {
      console.log("Creating database indexes...");

      // Ensure indexes are created (Mongoose handles this automatically with the schema)
      await UserModel.createIndexes();
      console.log("✅ Indexes created");
    },
    down: async () => {
      console.log("Dropping database indexes...");

      // Drop indexes (keep the _id index)
      const collection = UserModel.collection;
      const indexes = await collection.indexes();
      for (const index of indexes) {
        if (index.name && index.name !== '_id_') {
          await collection.dropIndex(index.name);
        }
      }
      console.log("✅ Indexes dropped");
    }
  },
  {
    name: "validate_data_integrity",
    up: async () => {
      console.log("Validating data integrity...");

      // Check for any data integrity issues
      const users = await UserModel.find({});
      let issues = 0;

      for (const user of users) {
        if (!user.name || !user.email) {
          issues++;
          console.warn(`User ${user._id} missing required fields`);
        }
      }

      if (issues > 0) {
        console.warn(`Found ${issues} data integrity issues`);
      } else {
        console.log("✅ Data integrity check passed");
      }
    },
    down: async () => {
      console.log("Data integrity validation skipped on rollback");
    }
  }
];

export async function runMigrations() {
  try {
    console.log("🚀 Running database migrations...");

    await connectDB();

    for (const migration of migrations) {
      console.log(`Running migration: ${migration.name}`);
      await migration.up();
    }

    console.log("✅ All migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

export async function rollbackMigrations() {
  try {
    console.log("⏪ Rolling back database migrations...");

    await connectDB();

    // Run migrations in reverse order
    for (const migration of [...migrations].reverse()) {
      console.log(`Rolling back migration: ${migration.name}`);
      await migration.down();
    }

    console.log("✅ All rollbacks completed successfully!");
  } catch (error) {
    console.error("❌ Rollback failed:", error);
    throw error;
  }
}

export function listMigrations() {
  console.log("📋 Available migrations:");
  migrations.forEach((migration, index) => {
    console.log(`  ${index + 1}. ${migration.name}`);
  });
}

// CLI runner
async function main() {
  const command = process.argv[2];

  try {
    switch (command) {
      case "up":
      case "migrate":
        await runMigrations();
        break;
      case "down":
      case "rollback":
        await rollbackMigrations();
        break;
      case "list":
        listMigrations();
        break;
      default:
        console.log("Usage: tsx src/scripts/migrate.ts <command>");
        console.log("Commands:");
        console.log("  up/migrate  - Run all migrations");
        console.log("  down/rollback - Rollback all migrations");
        console.log("  list         - List available migrations");
        process.exit(1);
    }
  } catch (error) {
    console.error("Script failed:", error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// For direct testing
if (process.argv[1].endsWith('migrate.ts')) {
  main();
}