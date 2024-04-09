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

type ProductBidHistoryType = {
  product_id: number;
  product_name: string;
  amount_bid: number;
  createdOn: string;
  bidding_id: number;
  image_path: string;
  acount_id: number;
  username: string;
};

const BidLogs = () => {
  const [product, setProduct] = useState<ProductBidHistoryType[]>([]);
  const [productName, setProductName] = useState<string>('');
  const { id } = useParams<{ id: string }>();

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
    <div>
      <UserNavigation />

      <h1 className="my-2 text-[2rem]">PRODUCT BID HISTORY</h1>

      <h1 className="my-2 text-center text-[2rem]">
        Product: {productName.length > 0 ? productName : 'No Product'}
      </h1>

      <div className="flex w-full items-center justify-center">
        <div className="w-[50%]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-black">Bidder</TableHead>
                <TableHead className="w-[20rem] font-bold text-black">
                  Bid Amount
                </TableHead>
                <TableHead className="font-bold text-black">Bid Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.map((bid, index) => {
                return (
                  <TableRow className="border-b-2 text-start" key={index}>
                    <TableCell>
                      {bid.username.charAt(0) +
                        bid.username.slice(1, -1).replace(/./g, '*') +
                        bid.username.charAt(bid.username.length - 1)}
                    </TableCell>
                    <TableCell>₱ {bid.amount_bid}</TableCell>
                    <TableCell>{bid.createdOn}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BidLogs;
