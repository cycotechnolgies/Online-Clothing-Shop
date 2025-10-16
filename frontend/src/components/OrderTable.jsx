import StatusBadge from './StatusBadge';
import { Search, ChevronDown, RefreshCcw, DollarSign, Package, Clock, X, CheckCircle, Truck, TrendingUp, Filter, Users, Calendar } from 'lucide-react';

const OrderTable = ({ orders, selectedOrder, setSelectedOrder, requestSort, sortConfig, getClassNamesFor }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    {['id', 'customer', 'date', 'total', 'status'].map(key => (
                    <th
                        key={key}
                        onClick={() => requestSort(key)}
                        className={`px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none
                            ${key === 'customer' || key === 'date' ? 'hidden sm:table-cell' : ''}`}
                    >
                        <div className="flex items-center">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        <ChevronDown size={14} className={`ml-1 transition-transform ${getClassNamesFor(key)}`} />
                        </div>
                    </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
                {orders.length > 0 ? orders.map((order) => (
                    <tr
                        key={order.id}
                        className={`cursor-pointer transition-colors hover:bg-blue-50 ${selectedOrder?.id === order.id ? 'bg-blue-100' : ''}`}
                        onClick={() => setSelectedOrder(order)}
                    >
                        <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700 hidden sm:table-cell">{order.customer}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{order.date}</td>
                        <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-700 font-semibold">${order.total.toFixed(2)}</td>
                        <td className="px-3 py-3 whitespace-nowrap">
                            <StatusBadge status={order.status} />
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-500">
                            No orders match your criteria.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

export default OrderTable