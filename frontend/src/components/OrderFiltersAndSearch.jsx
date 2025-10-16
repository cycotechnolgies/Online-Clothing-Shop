import { Search, ChevronDown, RefreshCcw, DollarSign, Package, Clock, X, CheckCircle, Truck, TrendingUp, Filter, Users, Calendar } from 'lucide-react';

const statusOptions = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

const OrderFiltersAndSearch = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
        <div className="relative flex-grow">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
            type="text"
            placeholder="Search by ID or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
        </div>

        <div className="relative">
            <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full sm:w-40 appearance-none bg-white pl-10 pr-8 py-2 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            >
            {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
            ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
    </div>
);
export default OrderFiltersAndSearch