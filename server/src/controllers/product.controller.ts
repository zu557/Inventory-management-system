import prisma from "../prismaClient.js";
// src/controllers/productController.ts
import { Request, Response } from 'express';
// import { prisma } from '../prisma';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        supplier: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("req :",req)
    const {
      name, sku, purchasePrice, salePrice, quantityInStock,
      reorderLevel, unit, categoryId, supplierId
    } = req.body;
    console.log("req :",req)
    // Add basic validation 
    if (!name || !sku || !unit || !categoryId || !supplierId) {
      console.log('All required fields must be provided' )
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        sku: sku.trim(),
        purchasePrice: parseFloat(purchasePrice as string),
        salePrice: parseFloat(salePrice as string),
        quantityInStock: parseInt(quantityInStock as string),
        reorderLevel: parseInt(reorderLevel as string),
        unit: unit.trim(),
        categoryId,
        supplierId,
      }, 
      include: { category: true, supplier: true },
    });

    res.status(201).json(product);
  } catch (error: any) {
    console.error('Product creation error:', error); // ← THIS WILL SHOW REAL ERROR IN SERVER LOGS

    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'SKU already exists' });
    }

    if (error.code === 'P2003') {
      return res.status(400).json({ 
        error: 'Invalid category or supplier ID (does not exist)' 
      });
    }

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Related record not found' });
    }

    // Catch NaN issues
    if (isNaN(parseFloat(req.body.purchasePrice)) || isNaN(parseFloat(req.body.salePrice))) {
      return res.status(400).json({ error: 'Invalid price format' });
    }

    res.status(500).json({ 
      error: 'Failed to create product',
      // Remove this in production:
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        purchasePrice: data.purchasePrice ? parseFloat(data.purchasePrice) : undefined,
        salePrice: data.salePrice ? parseFloat(data.salePrice) : undefined,
        quantityInStock: data.quantityInStock ? parseInt(data.quantityInStock) : undefined,
        reorderLevel: data.reorderLevel ? parseInt(data.reorderLevel) : undefined,
      },
      include: { category: true, supplier: true },
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// export const createProduct = async (req, res) => {
//   try {
//     const product = await prisma.product.create({ data: req.body });
//     res.json(product);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// export const getProducts = async (req, res) => {
//   const products = await prisma.product.findMany({
//     include: { category: true, supplier: true }
//   });
//   res.json(products);
// };

// export const getProduct = async (req, res) => {
//   const product = await prisma.product.findUnique({
//     where: { id: req.params.id },
//   });
//   res.json(product);
// };

// export const updateProduct = async (req, res) => {
//   const product = await prisma.product.update({
//     where: { id: req.params.id },
//     data: req.body,
//   });
//   res.json(product);
// };

// export const deleteProduct = async (req, res) => {
//   await prisma.product.delete({ where: { id: req.params.id } });
//   res.json({ message: "Product deleted" });
// };
