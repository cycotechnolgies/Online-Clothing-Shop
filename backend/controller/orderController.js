const Order = require("../model/orderModel");

// @desc   Get all orders with filters
// @route  GET /api/orders
// @access Admin
const getOrders = async (req, res) => {
  try {
    const { status, from, to, customer } = req.query;
    let filter = {};

    if (status) filter.orderStatus = status;
    if (customer) filter.userId = customer;
    if (from && to) filter.createdAt = { $gte: new Date(from), $lte: new Date(to) };

    const orders = await Order.find(filter)
      .populate("userId", "name email") // get customer details
      .populate("items.productId", "name price") // get product details
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

// @desc   Get single order by ID
// @route  GET /api/orders/:id
// @access Admin
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email phone")
      .populate("items.productId", "name price");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};

// @desc   Update order status
// @route  PUT /api/orders/:id/status
// @access Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.orderStatus = status;

    if (status === "Delivered") {
      order.deliveredAt = Date.now();
      if (order.isPaid === false) {
        order.paymentStatus = "Paid";
        order.isPaid = true;
        order.paidAt = Date.now();
      }
    }

    await order.save();
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};

// @desc   Refund or cancel an order
// @route  PUT /api/orders/:id/refund
// @access Admin
const refundOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Validation: Prevent refunding if payment is pending
    if (order.paymentStatus === 'Pending') {
      return res.status(400).json({ message: 'Order payment is still pending. Cannot refund.' });
    }

    // Validation: Prevent refunding if payment is pending
    if (order.paymentStatus === 'Failed') {
      return res.status(400).json({ message: 'Order payment is Failed. Cannot refund.' });
    }

    // Validation: Prevent multiple refunds
    if (order.paymentStatus === 'Refunded') {
      return res.status(400).json({ message: 'Order has already been refunded.' });
    }

    // NOTE: External payment gateway call would occur here in a real application.

    order.paymentStatus = 'Refunded';
    order.orderStatus = 'Cancelled';

    await order.save();
    res.json({ message: 'Order refunded successfully', order });
  } catch (error) {
    // Handle invalid ID format (CastError) gracefully
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Invalid Order ID format' });
    }

    console.error('Error refunding order:', error);
    res.status(500).json({ message: 'Error refunding order', error: error.message });
  }
};


// @desc    Create a new order
// @route   POST /api/orders
// @access  User (Protected)
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    // Automatically calculate total order amount
    const totalAmount = items.reduce(
      (sum, item) => sum + item.priceAtPurchase * item.quantity,
      0
    );

    // 💳 Determine payment status based on method
    //  - COD orders are unpaid at creation (Pending)
    //  - All other methods (Stripe, PayHere, BankTransfer) are treated as Paid
    let finalPaymentStatus;
    if (paymentMethod === "COD") {
      finalPaymentStatus = "Pending";
    } else {
      finalPaymentStatus = "Paid";
    }

    // Mark paid status and timestamp if payment completed
    const isPaid = finalPaymentStatus === "Paid";
    const paidAt = isPaid ? Date.now() : null;

    const order = new Order({
      userId: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      paymentStatus: finalPaymentStatus,
      orderStatus: "Processing",
      isPaid,
      paidAt,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};



module.exports = {
  getOrders,
  getOrderById,
  updateOrderStatus,
  refundOrder,
  createOrder,
};
