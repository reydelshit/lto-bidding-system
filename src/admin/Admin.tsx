import { Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const Admin = () => {
  return (
    <div className="h-dvh w-full p-4">
      <div className="flex h-[5rem] w-full items-center justify-between">
        <h1>LTO POLOMOLOK BIDDING SYSTEM</h1>
        <div>Profile</div>
      </div>

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
          Users
        </Link>
        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/admin/bidding"
        >
          Bids
        </Link>
        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/admin/bidders"
        >
          bidders
        </Link>
        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/admin/winners"
        >
          winners
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
          <Route path="/products" element={<h1>Users</h1>} />
          <Route path="/bidding" element={<h1>Bids</h1>} />
          <Route path="/bidders" element={<h1>bidders</h1>} />
          <Route path="/winners" element={<h1>winners</h1>} />
          <Route path="/bid-history" element={<h1>bid-history</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
