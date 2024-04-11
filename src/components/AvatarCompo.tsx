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
    <div className="flex h-[5rem] w-full items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <img className="h-[4rem] w-[4rem]" src={LTO} alt="LTO" />
        <h1 className="text-[1.5rem] font-bold">
          LTO POLOMOLOK BIDDING SYSTEM
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {isVip && profile.account_type !== 'admin' && (
          <img src={VIP} alt="vip" className="h-[4rem] w-[4rem]" />
        )}

        {profile.account_type !== 'admin' && (
          <Popover>
            <PopoverTrigger
              className="rounded-md bg-green-500 p-2 text-white"
              onClick={fetchNotifications}
            >
              Notification
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
              <Avatar className="h-[4rem] w-[4rem] cursor-pointer">
                <AvatarImage src={Profile} />
                <AvatarFallback>Profile</AvatarFallback>
              </Avatar>

              <span className="cursor-pointer">
                {profile.account_type.includes('admin')
                  ? 'Admin'
                  : profile.first_name}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2">
            {profile.account_type === 'admin' ? (
              <Button>
                <Link to="/admin/calendar">CALENDAR</Link>
              </Button>
            ) : (
              <Button>
                <Link to="/view-calendar">VIEW CALENDAR</Link>
              </Button>
            )}

            {profile.account_type === 'admin' ? (
              ''
            ) : vipStatus.length > 0 ? (
              <Button onClick={handleUnSubscribeVip}>UNSUBSCRIBE VIP</Button>
            ) : (
              <Button onClick={handleSubscribeVip}>SUBSCRIBE VIP</Button>
            )}

            <Button onClick={handleLogout}>Logout</Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default AvatarCompo;
