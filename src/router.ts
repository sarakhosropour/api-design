import Router from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getUserProducts,
  updateProduct,
} from "./handlers/product";

const router = Router();

/**
 * Product
 */
router.get("/products", getUserProducts);

router.get("/product/:id", getProductById);

router.put(
  "/product/:id",
  body("name").optional().isString(),
  handleInputErrors,
  updateProduct
);

router.post(
  "/product",
  body("name").exists().isString(),
  handleInputErrors,
  createProduct
);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});

enum Update_STATUS {
  IN_PROGRESS,
  SHIPPED,
  DEPRECATED,
}

router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("status").optional().isIn(Object.values(Update_STATUS)),
  body("version").optional().isNumeric(),
  handleInputErrors,
  () => {
    console.log("ok");
  }
);

router.post(
  "/update",
  body("title").exists().isString(),
  body("status").exists().isIn(Object.values(Update_STATUS)),
  body("version").optional().isNumeric(),
  handleInputErrors,
  (req, res) => {}
);

router.delete("/update/:id", body(), (req, res) => {});

/**
 * UpdatePoint
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").optional().isString(),
  body("updateId").exists().isString(),
  handleInputErrors,
  (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

export default router;
