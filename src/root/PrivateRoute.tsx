import { Navigate } from 'react-router-dom';

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const lto_bidding_token = localStorage.getItem('lto_bidding_token');
  const lto_accountType = localStorage.getItem('lto_accountType');

  if (!lto_accountType || !lto_bidding_token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (lto_accountType === 'admin') {
    return window.location.pathname === '/admin' ? (
      children
    ) : (
      <Navigate to="/" replace={true} />
    );
  }

  return children;
}
