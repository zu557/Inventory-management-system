import prisma from "../prismaClient.js";

export const createSale = async (req, res) => {
  const { customerId, userId, items, total } = req.body;

  try {
    // Check stock first
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });

      if (product.quantityInStock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for product: ${product.name}`
        });
      }
    }

    const sale = await prisma.sale.create({
      data: {
        customerId,
        userId,
        total,
        items: {
          create: items.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
          }))
        }
      },
      include: { items: true }
    });

    // Reduce stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { quantityInStock: { decrement: item.quantity } }
      });
    }

    res.json(sale);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSales = async (req, res) => {
  const sales = await prisma.sale.findMany({
    include: { items: true, customer: true, user: true }
  });
  res.json(sales);
};
