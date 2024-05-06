import { ProductType } from '@/entities/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GrFormView } from 'react-icons/gr';

const AdminBidH = () => {
  const [product, setProduct] = useState<any[]>([]);

  //   const fetchProduct = async () => {
  //     await axios
  //       .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product.php`)
  //       .then((res) => {
  //         console.log(res.data);
  //         setProduct(res.data);
  //       });
  //   };

  const fetchBids = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/admin-bid-h.php`, {
        params: {
          bid_admin: true,
        },
      })
      .then((res) => {
        console.log(res.data, 'YES');
        setProduct(res.data);
      });
  };

  useEffect(() => {
    // fetchProduct();
    fetchBids();
  }, []);

  return (
    <div className="mx-[2rem] h-screen bg-gray-50">
      <div className="w-full bg-gray-50">
        <h1 className="my-4 text-[1.5rem] font-semibold">
          BIDDING HISTORY{' '}
          <span className="text-gray-500">{'>'} List of Bidding History</span>
        </h1>
        <Table className="border-2 bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-black">Bidder</TableHead>
              <TableHead className="w-[20rem] font-bold text-black">
                No. of Bids
              </TableHead>
              <TableHead className="w-[10rem] font-bold text-black">
                View Bidding History
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {product.map((bid, index) => {
              return (
                <TableRow className="border-b-2 text-start" key={index}>
                  <TableCell className="text-xl font-semibold">
                    {bid.product_name}
                  </TableCell>
                  <TableCell className="font-bold text-blue-600">
                    {bid.num_bids}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="flex items-center gap-2"
                      disabled={bid.num_bids === 0 ? true : false}
                    >
                      <GrFormView className="text-4xl" />
                      <Link to={`/admin/bid-history/${bid.product_id}`}>
                        View Bidding History
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBidH;
