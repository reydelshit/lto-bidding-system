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
import Layout from './root/Layout';
import LayoutUser from './root/LayoutUser';
import RedirectedPage from './pages/RedirectedPage';

function App() {
  return (
    <div className="h-dvh w-dvw items-center  overflow-x-hidden  border-4">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/redirect" element={<RedirectedPage />} />

        <Route>
          <Route
            path="/"
            element={
              <LayoutUser>
                <User />
              </LayoutUser>
            }
          />
          <Route path="/my-bids" element={<MyBids />} />
          <Route path="/view/:id" element={<ViewProduct />} />
          <Route path="/product-bid-history" element={<BidHistory />} />
          <Route path="/bid-logs/:id" element={<BidLogs />} />
          <Route path="/view-calendar" element={<ViewCalendar />} />
        </Route>
        <Route
          path="/admin/*"
          element={
            <Layout>
              <Admin />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
