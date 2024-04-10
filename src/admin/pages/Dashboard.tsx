import { GoNumber } from 'react-icons/go';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import CardCompo from '../utils/CardCompo';
import axios from 'axios';
import { BiddersType, ProductType } from '@/entities/types';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [bidders, setBidders] = useState<BiddersType[]>([]);
  const [winners, setWinners] = useState([]);
  const [monthlyProducts, setMonthlyProducts] = useState([]);
  const [monthlyBidders, setMonthlyBidders] = useState([]);

  const fetchProduct = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product.php`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      });
  };

  const fetchBidders = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/bidders.php`)
      .then((res) => {
        console.log(res.data);
        setBidders(res.data);
      });
  };

  const fetchWinners = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/numberwinners.php`)
      .then((res) => {
        console.log(res.data);
        setWinners(res.data);
      });
  };

  const fetchMonthlyProducts = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/graphs.php`, {
        params: {
          products: true,
        },
      })
      .then((res) => {
        console.log(res.data, 'sss');
        setMonthlyProducts(res.data);
      });
  };

  const fetchMonthlyBidders = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/graphs.php`, {
        params: {
          bidders: true,
        },
      })
      .then((res) => {
        console.log(res.data, 'sss');
        setMonthlyBidders(res.data);
      });
  };

  useEffect(() => {
    Promise.all([
      fetchProduct(),
      fetchBidders(),
      fetchWinners(),
      fetchMonthlyProducts(),
      fetchMonthlyBidders(),
    ]);
  }, []);

  return (
    <div className="mt-[2rem]">
      <h1 className="my-4 text-2xl font-bold">Dashboard</h1>

      <div className="flex gap-4">
        <CardCompo
          title="TOTAL NUMBER OF PRODUCTS"
          description="The total number of products added in the system."
          icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
          value={product.length.toString()}
        />
        <CardCompo
          title="TOTAL NUMBER OF BIDDERS"
          description="The total number of bidders registered in the system."
          icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
          value={bidders.length.toString()}
        />
        <CardCompo
          title="TOTAL NUMBER OF BIDDER WINNERS"
          description="The total number of bid winners."
          icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
          value={winners.length.toString()}
        />
      </div>

      <div className="mt-[2rem] flex justify-between gap-2">
        <div className="w-[60%] rounded-lg border-2 bg-white md:p-5">
          <h1 className="mb-5 font-bold uppercase">Monthly Product</h1>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={monthlyProducts}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: string) => `${value}`}
              />
              <Bar dataKey="total" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-[40%] rounded-lg border-2 bg-white md:p-5">
          <h1 className="mb-5 font-bold uppercase">Monthly Bidders</h1>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={monthlyBidders}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: string) => `${value}`}
              />
              <Bar dataKey="total" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
