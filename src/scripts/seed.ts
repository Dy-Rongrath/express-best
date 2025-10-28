import { connectDB, disconnectDB } from "../config/db.js";
import { UserModel } from "../modules/users/user.model.js";

const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
  },
];

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await UserModel.deleteMany({});
    console.log("🧹 Cleared existing users");

    // Insert sample data
    const users = await UserModel.insertMany(sampleUsers);
    console.log(`✅ Seeded ${users.length} users`);

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    throw error;
  }
}

export async function clearDatabase() {
  try {
    console.log("🧹 Clearing database...");

    await UserModel.deleteMany({});
    console.log("✅ Cleared all users");

    console.log("🎉 Database cleared successfully!");
  } catch (error) {
    console.error("❌ Database clearing failed:", error);
    throw error;
  }
}

// CLI runner
async function main() {
  const command = process.argv[2];

  try {
    await connectDB();

    switch (command) {
      case "seed":
        await seedDatabase();
        break;
      case "clear":
        await clearDatabase();
        break;
      case "reset":
        await clearDatabase();
        await seedDatabase();
        break;
      default:
        console.log("Usage: tsx src/scripts/seed.ts <command>");
        console.log("Commands:");
        console.log("  seed   - Seed database with sample data");
        console.log("  clear  - Clear all data from database");
        console.log("  reset  - Clear and reseed database");
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
if (process.argv[1].endsWith('seed.ts')) {
  main();
}