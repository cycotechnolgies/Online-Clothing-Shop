const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className={`p-4 rounded-xl shadow-lg bg-white border-l-4 ${color} flex items-center justify-between`}>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
    <Icon className="text-gray-400 opacity-50" size={32} />
  </div>
);

export default StatCard