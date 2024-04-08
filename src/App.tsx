import { Route, Routes } from 'react-router-dom';
import Admin from './admin/Admin';
// import Dashboard from './bidder/Dashboard';
import User from './bidder/User';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="h-dvh w-dvw items-center  overflow-x-hidden  border-4">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route>
          <Route path="/" element={<User />} />
          {/* <Route path="/dashboad" element={<Dashboard />} /> */}
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
