import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Dummy orders
    const dummyOrders = [
      {
        _id: "1",
        orderId: "12526",
        productName: "Classic White T-Shirt",
        productImage: "http://localhost:3000/src/assets/tshirt.jpg",
        payment: "Paid",
        status: "Pending",
        total: 4440,
        trackingNumber: "TRK12345",
        orderDate: "2025-09-01",
      },
      {
        _id: "2",
        orderId: "52689",
        productName: "Saree",
        productImage: "https://img.faballey.com/images/Product/ISK00754Z/d3.jpg",
        payment: "COD",
        status: "Cancelled",
        total: 5000,
        trackingNumber: "TRK22346",
        orderDate: "2025-08-20",
      },
      {
        _id: "3",
        orderId: "52648",
        productName: "Washed Denim Double Pocket Jacket",
        productImage: "http://localhost:3000/src/assets/denim-jacket.jpeg",
        payment: "COD",
        status: "Completed",
        total: 8000,
        trackingNumber: "TRK32347",
        orderDate: "2025-08-15",
      },
    ];
    setOrders(dummyOrders);
  }, []);

  // Filter orders based on status and search query
  const filteredOrders = orders.filter((order) => {
    if (filter !== "All" && order.status !== filter) return false;

    if (search) {
      const query = search.toLowerCase();
      return (
        order.productName.toLowerCase().includes(query) ||
        order.orderId.toLowerCase().includes(query) ||
        order.trackingNumber.toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query) ||
        order.payment.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 px-4 py-8 md:px-6 md:py-10 bg-gray-50 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Order History</h1>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
            {["All", "Pending", "Completed", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === tab
                    ? "bg-indigo-600 text-white font-medium"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by Order ID, Product, Tracking..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2.5 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Orders Table */}
          <div className="bg-white shadow rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Tracking</th>
                  <th className="p-4">Order Date</th>
                  <th className="p-4">Total</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="p-4 font-medium text-indigo-600">#{order.orderId}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.productImage}
                          alt={order.productName}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <span>{order.productName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.payment === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.payment}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 font-mono">{order.trackingNumber}</td>
                    <td className="p-4">{order.orderDate}</td>
                    <td className="p-4 font-semibold">Rs. {order.total.toLocaleString('en-LK')}</td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderHistory;
