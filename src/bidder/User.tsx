import UserNavigation from './UserNavigation';
import Dashboard from './pages/UserDashboard';

const User = () => {
  return (
    <div className="h-full w-full bg-gray-50">
      <UserNavigation />
      <Dashboard />
    </div>
  );
};

export default User;
