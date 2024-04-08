import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import AddProductModal from '../components/AddProductModal';

type BiddersType = {
  account_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  address: string;
  id_image: string;
  account_type: string;
  created_on: string;
  is_verified: number;
};

const Bidders = () => {
  const [bidders, setBidders] = useState<BiddersType[]>([]);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchProduct, setSearchProduct] = useState('');
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    axios
      .delete(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product.php`, {
        data: { product_id: id },
      })
      .then((res) => {
        if (res.data) {
          fetchProduct();
        }
      });
  };

  const fetchProduct = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/bidders.php`)
      .then((res) => {
        console.log(res.data);
        setBidders(res.data);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="mt-[1rem] w-full rounded-lg bg-white p-2">
      <h1 className="my-4 text-2xl font-bold">Bidders</h1>

      <div className="my-2 flex w-full items-center justify-between">
        <Input
          onChange={(e) => setSearchProduct(e.target.value)}
          className="w-[20rem]"
          placeholder="search product.."
        />

        <Button
          onClick={() => setShowAddProduct(!showAddProduct)}
          className="self-end bg-[#5d383a]"
        >
          {showAddProduct ? 'Close' : 'Add Product'}
        </Button>
      </div>

      <Table>
        <TableCaption>A list of product added.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-black">Fullname</TableHead>
            <TableHead className="font-bold text-black">Username</TableHead>
            <TableHead className="font-bold text-black">Status</TableHead>
            <TableHead className="font-bold text-black">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bidders
            .filter((bid) => bid.first_name.includes(searchProduct))
            .map((bid) => {
              return (
                <TableRow
                  className="border-b-2 text-start"
                  key={bid.account_id}
                >
                  <TableCell>
                    {bid.first_name} {bid.last_name}
                  </TableCell>

                  <TableCell>{bid.username}</TableCell>

                  <TableCell>
                    {bid.is_verified === 1 ? 'Not Verified' : 'Verified'}
                  </TableCell>

                  <TableCell>
                    <Button>Details</Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Bidders;
