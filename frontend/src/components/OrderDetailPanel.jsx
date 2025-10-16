import { Search, ChevronDown, RefreshCcw, DollarSign, Package, Clock, X, CheckCircle, Truck, TrendingUp, Filter, Users, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';
const OrderDetailPanel = ({ order, onUpdateStatus, onProcessRefund }) => {
  if (!order) return (
    <div className="p-6 h-full flex items-center justify-center bg-gray-50 rounded-xl">
      <div className="text-center text-gray-500">
        <TrendingUp size={48} className="mx-auto mb-2 text-gray-300" />
        <p>Select an order from the list to view details.</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg h-full overflow-y-auto">
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        <h2 className="text-3xl font-extrabold text-gray-800">Order #{order.id}</h2>
        <StatusBadge status={order.status} />
      </div>

      <div className="space-y-6">
        {/* Customer & Dates */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 font-medium flex items-center"><Users size={16} className="mr-2"/>Customer</p>
            <p className="font-semibold text-gray-900 mt-1">{order.customer}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium flex items-center"><Calendar size={16} className="mr-2"/>Order Date</p>
            <p className="font-semibold text-gray-900 mt-1">{order.date}</p>
          </div>
        </div>

        {/* Payment & Shipping */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 font-medium flex items-center"><DollarSign size={16} className="mr-2"/>Payment Status</p>
            <p className="font-semibold text-gray-900 mt-1">{order.payment}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium flex items-center"><Truck size={16} className="mr-2"/>Tracking ID</p>
            <p className="font-semibold text-gray-900 mt-1">{order.tracking || 'N/A'}</p>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <p className="text-gray-500 font-medium mb-1 flex items-center"><Package size={16} className="mr-2"/>Shipping Address</p>
          <p className="font-semibold text-gray-900">{order.address}</p>
        </div>

        {/* Products List (Mocked) */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Products ({order.items})</h3>
          <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-700">Premium Widget (x1)</span>
              <span className="font-medium">$99.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Eco-Friendly Mug (x2)</span>
              <span className="font-medium">$25.99</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t flex space-x-3">
          <button
            onClick={() => onUpdateStatus(order)}
            className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md shadow-blue-200"
            disabled={order.status === 'Cancelled' || order.status === 'Delivered'}
          >
            <RefreshCcw size={18} className="mr-2" />
            Update Status
          </button>
          <button
            onClick={() => onProcessRefund(order)}
            className="flex items-center justify-center px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md shadow-red-200"
            disabled={order.payment !== 'Paid'}
          >
            <DollarSign size={18} className="mr-2" />
            Process Refund
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderDetailPanel