import {  X } from 'lucide-react';

const statusOptions = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];

const Modal = ({ title, description, isOpen, onClose, onConfirm, actionType, orderId, newStatus, setNewStatus, refundAmount, setRefundAmount }) => {

    if (!isOpen) return null;

  const getConfirmButtonColor = () => {
    return actionType === 'refund' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700';
  };
  
  const handleConfirm = () => {
    // Pass the relevant data back to the parent App component
    const payload = actionType === 'status' ? { newStatus } : { refundAmount };
    onConfirm(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <p className="text-gray-600 mb-6">{description} **Order {orderId}**.</p>
        
        {actionType === 'status' && (
          <div className="mb-4">
            <label htmlFor="newStatus" className="block text-sm font-medium text-gray-700">Select New Status</label>
            <select
              id="newStatus"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {statusOptions.filter(s => s !== 'All').map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
        {actionType === 'refund' && (
          <div className="mb-4">
            <label htmlFor="refundAmount" className="block text-sm font-medium text-gray-700">Refund Amount ($)</label>
            <input
              type="number"
              id="refundAmount"
              className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:ring-red-500 focus:border-red-500"
              value={refundAmount}
              onChange={(e) => setRefundAmount(parseFloat(e.target.value))}
              step="0.01"
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 text-sm font-medium text-white ${getConfirmButtonColor()} rounded-lg transition-colors shadow-md`}
          >
            {actionType === 'refund' ? 'Confirm Refund' : 'Confirm Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal