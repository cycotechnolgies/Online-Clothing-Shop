const Cart = require('../model/cartModel');

exports.addItemToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ success: false, message: 'Missing required fields: userId, productId, or quantity.' });
    }

    let cart = await Cart.findOne({ userId: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      cart = await cart.save();
    } else {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }]
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
    res.status(500).json({ success: false, message: 'An error occurred while managing the cart.' });
  }
};
