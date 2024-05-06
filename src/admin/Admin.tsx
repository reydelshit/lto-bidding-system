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
import { MdOutlineDashboard } from 'react-icons/md';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import { MdAutoGraph } from 'react-icons/md';
import { GrMoney } from 'react-icons/gr';
import { FaHistory } from 'react-icons/fa';

const Admin = () => {
  return (
    <div className="bg-gray-50">
      <div className="w-full bg-white">
        <AvatarCompo />

        <div className="flex justify-around gap-4 px-[2rem] py-2 shadow-sm">
          <Link
            className="flex w-full items-center gap-2 p-2 text-start text-xl 
  font-semibold uppercase"
            to="/admin/"
          >
            <MdOutlineDashboard className="text-blue-500" /> Dashboard
          </Link>
          <Link
            className="flex w-full items-center gap-2 p-2 text-start text-xl 
  font-semibold uppercase"
            to="/admin/products"
          >
            <MdProductionQuantityLimits className="text-blue-500" /> Products
          </Link>
          <Link
            className="flex w-full items-center gap-2 p-2 text-start text-xl 
  font-semibold uppercase"
            to="/admin/bidders"
          >
            <FaUserTie className="text-blue-500" /> Bidders
          </Link>
          <Link
            className="flex w-full items-center gap-2 p-2 text-start text-xl 
  font-semibold uppercase"
            to="/admin/biddings"
          >
            <MdAutoGraph className="text-blue-500" /> biddings
          </Link>
          <Link
            className="flex w-full items-center gap-2 p-2 text-start text-xl 
  font-semibold uppercase"
            to="/admin/payments"
          >
            <GrMoney className="text-blue-500" /> Payments
          </Link>
          <Link
            className="flex w-full items-center gap-2 p-2 text-start text-xl 
  font-semibold uppercase"
            to="/admin/bid-history"
          >
            <FaHistory className="text-blue-500" /> bid-history
          </Link>
        </div>
      </div>

      <div className="h-full">
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
