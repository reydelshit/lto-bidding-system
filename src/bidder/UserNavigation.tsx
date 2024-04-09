import AvatarCompo from '@/components/AvatarCompo';
import { Link } from 'react-router-dom';

const UserNavigation = () => {
  return (
    <>
      <AvatarCompo />

      <div className="flex justify-around gap-4">
        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/"
        >
          Home
        </Link>

        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/my-bids"
        >
          My Bids
        </Link>

        <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/product-bid-history"
        >
          Product Bid History
        </Link>
      </div>
    </>
  );
};

export default UserNavigation;
