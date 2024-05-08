import Profile from '@/assets/man.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BiddingNotificationItem from './NotificationItem';
import { Button } from './ui/button';
import LTO from '@/assets/lto.png';
import VIP from '@/assets/crown.png';
import { Link } from 'react-router-dom';
import { IoNotifications } from 'react-icons/io5';
import { TbVip } from 'react-icons/tb';

interface VipType {
  account_id: string;
  created_on: string;
}

const AvatarCompo = () => {
  const account_id = localStorage.getItem('lto_bidding_token') as string;
  const [notifications, setNotifications] = useState([]);
  const [vipStatus, setVipStatus] = useState<VipType[]>([]);

  const isVip = localStorage.getItem('lto_vip') === 'true';
  const [profile, setProfile] = useState({
    account_id: '',
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    address: '',
    account_type: '',
  });

  const fetchProfile = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/bidders.php`, {
        params: {
          account_id: account_id,
        },
      })
      .then((res) => {
        console.log(res.data, 'sdad');
        setProfile(res.data[0]);
      });
  };

  const fetchNotifications = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/realtimenotif.php`, {
        params: {
          account_id: account_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNotifications(res.data);
      });
  };

  const fetchVipStatus = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/subscribe.php`, {
        params: {
          account_id: account_id,
        },
      })
      .then((res) => {
        console.log(res.data, 'vip status');
        if (res.data.length > 0) {
          setVipStatus(res.data);
        }
      });
  };
  useEffect(() => {
    fetchVipStatus();
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lto_bidding_token');
    localStorage.removeItem('lto_accountType');
    localStorage.removeItem('lto_vip');
    window.location.href = '/login';
  };

  const handleSubscribeVip = () => {
    axios
      .post(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/subscribe.php`, {
        account_id: account_id,
      })
      .then((res) => {
        fetchVipStatus();
        localStorage.setItem('lto_vip', 'true');
      });
  };

  const handleUnSubscribeVip = () => {
    axios
      .delete(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/subscribe.php`, {
        data: {
          account_id: account_id,
        },
      })
      .then((res) => {
        window.location.reload();
        localStorage.removeItem('lto_vip');
      });
  };

  return (
    <div className="flex h-[5rem] w-full items-center justify-between px-[2rem]">
      <div className="flex items-center gap-4">
        <img className="h-[4rem] w-[4rem]" src={LTO} alt="LTO" />
        <h1 className="text-[1.5rem] font-semibold">
          LTO POLOMOLOK BIDDING SYSTEM
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {isVip && profile.account_type !== 'admin' && (
          <TbVip
            className="
          text-3xl text-yellow-500"
          />
        )}

        {profile.account_type !== 'admin' && (
          <Popover>
            <PopoverTrigger
              className="p-2 text-3xl "
              onClick={fetchNotifications}
            >
              <IoNotifications />
            </PopoverTrigger>
            <PopoverContent className="min-h-[20rem] p-0">
              {notifications.map((notification, index) => (
                <BiddingNotificationItem key={index} row={notification} />
              ))}
            </PopoverContent>
          </Popover>
        )}
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-4">
              <Avatar className="h-[3rem] w-[3rem] cursor-pointer">
                <AvatarImage src={Profile} />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>

              <span className="cursor-pointer font-semibold">
                {profile.account_type.includes('admin')
                  ? 'Admin'
                  : profile.first_name}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="mr-[3.5rem] flex min-h-[10rem] flex-col items-center  justify-between gap-2 text-center font-semibold">
            <div className="flex w-full flex-col gap-3">
              {profile.account_type === 'admin' ? (
                <Link
                  to="/admin/calendar"
                  className="cursor-pointer border-b-2 pb-2 hover:text-blue-500"
                >
                  CALENDAR
                </Link>
              ) : (
                <Link
                  to="/view-calendar"
                  className="cursor-pointer border-b-2 pb-2 hover:text-blue-500"
                >
                  VIEW CALENDAR
                </Link>
              )}

              {profile.account_type === 'admin' ? (
                ''
              ) : vipStatus.length > 0 ? (
                <a
                  className="cursor-pointer border-b-2 pb-2 hover:text-blue-500"
                  onClick={handleUnSubscribeVip}
                >
                  UNSUBSCRIBE VIP
                </a>
              ) : (
                <a
                  className="cursor-pointer border-b-2 pb-2 hover:text-blue-500"
                  onClick={handleSubscribeVip}
                >
                  SUBSCRIBE VIP
                </a>
              )}
            </div>

            <Button className="w-[50%]" onClick={handleLogout}>
              Logout
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default AvatarCompo;
