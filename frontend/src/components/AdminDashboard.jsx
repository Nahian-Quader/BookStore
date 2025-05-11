// // AdminDashboard.jsx
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// export default function AdminDashboard() {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [error, setError] = useState('');

//   // Mock data for demonstration
//   useEffect(() => {
//     const mockSubscriptions = [
//       { id: 1, userId: 'user1@example.com', plan: 'Premium', status: 'Active', endDate: '2024-03-01' },
//       { id: 2, userId: 'user2@example.com', plan: 'Basic', status: 'Expired', endDate: '2023-12-01' },
//     ];
//     setSubscriptions(mockSubscriptions);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//           <Link
//             to="/"
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             Logout
//           </Link>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           {/* Table Header */}
//           <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-900">Subscriptions</h2>
//           </div>

//           {/* Subscription List */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {subscriptions.map((sub) => (
//                   <tr key={sub.id}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sub.userId}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.plan}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         sub.status === 'Active' 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-red-100 text-red-800'
//                       }`}>
//                         {sub.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.endDate}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const history = useHistory(); // Changed from useNavigate to useHistory

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      history.push('/admin/login'); // Changed from navigate to history.push
      return;
    }

    // Verify token and fetch admin data
    const verifyAdmin = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        
        const data = await response.json();
        setAdminData(data);
      } catch (error) {
        localStorage.removeItem('adminToken');
        history.push('/admin/login'); // Changed from navigate to history.push
      }
    };

    verifyAdmin();
  }, [history]); // Changed dependency from navigate to history

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    history.push('/admin/login'); // Changed from navigate to history.push
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {adminData ? (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {adminData.username}!</h2>
            {/* Add your dashboard content here */}
          </div>
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </main>
    </div>
  );
}