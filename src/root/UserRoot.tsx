import User from '@/bidder/User';
import Navigation from '@/components/Navigation';
import { Outlet, useLocation } from 'react-router-dom';

export default function UserRoot() {
  const location = useLocation();

  return (
    <div className="flex w-full flex-col bg-primary-red">
      <Navigation />
      <div className="w-full border-2 px-2">
        {location.pathname === '/' ? <User /> : <Outlet />}
      </div>
    </div>
  );
}
