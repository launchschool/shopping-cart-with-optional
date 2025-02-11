// const express = require("express");
// const router = express.Router();
// const Product = require("../models/product");
// const CartItem = require("../models/cartItem");

// router.get("/products", (req, res, next) => {
//   Product.find({})
//     .then((products) => res.json(products))
//     .catch(next);
// });

// router.post("/products", (req, res, next) => {
//   const { title, price, quantity } = req.body;
//   Product.create({ title, price, quantity })
//     .then((product) => res.json(product))
//     .catch((err) => next(err));
// });

// router.put("/products/:id", (req, res) => {
//   const productId = req.params.id;
//   const { title, price, quantity } = req.body;
//   Product.findById(productId)
//     .then((product) => {
//       return Product.findByIdAndUpdate(
//         productId,
//         {
//           title: title || product.title,
//           price: price === undefined ? product.price : price,
//           quantity: quantity === undefined ? product.quantity : quantity,
//         },
//         { new: true }
//       );
//     })
//     .then((updatedProduct) => {
//       res.json(updatedProduct);
//     });
// });

// router.delete("/products/:id", (req, res, next) => {
//   const productId = req.params.id;
//   Product.findByIdAndRemove(productId)
//     .then(() => {
//       res.json();
//     })
//     .catch((err) => next(err));
// });

// router.post("/cart", (req, res) => {
//   const { productId, title, price } = req.body;
//   CartItem.findOne({
//     productId,
//   })
//     .then((item) => {
//       if (!item) {
//         return CartItem.create({
//           title: title,
//           price: price,
//           quantity: 1,
//           productId,
//         });
//       } else {
//         return CartItem.findOneAndUpdate(
//           { productId },
//           {
//             quantity: item.quantity + 1,
//           },
//           { new: true }
//         );
//       }
//     })
//     .then((item) => {
//       res.json(item);
//     });
// });

// router.post("/cart/checkout", (req, res) => {
//   CartItem.deleteMany({}).then(() => {
//     res.json();
//   });
// });

// router.get("/cart", (req, res, next) => {
//   CartItem.find({})
//     .then((cartItems) => res.json(cartItems))
//     .catch(next);
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const CartItem = require("../models/cartItem");
const mongoose = require("mongoose");

router.get("/products", (req, res, next) => {
  Product.find({})
    .then((products) => res.json(products))
    .catch(next);
});

router.post("/products", (req, res, next) => {
  const { title, price, quantity } = req.body;
  Product.create({ title, price, quantity })
    .then((product) => res.json(product))
    .catch((err) => next(err));
});

router.put("/products/:id", (req, res) => {
  const productId = req.params.id;
  const { title, price, quantity } = req.body;
  Product.findById(productId)
    .then((product) => {
      return Product.findByIdAndUpdate(
        productId,
        {
          title: title || product.title,
          price: price === undefined ? product.price : price,
          quantity: quantity === undefined ? product.quantity : quantity,
        },
        { new: true }
      );
    })
    .then((updatedProduct) => {
      res.json(updatedProduct);
    });
});

router.delete("/products/:id", (req, res, next) => {
  const productId = req.params.id;
  Product.findByIdAndRemove(productId)
    .then(() => {
      res.json();
    })
    .catch((err) => next(err));
});

router.post("/add-to-cart", async (req, res, next) => {
  const { productId } = req.body;
  try {
    let product = await Product.findById(productId);

    if (!product || product.quantity === 0) {
      return res.status(400).json({ error: "No more items" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $inc: { quantity: -1 } },
      { new: true }
    );
    let item = await CartItem.findOne({ productId });
    if (!item) {
      item = await CartItem.create({
        title: updatedProduct.title,
        price: updatedProduct.price,
        quantity: 1,
        productId,
      });
    } else {
      item = await CartItem.findOneAndUpdate(
        { productId },
        { $inc: { quantity: 1 } },
        { new: true }
      );
    }
    const { error, ...productData } = updatedProduct.toObject();
    res.json({ product: productData, item });
  } catch (e) {
    console.log(e);
  }
});

router.post("/checkout", (req, res) => {
  CartItem.deleteMany({}).then(() => {
    res.json();
  });
});

router.get("/cart", (req, res, next) => {
  CartItem.find({})
    .then((cartItems) => {
      res.json(cartItems);
    })
    .catch(next);
});

module.exports = router;
