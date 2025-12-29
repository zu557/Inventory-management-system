import prisma from "../prismaClient.js";

export const createCustomer = async (req, res) => {
  const customer = await prisma.customer.create({ data: req.body });
  res.json(customer);
};

export const getCustomers = async (req, res) => {
  const customers = await prisma.customer.findMany();
  res.json(customers);
};

export const getCustomer = async (req, res) => {
  const customer = await prisma.customer.findUnique({
    where: { id: req.params.id },
  });
  res.json(customer);
};

export const updateCustomer = async (req, res) => {
  const customer = await prisma.customer.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(customer);
};

export const deleteCustomer = async (req, res) => {
  await prisma.customer.delete({ where: { id: req.params.id } });
  res.json({ message: "Customer deleted" });
};
