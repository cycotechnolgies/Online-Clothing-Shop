import StatCard from "../../components/StatCard";
import Modal from "../../components/Modal";
import OrderDetailPanel from "../../components/OrderDetailPanel";
import OrderFiltersAndSearch from "../../components/OrderFiltersAndSearch";
import OrderTable from "../../components/OrderTable";
import React, { useState, useMemo, useCallback } from 'react';
import {  Clock, CheckCircle, Truck, TrendingUp } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-1001', customer: 'Alice Johnson', date: '2025-10-04', total: 124.99, status: 'Shipped', payment: 'Paid', items: 3, tracking: 'TN12345678', address: '123 Main St, Anytown, USA' },
  { id: 'ORD-1002', customer: 'Bob Smith', date: '2025-10-04', total: 45.00, status: 'Pending', payment: 'Processing', items: 1, tracking: null, address: '45 Oak Ave, Smallville, USA' },
  { id: 'ORD-1003', customer: 'Charlie Brown', date: '2025-10-03', total: 299.99, status: 'Delivered', payment: 'Paid', items: 5, tracking: 'TN98765432', address: '789 Pine Ln, Metropolis, USA' },
  { id: 'ORD-1004', customer: 'Diana Prince', date: '2025-10-02', total: 14.50, status: 'Cancelled', payment: 'Refunded', items: 1, tracking: null, address: '101 Justice Way, Themyscira' },
  { id: 'ORD-1005', customer: 'Ethan Hunt', date: '2025-10-01', total: 550.75, status: 'Shipped', payment: 'Paid', items: 4, tracking: 'TN11223344', address: '90 Sector 7, Secret Base' },
  { id: 'ORD-1006', customer: 'Fiona Glenanne', date: '2025-09-30', total: 88.00, status: 'Pending', payment: 'Failed', items: 2, tracking: null, address: '88 Spy Blvd, Miami' },
];

const statusOptions = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

export default function OrderManagement() {
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState({ type: null, order: null });
  const [newStatus, setNewStatus] = useState('Shipped');
  const [refundAmount, setRefundAmount] = useState(0);


  // --- Filtering, Searching, and Sorting Logic ---
  const filteredAndSortedOrders = useMemo(() => {
    let sortableOrders = [...orders];

    // 1. Filtering by Status
    if (filterStatus !== 'All') {
      sortableOrders = sortableOrders.filter(order => order.status === filterStatus);
    }

    // 2. Searching by ID or Customer Name
    if (searchTerm) {
      sortableOrders = sortableOrders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Sorting
    if (sortConfig.key) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableOrders;
  }, [orders, filterStatus, searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (key) => {
    if (!sortConfig) return;
    return sortConfig.key === key ? (sortConfig.direction === 'ascending' ? 'rotate-180' : '') : 'opacity-30';
  };

  // --- Action Handlers ---

  const handleUpdateStatus = useCallback((order) => {
    setModalAction({ type: 'status', order });
    // Set initial value for status modal
    const nextStatus = order.status === 'Pending' ? 'Shipped' : statusOptions.filter(s => s !== 'All' && s !== 'Delivered' && s !== 'Cancelled')[0] || 'Shipped';
    setNewStatus(nextStatus);
    setIsModalOpen(true);
  }, []);

  const handleProcessRefund = useCallback((order) => {
    setModalAction({ type: 'refund', order });
    // Set initial value for refund modal
    setRefundAmount(order.total);
    setIsModalOpen(true);
  }, []);

  const handleModalConfirm = (payload) => {
    console.log(`${modalAction.type} action confirmed for Order: ${modalAction.order.id}`, payload);

    // Update the local state
    setOrders(prevOrders => prevOrders.map(o => {
        if (o.id === modalAction.order.id) {
            if (modalAction.type === 'status') {
                return { ...o, status: payload.newStatus };
            }
            if (modalAction.type === 'refund') {
                // Simplified: assuming full refund leads to cancelled status
                return { ...o, payment: 'Refunded', status: 'Cancelled' };
            }
        }
        return o;
    }));

    setIsModalOpen(false);
    setSelectedOrder(null); // Deselect after action
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalAction({ type: null, order: null });
  };

  // --- Dashboard Stats ---

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.status !== 'Cancelled' ? order.total : 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const shippedOrders = orders.filter(o => o.status === 'Shipped').length;


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 font-sans">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        Order Management Dashboard
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={TrendingUp} title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} color="border-blue-500" />
        <StatCard icon={CheckCircle} title="Orders Placed" value={totalOrders} color="border-indigo-500" />
        <StatCard icon={Clock} title="Pending Orders" value={pendingOrders} color="border-yellow-500" />
        <StatCard icon={Truck} title="Orders Shipped" value={shippedOrders} color="border-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 1. Order List (2/3 width on desktop) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Orders ({filteredAndSortedOrders.length})</h2>

          <OrderFiltersAndSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          <OrderTable
            orders={filteredAndSortedOrders}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            requestSort={requestSort}
            sortConfig={sortConfig}
            getClassNamesFor={getClassNamesFor}
          />
        </div>

        {/* 2. Order Detail View (1/3 width on desktop) */}
        <div className="lg:col-span-1">
          <OrderDetailPanel
            order={selectedOrder}
            onUpdateStatus={handleUpdateStatus}
            onProcessRefund={handleProcessRefund}
          />
        </div>
      </div>

      {/* Modal for Status Update/Refund */}
      <Modal
        title={modalAction.type === 'status' ? 'Update Order Status' : 'Process Refund'}
        description={
            modalAction.type === 'status'
                ? `Confirm and change the status for `
                : `Are you sure you want to process a refund for `
        }
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        actionType={modalAction.type}
        orderId={modalAction.order?.id}
        // Controlled props for the Modal inputs
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        refundAmount={refundAmount}
        setRefundAmount={setRefundAmount}
      />
    </div>
  );
}

