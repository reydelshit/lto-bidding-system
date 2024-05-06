import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineCloseCircle,
} from 'react-icons/ai';

type PaymentsType = {
  product_id: number;
  product_name: string;
  amount: number;
  account_id: number;
  proof_image: string;
  first_name: string;
  last_name: string;
  status: number;
  payment_id: number;
};

const Payments = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const [payments, setPayments] = useState<PaymentsType[]>([]);
  const [showImage, setShowImage] = useState(false);
  const [proofImage, setProofImage] = useState('');

  const fetchPayment = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/payment.php`)
      .then((res) => {
        console.log(res.data);
        setPayments(res.data);
      });
  };

  useEffect(() => {
    fetchPayment();
  }, []);

  const handleShowImage = (image: string) => {
    setProofImage(image);
    setShowImage(true);
  };

  const handleUpdatePayment = (payment_id: number, status: number) => {
    axios
      .put(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/payment.php`, {
        payment_id,
        status,
      })
      .then((res) => {
        console.log(res.data);
        fetchPayment();
      });
  };

  return (
    <div className="relative mx-[2rem] h-screen bg-gray-50">
      <div className="h-ful w-full bg-gray-50">
        <h1 className="my-4 text-[1.5rem] font-semibold">
          PAYMENTS <span className="text-gray-500">{'>'} List of Payments</span>
        </h1>

        <div className="my-2 flex w-full items-center justify-between">
          <Input
            onChange={(e) => setSearchProduct(e.target.value)}
            className="h-[3rem] w-[25rem] bg-white"
            placeholder="search product.."
          />
        </div>

        <Table className=" bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-black">
                Product Name
              </TableHead>
              <TableHead className="font-bold text-black">
                Winner Name
              </TableHead>
              <TableHead className="font-bold text-black">
                Proof Details
              </TableHead>
              <TableHead className="w-[15rem] font-bold text-black">
                Status
              </TableHead>
              <TableHead className=" w-[20rem] text-center font-bold text-black">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments
              .filter((pay) => pay.product_name.includes(searchProduct))
              .map((pay, index) => {
                return (
                  <TableRow className="border-b-2 text-start" key={index}>
                    <TableCell>{pay.product_name}</TableCell>

                    <TableCell className="font-bold">
                      {pay.first_name + ' ' + pay.last_name}
                    </TableCell>
                    <TableCell>
                      <a
                        onClick={() => handleShowImage(pay.proof_image)}
                        className="cursor-pointer text-blue-500 underline"
                      >
                        View proof
                      </a>
                    </TableCell>

                    <TableCell>
                      {pay.status === 0 && (
                        <span className="rounded-md bg-violet-500 p-2 text-white">
                          Pending
                        </span>
                      )}

                      {pay.status === 1 && (
                        <span className="rounded-md p-2 text-green-500 ">
                          Approved
                        </span>
                      )}

                      {pay.status === 2 && (
                        <span className="rounded-md p-2 text-red-500 ">
                          Rejected
                        </span>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleUpdatePayment(pay.payment_id, 1)}
                          className="flex w-[8rem] items-center gap-2 rounded-md bg-green-500 p-1 text-white"
                        >
                          <AiFillLike className="text-3xl" /> Approve
                        </Button>
                        <Button
                          onClick={() => handleUpdatePayment(pay.payment_id, 2)}
                          className="flex w-[8em] items-center gap-2 rounded-md bg-red-500 p-1 text-white"
                        >
                          <AiFillDislike className="text-3xl" /> Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        {showImage && (
          <div className="absolute bottom-0 top-[-10rem] flex h-screen w-dvw items-center justify-center bg-white bg-opacity-85">
            <div className="flex h-[80%] w-[80%] flex-col items-center justify-center">
              <Button
                className="my-2 flex items-center gap-2 bg-red-500"
                onClick={() => setShowImage(false)}
              >
                {' '}
                <AiOutlineCloseCircle className=" text-2xl" /> Close
              </Button>
              <img
                className="h-[80%] w-[80%] object-contain"
                src={proofImage}
                alt="proof"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
