import { Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import UpdateProducts from './components/UpdateProduct';
import Bidders from './pages/Bidders';
import Biddings from './pages/Bidding';
import Payments from './pages/Payments';
import AdminBidH from './pages/AdminBidH';
import ViewAdminBidH from './pages/ViewAdminBidH';
import AvatarCompo from '@/components/AvatarCompo';
import Calendar from './pages/Calendar';

const Admin = () => {
  return (
    <div className="h-dvh w-full p-4">
      <AvatarCompo />

      <div className="flex justify-around gap-4">
        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/admin/"
        >
          Dashboard
        </Link>
        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/admin/products"
        >
          Products
        </Link>
        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/admin/bidders"
        >
          Bidders
        </Link>
        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/admin/biddings"
        >
          biddings
        </Link>
        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/admin/payments"
        >
          Payments
        </Link>
        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/admin/bid-history"
        >
          bid-history
        </Link>
      </div>

      <div className="h-full border-2">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/update/:id" element={<UpdateProducts />} />
          <Route path="/bidders" element={<Bidders />} />
          <Route path="/biddings" element={<Biddings />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/bid-history" element={<AdminBidH />} />
          <Route path="/bid-history/:id" element={<ViewAdminBidH />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
