import AvatarCompo from '@/components/AvatarCompo';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';
import { FaHistory } from 'react-icons/fa';
const UserNavigation = () => {
  return (
    <div className="bg-white">
      <AvatarCompo />

      <div className="flex justify-around gap-4 border-b-2 px-[2rem] py-2 shadow-sm">
        <Link
          className="flex w-full items-center gap-2 p-2 text-start text-xl 
        font-semibold uppercase"
          to="/"
        >
          <FaHome className="text-blue-500" /> Home
        </Link>

        <Link
          className="flex w-full items-center gap-2 p-2 text-start text-xl 
     font-semibold uppercase"
          to="/my-bids"
        >
          <GrMoney className="text-blue-500" /> My Bids
        </Link>

        <Link
          className="flex w-full items-center gap-2 p-2 text-start text-xl 
       font-semibold uppercase"
          to="/product-bid-history"
        >
          <FaHistory className="text-blue-500" /> Product Bid History
        </Link>
      </div>
    </div>
  );
};

export default UserNavigation;
