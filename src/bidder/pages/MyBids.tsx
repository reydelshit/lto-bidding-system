import { useEffect, useState } from 'react';
import UserNavigation from '../UserNavigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import axios from 'axios';

type BidsHistoryType = {
  max_bid_for_product: number;
  date_until: string;
  max_bid_overall: number;
  product_name: string;
  status: number;
};

const MyBids = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const [bidsHistory, setBidsHistory] = useState<BidsHistoryType[]>([]);

  const fetchBidsHistory = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/bids-history.php`, {
        params: {
          account_id: localStorage.getItem('lto_bidding_token'),
        },
      })
      .then((res) => {
        console.log(res.data);
        setBidsHistory(res.data);
      });
  };

  useEffect(() => {
    fetchBidsHistory();
  }, []);

  return (
    <div>
      <UserNavigation />

      <div className="my-2 flex w-full items-center justify-between">
        <Input
          onChange={(e) => setSearchProduct(e.target.value)}
          className="w-[20rem]"
          placeholder="search bidders.."
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-black">Product Name</TableHead>
            <TableHead className="font-bold text-black">
              Max Bid Amount
            </TableHead>
            <TableHead className="w-[20rem] font-bold text-black">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bidsHistory
            .filter((bid) => bid.product_name.includes(searchProduct))
            .map((bid, index) => {
              return (
                <TableRow className="border-b-2 text-start" key={index}>
                  <TableCell>{bid.product_name}</TableCell>

                  <TableCell>{bid.max_bid_for_product}</TableCell>
                  <TableCell>
                    {bid.status === 0 && (
                      <span className="rounded-md bg-violet-500 p-1 text-white">
                        Ongoing Bidding
                      </span>
                    )}
                    {bid.status === 1 && (
                      <span className="rounded-md bg-green-500 p-1 text-white">
                        Won
                      </span>
                    )}
                    {bid.status === 2 && (
                      <span className="rounded-md bg-red-500 p-1 text-white">
                        Lost
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyBids;
