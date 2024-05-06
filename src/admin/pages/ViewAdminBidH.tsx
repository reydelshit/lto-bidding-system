import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type ProductBidHistoryType = {
  product_id: number;
  product_name: string;
  amount_bid: number;
  createdOn: string;
  bidding_id: number;
  image_path: string;
  account_id: number;
  username: string;
  first_name: string;
  last_name: string;
};

const ViewAdminBidH = () => {
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
    <div className="h-screen bg-gray-50">
      <h1 className="my-4 text-[1.5rem] font-semibold">
        BIDDING HISTORY{' '}
        <span className="text-gray-500">{'>'} List of Bidding History</span>
      </h1>
      <h1 className="my-2 text-center text-[2rem] font-semibold uppercase">
        {productName.length > 0 ? productName : 'No Product'}
      </h1>
      <div className="flex w-full items-center justify-center">
        <div className="w-[50%] rounded-md border-2 bg-white">
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
                    <TableCell className="font-bold">
                      {bid.username
                        ? bid.first_name + ' ' + bid.last_name
                        : 'No Bidder'}
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

export default ViewAdminBidH;
