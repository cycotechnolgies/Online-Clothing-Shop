const Cart = require('../model/cartModel');

exports.addItemToCart = async (req, res) => {
  const { userId, productId, quantity, color, size } = req.body;

  try {
    if (!userId || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, productId, or quantity.'
      });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if same product with same color & size already exists
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.color === color &&
          item.size === size
      );

      if (itemIndex > -1) {
        // update quantity
        cart.items[itemIndex].quantity += Number(quantity);
      } else {
        // push new item
        cart.items.push({ productId, quantity: Number(quantity), color, size });
      }

      cart = await cart.save();
    } else {
      // Create new cart for this user
      cart = new Cart({
        userId,
        items: [{ productId, quantity: Number(quantity), color, size }]
      });

      cart = await cart.save();
    }

    res.status(200).json({
      success: true,
      message: 'Item added/updated in cart successfully.',
      cart
    });

  } catch (error) {
    console.error('Error adding/updating item in cart:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while managing the cart.'
    });
  }
};
