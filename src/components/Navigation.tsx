// import WeatherApi from '@/components/WeatherApi'
import { Link, useLocation } from 'react-router-dom';

import { GiPlantSeed } from 'react-icons/gi';

export default function Navigation() {
  const currentPath = useLocation().pathname;

  const handleLogout = () => {
    localStorage.removeItem('cmhs_token');
    localStorage.removeItem('cmhs_account_type');
    window.location.reload();
  };
  return (
    <div className="block h-[10rem] w-full border-4 border-orange-500">
      <Link
        className={`mb-2 flex items-center gap-2 p-2 text-[1.5rem] ${
          currentPath == '/' || currentPath.includes('/')
            ? ' flex w-full justify-center self-center rounded-full bg-green-500 text-white active:text-red-600'
            : ''
        } `}
        to="/"
      >
        <GiPlantSeed className="text-md h-[1.5rem] w-[1.5rem]" />
        Dashboard
      </Link>
    </div>
  );
}

// <div className=" flex flex-col justify-between w-full h-[90%]">
//         <div className="flex flex-col font-semibold px-[1rem] mt-[4rem] mb-2">
//           <Link
//             className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
//               currentPath == '/' || currentPath.includes('/crops')
//                 ? ' bg-primary-red text-primary-yellow rounded-full self-center flex justify-center w-full active:text-primary-yellow'
//                 : ''
//             } `}
//             to="/"
//           >
//             <GiPlantSeed className="text-md h-[1.5rem] w-[1.5rem]" />
//             Crops
//           </Link>

//           <Link
//             className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
//               currentPath == '/manage-field'
//                 ? ' bg-primary-red text-primary-yellow rounded-full self-center flex justify-center w-full active:text-primary-yellow'
//                 : ''
//             } `}
//             to="/manage-field"
//           >
//             <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" />
//             Field
//           </Link>
//           <Link
//             className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
//               currentPath == '/generate-schedule'
//                 ? ' bg-primary-red text-primary-yellow rounded-full self-center flex justify-center w-full active:text-primary-yellow'
//                 : ''
//             } `}
//             to="/generate-schedule"
//           >
//             <GrSchedules className="text-md h-[1.5rem] w-[1.5rem]" /> Schedule
//           </Link>
//           <Link
//             className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
//               currentPath == '/reporting'
//                 ? ' bg-primary-red text-primary-yellow rounded-full self-center flex justify-center w-full active:text-primary-yellow'
//                 : ''
//             } `}
//             to="/reports"
//           >
//             <GrAnalytics className="text-md h-[1.5rem] w-[1.5rem]" /> Reports
//           </Link>
//         </div>

//         <div className="flex justify-center flex-col items-center mt-1">
//           {/* <WeatherApi /> */}

//           <Button
//             className="bg-primary-yellow border-4 border-primary-red p-6 rounded-full w-[10rem] font-bold text-primary-red hover:bg-primary-red hover:text-primary-yellow transition-all duration-300 ease-in-out text-2xl"
//             onClick={handleLogout}
//           >
//             Logout
//           </Button>
//         </div>
//       </div>
