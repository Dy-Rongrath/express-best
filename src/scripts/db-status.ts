import { connectDB, disconnectDB, mongoHealth } from "../config/db.js";
import { UserModel } from "../modules/users/user.model.js";

export async function showDatabaseStatus() {
  try {
    console.log("🔍 Checking database status...");

    // Connect to database
    await connectDB();

    // Get connection info
    const mongoStatus = mongoHealth();
    console.log("MongoDB connection status:", mongoStatus);

    // Get collection stats
    const userCount = await UserModel.countDocuments();
    console.log(`👥 Users in database: ${userCount}`);

    // Get database stats
    const db = UserModel.db;
    const dbName = db.name;
    console.log("Database information:", {
      dbName,
      collections: "N/A (use MongoDB tools for detailed stats)",
    });

    console.log("✅ Database status check completed!");
  } catch (error) {
    console.error("❌ Database status check failed:", error);
    throw error;
  }
}

export async function listCollections() {
  try {
    console.log("📋 Listing database collections...");

    await connectDB();

    // Simple approach - just list known collections
    const knownCollections = ['users']; // Add more as you create them

    console.log(`📂 Known collections in database:`);
    knownCollections.forEach((name: string) => {
      console.log(`  - ${name}`);
    });

    console.log("✅ Collection listing completed!");
  } catch (error) {
    console.error("❌ Collection listing failed:", error);
    throw error;
  }
}

// CLI runner
async function main() {
  const command = process.argv[2];

  try {
    switch (command) {
      case "status":
        await showDatabaseStatus();
        break;
      case "collections":
        await listCollections();
        break;
      default:
        console.log("Usage: tsx src/scripts/db-status.ts <command>");
        console.log("Commands:");
        console.log("  status      - Show database status and statistics");
        console.log("  collections - List all collections in database");
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
if (process.argv[1].endsWith('db-status.ts')) {
  main();
}