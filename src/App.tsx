import { Link, Route, Routes } from 'react-router-dom';
import Admin from './admin/Admin';
// import Dashboard from './bidder/Dashboard';
import User from './bidder/User';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBids from './bidder/pages/MyBids';
import ViewProduct from './bidder/pages/ViewProduct';
import BidHistory from './bidder/pages/BidHistory';
import BidLogs from './bidder/pages/BidLogs';
import ViewCalendar from './bidder/pages/ViewCalendar';

function App() {
  return (
    <div className="h-dvh w-dvw items-center  overflow-x-hidden  border-4">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route>
          <Route path="/" element={<User />} />
          <Route path="/my-bids" element={<MyBids />} />
          <Route path="/view/:id" element={<ViewProduct />} />
          <Route path="/product-bid-history" element={<BidHistory />} />
          <Route path="/bid-logs/:id" element={<BidLogs />} />
          <Route path="/view-calendar" element={<ViewCalendar />} />
        </Route>
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
