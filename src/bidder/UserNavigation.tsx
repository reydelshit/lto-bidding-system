import { Link } from 'react-router-dom';

const UserNavigation = () => {
  return (
    <>
      <div className="flex h-[5rem] w-full items-center justify-between">
        <h1>LTO POLOMOLOK BIDDING SYSTEM</h1>
        <div>Profile</div>
      </div>

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

        {/* <Link
          className="w-full rounded-md bg-green-500 p-2 text-center text-white hover:bg-green-300"
          to="/bid-history"
        >
          bid-history
        </Link> */}
      </div>
    </>
  );
};

export default UserNavigation;
