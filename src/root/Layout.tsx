import { Navigate, Outlet } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  const lto_bidding_token = localStorage.getItem('lto_bidding_token');
  const lto_accountType = localStorage.getItem('lto_accountType');

  if (!lto_accountType || !lto_bidding_token) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div>{lto_accountType === 'admin' ? children : <Navigate to="/" />}</div>
  );
}
