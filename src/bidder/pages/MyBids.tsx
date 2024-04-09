import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
import { Button } from '@/components/ui/button';
import Gcash from '@/assets/gcash.png';
import PayMaya from '@/assets/paymaya.png';
import { Label } from '@/components/ui/label';

type BidsHistoryType = {
  max_bid_for_product: number;
  date_until: string;
  max_bid_overall: number;
  product_name: string;
  status: number;
  product_id: number;
  payment_status: number;
};

const MyBids = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const [bidsHistory, setBidsHistory] = useState<BidsHistoryType[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [productID, setProductID] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);

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

  const handleShowPayment = (product_id: number, totalAmount: number) => {
    setShowPayment(true);
    setProductID(product_id);
    setAmount(parseInt(totalAmount.toString()));
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FileReader();
    data.readAsDataURL(e.target.files![0]);

    data.onloadend = () => {
      const base64 = data.result;
      if (base64) {
        setImage(base64.toString());

        // console.log(base64.toString());
      }
    };
  };

  const handleSubmitProof = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/payment.php`, {
        product_id: productID,
        proof_image: image,
        account_id: localStorage.getItem('lto_bidding_token'),
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 'success') {
          // alert('Payment submitted successfully');
        }

        setShowPayment(false);
      });
  };

  return (
    <div className="relative h-full">
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
            <TableHead className="font-bold text-black">Payment</TableHead>
            <TableHead className="font-bold text-black">
              Payment Status
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

                  <TableCell>
                    {bid.status === 1 && (
                      <Button
                        onClick={() =>
                          handleShowPayment(
                            bid.product_id,
                            bid.max_bid_for_product,
                          )
                        }
                        className="rounded-md bg-green-500 p-1 text-white"
                        disabled={bid.payment_status === 1}
                      >
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {bid.payment_status === 0 && (
                      <span className="text-yellow-500">Not paid</span>
                    )}
                    {bid.payment_status === 1 && (
                      <span className="text-green-500">Payment approved</span>
                    )}
                    {bid.payment_status === 2 && (
                      <span className="text-red-500">Payment rejected</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {showPayment && (
        <div className="absolute top-0 flex h-full w-[100%] items-center justify-center overflow-x-hidden bg-white bg-opacity-85">
          <div className="h-[42rem] w-[40rem] rounded-md border-2 bg-white p-2">
            <h1 className="my-4 font-bold">PAY NOW!</h1>
            <Tabs defaultValue="gcash" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger className="w-[50%]" value="gcash">
                  Gcash
                </TabsTrigger>
                <TabsTrigger className="w-[50%]" value="paymaya">
                  Paymaya
                </TabsTrigger>
              </TabsList>
              <TabsContent value="gcash">
                <img
                  className="mb-2 h-[25rem] w-full object-contain"
                  src={Gcash}
                  alt="gcash"
                />

                <form onSubmit={handleSubmitProof}>
                  <Label className="text-md my-2 block text-start">
                    Upload proof of payment
                  </Label>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleChangeImage}
                    className="cursor-pointer"
                    required
                  />

                  <div className="mt-2 flex justify-end gap-4">
                    <Button onClick={() => setShowPayment(false)}>
                      Cancel
                    </Button>

                    <Button className="bg-green-500" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="paymaya">
                <img
                  className="mb-2 h-[25rem] w-full object-contain"
                  src={PayMaya}
                  alt="paymaya"
                />

                <form onSubmit={handleSubmitProof}>
                  <Label className="text-md my-2 block text-start">
                    Upload proof of payment
                  </Label>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleChangeImage}
                    className="cursor-pointer"
                    required
                  />

                  <div className="mt-2 flex justify-end gap-4">
                    <Button onClick={() => setShowPayment(false)}>
                      Cancel
                    </Button>

                    <Button className="bg-green-500" type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBids;
