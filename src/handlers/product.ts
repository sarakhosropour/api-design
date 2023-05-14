import prisma from "../db";

export const getUserProducts = async (req: any, res: any) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: { products: true },
  });
  console.log("user:", user);
  if (user) {
    res.json({ data: user.products });
  } else {
    res.json({ error: "user not found" });
  }
};

export const getProductById = async (req: any, res: any) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: { id },
  });

  res.json({ data: product });
};

export const createProduct = async (req: any, res: any, next: any) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (e) {
    next(e);
  }
};

export const updateProduct = async (req: any, res: any) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated });
};

export const deleteProduct = async (req: any, res: any) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
    },
  });

  console.log("deleted:", deleted);

  res.json({ data: deleted });
};
