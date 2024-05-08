import AvatarCompo from '@/components/AvatarCompo';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';
import { FaHistory } from 'react-icons/fa';
const UserNavigation = () => {
  const currentPath = useLocation().pathname;

  return (
    <div className="bg-white">
      <AvatarCompo />

      <div className="flex justify-around gap-4 border-b-2 px-[2rem] py-2 shadow-sm">
        <Link
          className={`flex w-full items-center gap-2 p-2 text-start text-xl 
        font-semibold uppercase ${
          currentPath == '/'
            ? ' rounded-md bg-blue-500 text-start text-white'
            : ''
        }`}
          to="/"
        >
          <FaHome
            className={`{currentPath == '/admin/'
              ? 'text-inherit'
              : ''
            } `}
          />{' '}
          Home
        </Link>

        <Link
          className={`flex w-full items-center gap-2 p-2 text-start text-xl 
     font-semibold uppercase ${
       currentPath == '/my-bids'
         ? ' rounded-md bg-blue-500 text-start text-white'
         : ''
     }`}
          to="/my-bids"
        >
          <GrMoney
            className={`{currentPath == '/my-bids'
              ? 'text-inherit'
              : ''
            } `}
          />{' '}
          My Bids
        </Link>

        <Link
          className={`flex w-full items-center gap-2 p-2 text-start text-xl 
       font-semibold uppercase ${
         currentPath == '/product-bid-history'
           ? ' rounded-md bg-blue-500 text-start text-white'
           : ''
       }`}
          to="/product-bid-history"
        >
          <FaHistory
            className={`{currentPath == '/roduct-bid-history'
              ? 'text-inherit'
              : ''
            } `}
          />{' '}
          Product Bid History
        </Link>
      </div>
    </div>
  );
};

export default UserNavigation;
