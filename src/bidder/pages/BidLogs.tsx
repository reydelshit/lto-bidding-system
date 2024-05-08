import axios from 'axios';
import { useEffect, useState } from 'react';
import UserNavigation from '../UserNavigation';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import moment from 'moment';

type ProductBidHistoryType = {
  product_id: number;
  product_name: string;
  amount_bid: number;
  createdOn: string;
  bidding_id: number;
  image_path: string;
  account_id: number;
  username: string;
};

const BidLogs = () => {
  const [product, setProduct] = useState<ProductBidHistoryType[]>([]);
  const [productName, setProductName] = useState<string>('');
  const { id } = useParams<{ id: string }>();
  const [username, setUsername] = useState<string>('');

  const account_id_local = localStorage.getItem('lto_bidding_token') as string;
  const fetchProduct = async () => {
    await axios
      .get(
        `${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product-bid-history.php`,
        {
          params: {
            bid_logs: true,
            product_id: id,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setProductName(res.data[0].product_name);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="h-full w-full bg-gray-50">
      <UserNavigation />

      <div className=" mx-[2rem] h-full w-full bg-gray-50">
        <h1 className="my-4 text-[1.5rem] font-semibold">
          PRODUCT BID HISTORY{' '}
          <span className="text-gray-500">{'>'} List of Bid History</span>
        </h1>
        <h1 className="my-2 mt-[2rem] text-center text-[2rem] uppercase">
          {productName.length > 0 ? productName : 'No Product'}
        </h1>

        <div className="flex w-full items-center justify-center">
          <div className="w-[50%] border-2 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-blue-500">
                    Bidder
                  </TableHead>
                  <TableHead className="w-[20rem] font-bold text-blue-500">
                    Bid Amount
                  </TableHead>
                  <TableHead className="font-bold text-blue-500">
                    Bid Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {product.map((bid, index) => {
                  return (
                    <TableRow className="border-b-2 text-start" key={index}>
                      <TableCell className="font-bold">
                        {bid.account_id !== parseInt(account_id_local)
                          ? bid.username.charAt(0) +
                            bid.username.slice(1, -1).replace(/./g, '*') +
                            bid.username.charAt(bid.username.length - 1)
                          : 'You'}
                      </TableCell>
                      <TableCell className="font-bold">
                        ₱ {bid.amount_bid}
                      </TableCell>
                      <TableCell>
                        {moment(bid.createdOn).format('LLL')}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidLogs;
