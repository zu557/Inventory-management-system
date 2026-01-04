import prisma from "../prismaClient.js";

export const createSupplier = async (req, res) => {
  const { name, phone, email, contactPerson } = req.body;
  try {
    const supplier = await prisma.supplier.create({
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
        email: email?.trim() || null,
        contactPerson: contactPerson?.trim() || null,
      },
    });
    res.status(201).json(supplier);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Supplier name already exists' });
    }
    res.status(500).json({ error: 'Failed to create supplier' });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
};

export const getSupplier = async (req, res) => {
  const supplier = await prisma.supplier.findUnique({
    where: { id: req.params.id },
  });
  res.json(supplier);
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, contactPerson } = req.body;
  try {
    const supplier = await prisma.supplier.update({
      where: { id },
      data: {
        name: name.trim(),
        phone: phone?.trim() || null,
        email: email?.trim() || null,
        contactPerson: contactPerson?.trim() || null,
      },
    });
    res.json(supplier);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(500).json({ error: 'Failed to update supplier' });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.supplier.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(500).json({ error: 'Failed to delete supplier' });
  }
};

export const getPurchaseCountForSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const count = await prisma.purchase.count({
      where: { supplierId: id },
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check linked purchases' });
  }
};