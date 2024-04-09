import DefaultImage from '@/assets/images/default-image.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BiddersType } from '@/entities/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Bidders = () => {
  const [bidders, setBidders] = useState<BiddersType[]>([]);
  const [showBiddingProfile, setShowBiddingProfile] = useState<number>(0);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchProduct, setSearchProduct] = useState('');
  const [showBiddingProfileDecider, setShowBiddingProfileDecider] =
    useState(false);

  const fetchProduct = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/bidders.php`)
      .then((res) => {
        console.log(res.data);
        setBidders(res.data);
      });
  };

  const handleShowBiddingProfile = (id: number) => {
    setShowBiddingProfile(id);
    setShowBiddingProfileDecider(true);
  };

  const handleVerification = (status: number, account_id: number) => {
    axios
      .put(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/bidders.php`, {
        updateStatus: true,
        account_id: account_id,
        is_verified: status,
      })
      .then((res) => {
        if (res.data) {
          fetchProduct();
          console.log(res.data);
          // setShowBiddingProfileDecider(false);
        }
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="relative mt-[1rem] w-full rounded-lg bg-white p-2">
      <h1 className="my-4 text-2xl font-bold">Bidders</h1>

      <div className="my-2 flex w-full items-center justify-between">
        <Input
          onChange={(e) => setSearchProduct(e.target.value)}
          className="w-[20rem]"
          placeholder="search bidders.."
        />

        <Button
          onClick={() => setShowAddProduct(!showAddProduct)}
          className="self-end bg-[#5d383a]"
        >
          {showAddProduct ? 'Close' : 'Add Product'}
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-black">Fullname</TableHead>
            <TableHead className="font-bold text-black">Username</TableHead>
            <TableHead className="w-[20rem] font-bold text-black">
              Status
            </TableHead>
            <TableHead className="w-[5rem] font-bold text-black">
              Details
            </TableHead>
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
                    {bid.is_verified === 0 && (
                      <span className="rounded-md bg-violet-500 p-2 text-white">
                        Verification in Progress
                      </span>
                    )}
                    {bid.is_verified === 1 && (
                      <span className="rounded-md bg-green-500 p-2 text-white">
                        Verified
                      </span>
                    )}
                    {bid.is_verified === 2 && (
                      <span className="rounded-md bg-red-500 p-2 text-white">
                        Rejected
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => handleShowBiddingProfile(bid.account_id)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {showBiddingProfileDecider && (
        <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center bg-white bg-opacity-80">
          <div className="relative mt-[5rem] flex h-full w-fit items-center justify-center gap-10 rounded-md border-2 bg-white p-2">
            <Button
              className="absolute right-2 top-2"
              onClick={() => setShowBiddingProfileDecider(false)}
            >
              Close
            </Button>
            <div className="flex justify-around">
              <img
                className="mb-4  h-[20rem] w-[20rem] rounded-lg object-cover"
                src={
                  bidders.find((bid) => bid.account_id === showBiddingProfile)
                    ?.id_image!
                    ? bidders.find(
                        (bid) => bid.account_id === showBiddingProfile,
                      )?.id_image!
                    : DefaultImage
                }
              />
            </div>
            <div>
              <div className="flex gap-4">
                <div className="flex w-[100%] flex-col ">
                  <Label className="my-4 block">First Name</Label>
                  <Input
                    value={
                      bidders.find(
                        (bid) => bid.account_id === showBiddingProfile,
                      )?.first_name
                    }
                    className="mb-2"
                    placeholder="First Name"
                    name="first_name"
                    disabled
                  />
                </div>

                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Last Name</Label>
                  <Input
                    value={
                      bidders.find(
                        (bid) => bid.account_id === showBiddingProfile,
                      )?.last_name
                    }
                    className="mb-2"
                    placeholder="Last Name"
                    name="last_name"
                    disabled
                  />
                </div>

                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Middle Name</Label>
                  <Input
                    value={
                      bidders.find(
                        (bid) => bid.account_id === showBiddingProfile,
                      )?.middle_name
                    }
                    className="mb-2"
                    placeholder="Middle Name"
                    name="middle_name"
                    disabled
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Phone Number</Label>
                  <Input
                    value={
                      bidders.find(
                        (bid) => bid.account_id === showBiddingProfile,
                      )?.phone_number
                    }
                    className="mb-2"
                    placeholder="Phone Number"
                    name="phone_number"
                    disabled
                  />
                </div>

                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Email</Label>

                  <Input
                    value={
                      bidders.find(
                        (bid) => bid.account_id === showBiddingProfile,
                      )?.email_address
                    }
                    className="mb-2"
                    placeholder="Email"
                    name="email_address"
                    disabled
                  />
                </div>
              </div>

              <Label className="my-4 block">Username</Label>
              <Input
                value={
                  bidders.find((bid) => bid.account_id === showBiddingProfile)
                    ?.username
                }
                className="mb-2"
                placeholder="Username"
                name="username"
                disabled
              />

              <Label className="my-4 block">Address</Label>
              <Input
                value={
                  bidders.find((bid) => bid.account_id === showBiddingProfile)
                    ?.address
                }
                className="mb-2"
                placeholder="Address"
                name="address"
                disabled
              />

              <Label className="my-4 block">Status</Label>
              <span>
                {bidders.find((bid) => bid.account_id === showBiddingProfile)
                  ?.is_verified === 0 && (
                  <span className="rounded-md bg-violet-500 p-2 text-white">
                    Verification in Progress
                  </span>
                )}
                {bidders.find((bid) => bid.account_id === showBiddingProfile)
                  ?.is_verified === 1 && (
                  <span className="rounded-md bg-green-500 p-2 text-white">
                    Verified
                  </span>
                )}
                {bidders.find((bid) => bid.account_id === showBiddingProfile)
                  ?.is_verified === 2 && (
                  <span className="rounded-md bg-red-500 p-2 text-white">
                    Rejected
                  </span>
                )}
              </span>

              <div className="absolute bottom-2 right-2 flex gap-4">
                <Button
                  onClick={() => handleVerification(1, showBiddingProfile)}
                  className="bg-green-500"
                >
                  Verify
                </Button>
                <Button
                  onClick={() => handleVerification(2, showBiddingProfile)}
                  className="bg-red-500"
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bidders;
