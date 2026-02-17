import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export const seedRoles = async () => {
  const roles = [
    { name: "Super Admin", description: "System moderator with full access" },
    { name: "Admin", description: "Department-level moderator" },
    { name: "Lecturer", description: "Academic staff who submits and approves documents" },
    { name: "Student", description: "End user with limited access" },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  console.log("✓ Roles seeded successfully");
};
