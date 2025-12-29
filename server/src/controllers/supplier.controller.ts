import prisma from "../prismaClient.js";

export const createSupplier = async (req, res) => {
  const supplier = await prisma.supplier.create({ data: req.body });
  res.json(supplier);
};

export const getSuppliers = async (req, res) => {
  const suppliers = await prisma.supplier.findMany();
  res.json(suppliers);
};

export const getSupplier = async (req, res) => {
  const supplier = await prisma.supplier.findUnique({
    where: { id: req.params.id },
  });
  res.json(supplier);
};

export const updateSupplier = async (req, res) => {
  const supplier = await prisma.supplier.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(supplier);
};

export const deleteSupplier = async (req, res) => {
  await prisma.supplier.delete({ where: { id: req.params.id } });
  res.json({ message: "Supplier deleted" });
};
