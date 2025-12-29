import prisma from "../prismaClient.js";

export const createPurchase = async (req, res) => {
  const { supplierId, userId, items, total } = req.body;

  try {
    const purchase = await prisma.purchase.create({
      data: {
        supplierId,
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

    // Increase stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { quantityInStock: { increment: item.quantity } },
      });
    }

    res.json(purchase);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPurchases = async (req, res) => {
  const purchases = await prisma.purchase.findMany({
    include: { items: true, supplier: true, user: true }
  });
  res.json(purchases);
};
