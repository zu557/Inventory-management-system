import { prisma } from "../db/client";

export const adjustStockAfterPurchase = async (purchaseId: string) => {
  const items = await prisma.purchaseItem.findMany({ where: { purchaseId }});
  for (const it of items) {
    await prisma.product.update({
      where: { id: it.productId },
      data: { quantityInStock: { increment: it.quantity } }
    });
  }
};

export const adjustStockAfterSale = async (saleId: string) => {
  const items = await prisma.saleItem.findMany({ where: { saleId }});
  for (const it of items) {
    await prisma.product.update({
      where: { id: it.productId },
      data: { quantityInStock: { decrement: it.quantity } }
    });
  }
};
