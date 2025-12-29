import prisma from "../prismaClient.js";

export const createCategory = async (req, res) => {
  const Category = await prisma.category.create({ data: req.body });
  res.json(Category);
};

export const getCategories = async (req, res) => {
  const Category = await prisma.category.findMany();
  res.json(Category);
};

export const getCategory = async (req, res) => {
  const Category = await prisma.category.findUnique({
    where: { id: req.params.id },
  });
  res.json(Category);
};

export const updateCategory = async (req, res) => {
  const Category = await prisma.category.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(Category);
};

export const deleteCategory = async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  res.json({ message: "Category deleted" });
};
