const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered': return 'text-green-700 bg-green-100';
    case 'Shipped': return 'text-blue-700 bg-blue-100';
    case 'Pending': return 'text-yellow-700 bg-yellow-100';
    case 'Cancelled': return 'text-red-700 bg-red-100';
    default: return 'text-gray-700 bg-gray-100';
  }
};

const StatusBadge = ({ status }) => (
  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
    {status}
  </span>
);
export default StatusBadge