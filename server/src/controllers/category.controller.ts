import prisma from "../prismaClient.js";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name: name.trim(), description: description?.trim() || null },
    });
    res.status(201).json(category);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Category name already exists' });
    }
    res.status(500).json({ error: 'Failed to create category' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const getCategory = async (req, res) => {
  const Category = await prisma.category.findUnique({
    where: { id: req.params.id },
  });
  res.json(Category);
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const category = await prisma.category.update({
      where: { id },
      data: { name: name.trim(), description: description?.trim() || null },
    });
    res.json(category);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Category not found' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Category name already exists' });
    }
    res.status(500).json({ error: 'Failed to update category' });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.category.delete({ where: { id } });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
export const getProductCountForCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const count = await prisma.product.count({
      where: { categoryId: id },
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check linked products' });
  }
};
