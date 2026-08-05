import { PrismaClient } from "@prisma/client";
import { auth } from "../src/auth";

const prisma = new PrismaClient();
const defaultPassword = "Admin123!";

async function safeSignUp(user: { name: string; email: string; password: string }) {
  try {
    await auth.api.signUpEmail({
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error: any) {
    const message = String(error?.message || error).toLowerCase();
    if (message.includes("already") || message.includes("exists") || message.includes("duplicate")) {
      console.log(`Skipping existing user: ${user.email}`);
      return;
    }
    throw error;
  }
}

async function main() {
  const users = [ 
    { name: "Admin", email: "admin@example.com", role: "admin" as const },
    { name: "Admin Two", email: "admin2@example.com", role: "admin" as const },
    { name: "Manager", email: "manager@example.com", role: "manager" as const },
    { name: "Staff", email: "staff@example.com", role: "staff" as const },
  ];

  for (const user of users) {
    await safeSignUp({ name: user.name, email: user.email, password: defaultPassword });
    await prisma.user.update({
      where: { email: user.email },
      data: { role: user.role },
    });
  }

  const categories = [
    {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Electronics",
      description: "Phones, laptops, accessories",
    },
    {
      id: "00000000-0000-0000-0000-000000000002",
      name: "Office Supplies",
      description: "Stationery and office essentials",
    },
    {
      id: "00000000-0000-0000-0000-000000000003",
      name: "Household",
      description: "Home and kitchen essentials",
    },
  ];

  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.category.upsert({
        where: { id: category.id },
        update: {
          name: category.name,
          description: category.description,
        },
        create: category,
      })
    )
  );

  const suppliers = [
    {
      id: "00000000-0000-0000-0000-000000000010",
      name: "TechHub Supplies",
      phone: "+1-555-0101",
      email: "sales@techhub.example",
      contactPerson: "Alicia Rivera",
    },
    {
      id: "00000000-0000-0000-0000-000000000011",
      name: "Office Essentials Co.",
      phone: "+1-555-0102",
      email: "orders@officeessentials.example",
      contactPerson: "Marcus Lee",
    },
    {
      id: "00000000-0000-0000-0000-000000000012",
      name: "Home Goods Wholesale",
      phone: "+1-555-0103",
      email: "support@homegoods.example",
      contactPerson: "Diana Cruz",
    },
  ];

  const createdSuppliers = await Promise.all(
    suppliers.map((supplier) =>
      prisma.supplier.upsert({
        where: { id: supplier.id },
        update: supplier,
        create: supplier,
      })
    )
  );

  const products = [
    {
      sku: "ELEC-1001",
      name: "Wireless Mouse",
      purchasePrice: "12.50",
      salePrice: "24.99",
      quantityInStock: 84,
      reorderLevel: 20,
      unit: "pcs",
      categoryId: createdCategories[0].id,
      supplierId: createdSuppliers[0].id,
    },
    {
      sku: "ELEC-1002",
      name: "USB-C Hub",
      purchasePrice: "28.00",
      salePrice: "49.99",
      quantityInStock: 36,
      reorderLevel: 15,
      unit: "pcs",
      categoryId: createdCategories[0].id,
      supplierId: createdSuppliers[0].id,
    },
    {
      sku: "ELEC-1003",
      name: "Ergonomic Keyboard",
      purchasePrice: "34.75",
      salePrice: "69.99",
      quantityInStock: 18,
      reorderLevel: 12,
      unit: "pcs",
      categoryId: createdCategories[0].id,
      supplierId: createdSuppliers[0].id,
    },
    {
      sku: "OFF-2001",
      name: "A4 Notebooks (Pack of 5)",
      purchasePrice: "6.20",
      salePrice: "11.99",
      quantityInStock: 120,
      reorderLevel: 30,
      unit: "pack",
      categoryId: createdCategories[1].id,
      supplierId: createdSuppliers[1].id,
    },
    {
      sku: "OFF-2002",
      name: "Ballpoint Pens",
      purchasePrice: "2.40",
      salePrice: "4.99",
      quantityInStock: 250,
      reorderLevel: 60,
      unit: "box",
      categoryId: createdCategories[1].id,
      supplierId: createdSuppliers[1].id,
    },
    {
      sku: "OFF-2003",
      name: "Desk Organizer",
      purchasePrice: "15.80",
      salePrice: "29.99",
      quantityInStock: 22,
      reorderLevel: 10,
      unit: "pcs",
      categoryId: createdCategories[1].id,
      supplierId: createdSuppliers[1].id,
    },
    {
      sku: "HOME-3001",
      name: "Ceramic Mug Set",
      purchasePrice: "9.90",
      salePrice: "18.50",
      quantityInStock: 60,
      reorderLevel: 15,
      unit: "set",
      categoryId: createdCategories[2].id,
      supplierId: createdSuppliers[2].id,
    },
    {
      sku: "HOME-3002",
      name: "Cotton Bath Towels",
      purchasePrice: "11.25",
      salePrice: "19.99",
      quantityInStock: 40,
      reorderLevel: 12,
      unit: "pcs",
      categoryId: createdCategories[2].id,
      supplierId: createdSuppliers[2].id,
    },
    {
      sku: "HOME-3003",
      name: "LED Desk Lamp",
      purchasePrice: "18.60",
      salePrice: "34.99",
      quantityInStock: 14,
      reorderLevel: 8,
      unit: "pcs",
      categoryId: createdCategories[2].id,
      supplierId: createdSuppliers[2].id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {
        name: product.name,
        purchasePrice: product.purchasePrice,
        salePrice: product.salePrice,
        quantityInStock: product.quantityInStock,
        reorderLevel: product.reorderLevel,
        unit: product.unit,
        categoryId: product.categoryId,
        supplierId: product.supplierId,
      },
      create: {
        name: product.name,
        sku: product.sku,
        purchasePrice: product.purchasePrice,
        salePrice: product.salePrice,
        quantityInStock: product.quantityInStock,
        reorderLevel: product.reorderLevel,
        unit: product.unit,
        categoryId: product.categoryId,
        supplierId: product.supplierId,
      },
    });
  }

  console.log("Seed complete.");
  console.log("Credentials:");
  for (const user of users) {
    console.log(`  ${user.role.toUpperCase()}: ${user.email} / ${defaultPassword}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
