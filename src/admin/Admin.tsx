import { Route, Routes, Link, useLocation } from 'react-router-dom';
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
  const currentPath = useLocation().pathname;

  return (
    <div className="bg-gray-50">
      <div className="w-full bg-white">
        <AvatarCompo />

        <div className="flex justify-around gap-4 px-[2rem] py-2 shadow-sm">
          <Link
            className={`flex w-full items-center gap-2 p-2 text-start text-xl 
              font-semibold uppercase ${
                currentPath == '/admin/'
                  ? ' rounded-md bg-blue-500 text-start text-white'
                  : ''
              }`}
            to="/admin/"
          >
            <MdOutlineDashboard
              className={`{currentPath == '/admin/'
              ? 'text-inherit'
              : ''
            } `}
            />{' '}
            Dashboard
          </Link>
          <Link
            className={`flex w-full items-center gap-2 p-2 text-start text-xl 
  font-semibold uppercase ${
    currentPath == '/admin/products'
      ? ' rounded-md bg-blue-500 text-start text-white'
      : ''
  }`}
            to="/admin/products"
          >
            <MdProductionQuantityLimits
              className={`{currentPath == '/admin/products'
              ? 'text-inherit'
              : ''
            } `}
            />{' '}
            Products
          </Link>
          <Link
            className={`flex w-full items-center gap-2 p-2 text-start text-xl 
  font-semibold uppercase ${
    currentPath == '/admin/bidders'
      ? ' rounded-md bg-blue-500 text-start text-white'
      : ''
  }`}
            to="/admin/bidders"
          >
            <FaUserTie
              className={`{currentPath == '/admin/bidders'
              ? 'text-inherit'
              : ''
            } `}
            />{' '}
            Bidders
          </Link>
          <Link
            className={`flex w-full items-center gap-2 p-2 text-start text-xl 
  font-semibold uppercase ${
    currentPath == '/admin/biddings'
      ? ' rounded-md bg-blue-500 text-start text-white'
      : ''
  }`}
            to="/admin/biddings"
          >
            <MdAutoGraph
              className={`{currentPath == '/admin/biddings'
              ? 'text-inherit'
              : ''
            } `}
            />{' '}
            biddings
          </Link>
          <Link
            className={`flex w-full items-center gap-2 p-2 text-start text-xl 
  font-semibold uppercase ${
    currentPath == '/admin/payments'
      ? ' rounded-md bg-blue-500 text-start text-white'
      : ''
  }`}
            to="/admin/payments"
          >
            <GrMoney
              className={`{currentPath == '/admin/payments'
              ? 'text-inherit'
              : ''
            } `}
            />{' '}
            Payments
          </Link>
          <Link
            className={`flex w-full items-center gap-2 p-2 text-start text-xl 
  font-semibold uppercase ${
    currentPath == '/admin/bid-history'
      ? ' rounded-md bg-blue-500 text-start text-white'
      : ''
  }`}
            to="/admin/bid-history"
          >
            <FaHistory
              className={`{currentPath == '/admin/bid-history'
              ? 'text-inherit'
              : ''
            } `}
            />{' '}
            bid-history
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
