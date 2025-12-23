import "dotenv/config";
import { auth } from "../src/lib/auth";
import { db } from "./drizzel";
import { user as userTable } from "./schema";
import { eq } from "drizzle-orm";

async function createAdmin() {
  const adminEmail = "admin@example.com";
  const adminPassword = "admin1pass1";

  console.log("🚀 Initializing Admin User...");

  try {
    // 1. Check if user already exists
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, adminEmail))
      .limit(1);

    if (existingUser.length > 0) {
      console.log(
        "ℹ️ User already exists in 'user' table. Removing to recreate properly..."
      );
      await db.delete(userTable).where(eq(userTable.email, adminEmail));
    }

    // 2. Create user with password using Better Auth API
    // This handles both the 'user' and 'account' table entries (including password hashing)
    console.log(`📝 Creating account for ${adminEmail}...`);
    const response = await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: adminPassword,
        name: "Admin User",
      },
    });

    if (!response) {
      throw new Error("Failed to create user via Better Auth API");
    }

    // 3. Promote user to admin role
    console.log("👑 Promoting user to admin role...");
    await db
      .update(userTable)
      .set({ role: "admin" })
      .where(eq(userTable.email, adminEmail));

    console.log("✅ Admin user created successfully!");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
  } catch (error) {
    console.error("❌ Error creating admin user:");
    console.error(error);
  } finally {
    process.exit(0);
  }
}

createAdmin();
