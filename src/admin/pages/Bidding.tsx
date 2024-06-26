import VIP from '@/assets/crown.png';
import DefaultImage from '@/assets/defaultImage.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BiddersType, BiddingsType, LeaderBoardType } from '@/entities/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { GrFormView } from 'react-icons/gr';
import { HiLockClosed } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { VscGraph } from 'react-icons/vsc';
import Filter from '../components/Filter';

const Biddings = () => {
  const [biddings, setBiddings] = useState<BiddingsType[]>([]);
  const [biddingWinner, setBiddingWinner] = useState<BiddersType>({
    account_id: 0,
    first_name: '',
    last_name: '',
    middle_name: '',
    phone_number: '',
    email_address: '',
    username: '',
    address: '',
    is_verified: 0,
    image_path: '',
    vip_id: 0,
  });
  const [leaderBoards, setLeaderBoards] = useState<LeaderBoardType[]>([]);
  const [showLeaderBoards, setShowLeaderBoards] = useState<boolean>(false);
  const [productName, setProductName] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [showBiddingProfileWinnerDecider, setShowBiddingProfileWinnerDecider] =
    useState(false);

  const [selectedValue, setSelectedValue] = useState<string>('All');

  const handleValueChange = (e: string) => {
    setSelectedValue(e);
    console.log(e);
  };

  const fetchProduct = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/bidding.php`)
      .then((res) => {
        console.log(res.data);
        setBiddings(res.data);
      });
  };

  const handleShowBiddingProfile = (id: number, productName: string) => {
    console.log(id);
    setProductName(productName);
    axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/viewwinner.php`, {
        params: {
          account_id: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBiddingWinner({
          account_id: res.data[0].account_id,
          first_name: res.data[0].first_name,
          last_name: res.data[0].last_name,
          middle_name: res.data[0].middle_name,
          phone_number: res.data[0].phone_number,
          email_address: res.data[0].email_address,
          username: res.data[0].username,
          address: res.data[0].address,
          is_verified: res.data[0].is_verified,
          image_path: res.data[0].image_path,
          vip_id: 0,
        });
      });

    setShowBiddingProfileWinnerDecider(true);
  };

  const handleShowLeaderBoards = (id: number) => {
    axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/leaderboards.php`, {
        params: {
          product_id: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLeaderBoards(res.data);
      });

    setShowLeaderBoards(true);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const sendSMStoWinners = async (
    winnerPhone: string,
    winnerName: string,
    productName: string,
  ) => {
    console.log(winnerPhone, winnerName, productName);

    const apiKey =
      'SigIVuuIwp98jJW4wVbDD9fmrVS544zMKBk0EXlVGdNrFWxTqGcB6E7RG2DPX-y7';
    fetch('https://api.httpsms.com/v1/messages/send', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `Hello, ${winnerName}! You have won the bidding for ${productName}. To proceed, please visit our payment portal in My Bids section. Thank you!`,
        from: '+639097134971',
        to: winnerPhone,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className=" mx-[2rem] mt-[1rem] h-screen w-full rounded-lg bg-gray-50 p-2">
      <div className=" h-full w-[95%] bg-gray-50">
        <h1 className="my-4 text-[1.5rem] font-semibold">
          BIDDINGS <span className="text-gray-500">{'>'} List of Biddings</span>
        </h1>

        <div className="my-2 flex w-full items-center justify-between">
          <Input
            onChange={(e) => setSearchProduct(e.target.value)}
            className="h-[3rem] w-[25rem]"
            placeholder="search product.."
          />

          <Filter
            handleValueChange={handleValueChange}
            title="Filter status"
            value={['All', 'Closed', 'Active']}
          />
        </div>

        <Table
          className="w-full rounded-sm border-2 bg-white
        "
        >
          <TableCaption>A list of product added.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-blue-500">Image</TableHead>
              <TableHead className="font-bold text-blue-500">
                Product Details
              </TableHead>
              <TableHead className="font-bold text-blue-500">
                Bidding Details
              </TableHead>
              <TableHead className="w-[8rem] font-bold text-blue-500">
                Status
              </TableHead>
              <TableHead className=" w-[5rem] font-bold  text-blue-500">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {biddings
              .filter((bid) => {
                const productNameMatchesSearch = bid.product_name
                  .toLowerCase()
                  .includes(searchProduct.toLowerCase());

                const isOpenBid = bid.date_until > new Date().toISOString();
                const isClosedBid = !isOpenBid;
                const isSelectedValueAll = selectedValue === 'All';
                const isSelectedValueClosed = selectedValue === 'Closed';

                return (
                  ((productNameMatchesSearch || isSelectedValueAll) &&
                    (isSelectedValueClosed ? isClosedBid : isOpenBid)) ||
                  (isSelectedValueAll && productNameMatchesSearch)
                );
              })
              .map((bid, index) => {
                return (
                  <TableRow className="border-b-2 text-start" key={index}>
                    <TableCell className="flex items-center gap-4">
                      <img
                        className="h-[6rem] w-[8rem] rounded-md object-cover"
                        src={bid.image_path}
                        alt={bid.product_name}
                      />
                      {bid.is_vip === 1 && (
                        <img
                          className="h-[5rem] w-[5rem] rounded-md object-cover"
                          src={VIP}
                          alt="vip"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold">
                          Product Name: {bid.product_name}
                        </span>
                        <span>Brand Name: {bid.brand_name}</span>
                        <span>Year Model: {bid.year_model}</span>
                        <span>Condition: {bid.product_condition}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        <span>
                          Regular Price : ₱{' '}
                          <span className="inline-block font-bold">
                            {bid.regular_price}
                          </span>
                        </span>
                        <span>
                          Starting Price : ₱{' '}
                          <span className="inline-block font-bold">
                            {bid.starting_price}
                          </span>{' '}
                        </span>
                        <span>
                          {' '}
                          Total Bid :{' '}
                          <span className="inline-block font-bold">
                            {bid.cnt}
                          </span>{' '}
                        </span>
                        <span>
                          Highest Bid : ₱{' '}
                          <span className="inline-block font-bold">
                            {bid.amt}
                          </span>{' '}
                        </span>
                        <span>
                          {' '}
                          Highest Bidder :{' '}
                          <span className="inline-block font-bold">
                            {bid.fname}
                          </span>{' '}
                        </span>
                        <span>
                          Until :{' '}
                          <span className="inline-block font-bold">
                            {bid.date_until}
                          </span>{' '}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="w-[5rem]">
                      {bid.date_until > new Date().toISOString() ? (
                        <span className=" flex h-[2.5rem] w-full items-center  justify-center gap-2 rounded-md border-b-4 border-green-500  p-2 text-center">
                          <FaCheckCircle className="text-3xl text-green-500" />{' '}
                          Active
                        </span>
                      ) : (
                        <span className=" flex h-[2.5rem] w-full items-center justify-center gap-2 rounded-md border-b-4 border-red-500 p-2 text-center">
                          <HiLockClosed className="text-3xl text-red-500" />{' '}
                          Closed
                        </span>
                      )}
                    </TableCell>

                    <TableCell>
                      {bid.date_until > new Date().toISOString() ? (
                        <Button
                          className="flex h-[2.5rem] w-full items-center gap-2 rounded-md p-2 text-center text-white"
                          onClick={() => handleShowLeaderBoards(bid.product_id)}
                        >
                          <VscGraph className="text-3xl" /> Leaderboads
                        </Button>
                      ) : (
                        <Button
                          className="flex h-[2.5rem] w-full items-center gap-2 rounded-md p-2 text-center text-white "
                          onClick={() =>
                            handleShowBiddingProfile(
                              bid.account_id,
                              bid.product_name,
                            )
                          }
                        >
                          <GrFormView className="text-4xl" /> Winner Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        {showBiddingProfileWinnerDecider && (
          <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
            <div className="relative mt-[5rem] flex h-[30rem] w-[60rem] items-center justify-center gap-10 rounded-md border-2 bg-white p-2 pt-[2rem]">
              <IoMdClose
                className="absolute right-6 top-6 z-50 flex cursor-pointer gap-2 text-2xl"
                onClick={() => setShowBiddingProfileWinnerDecider(false)}
              />

              <h1 className="absolute left-6 top-6 text-start text-2xl font-semibold uppercase">
                winner details
              </h1>

              <div className="flex justify-around">
                <img
                  className="mb-4  h-[20rem] w-[20rem] rounded-lg object-cover"
                  src={
                    biddingWinner.image_path!
                      ? biddingWinner.image_path!
                      : DefaultImage
                  }
                />
              </div>
              <div className="w-[60%]">
                <div className="flex gap-4">
                  <div className="flex w-[100%] flex-col ">
                    <Label className="my-4 block">First Name</Label>
                    <span className="block min-h-[2.5rem] rounded-md border-2 p-1">
                      {biddingWinner.first_name}
                    </span>
                  </div>

                  <div className="flex w-[100%] flex-col">
                    <Label className="my-4 block">Last Name</Label>
                    <span className="block min-h-[2.5rem] rounded-md border-2 p-1">
                      {biddingWinner.last_name}
                    </span>
                  </div>

                  <div className="flex w-[100%] flex-col">
                    <Label className="my-4 block">Middle Name</Label>
                    <span className="block min-h-[2.5rem] rounded-md border-2 p-1">
                      {biddingWinner.middle_name}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex w-[100%] flex-col">
                    <Label className="my-4 block">Phone Number</Label>
                    <span className="block min-h-[2.5rem] rounded-md border-2 p-1">
                      {biddingWinner.phone_number}
                    </span>
                  </div>

                  <div className="flex w-[100%] flex-col">
                    <Label className="my-4 block">Email</Label>

                    <span className="block min-h-[2.5rem] rounded-md border-2 p-1">
                      {biddingWinner.email_address}
                    </span>
                  </div>
                </div>

                <Label className="my-4 block">Username</Label>
                <span className="block min-h-[2.5rem] rounded-md border-2 p-1">
                  {biddingWinner.username}
                </span>

                <Label className="my-4 block">Address</Label>
                <span className="block min-h-[2.5rem] rounded-md border-2 p-1">
                  {biddingWinner.address}
                </span>

                <Button
                  className="my-4 bg-green-500 text-white"
                  onClick={() =>
                    sendSMStoWinners(
                      biddingWinner.phone_number,
                      `${biddingWinner.first_name} ${biddingWinner.last_name}`,
                      productName,
                    )
                  }
                >
                  Send SMS to Winner
                </Button>
              </div>
            </div>
          </div>
        )}

        {showLeaderBoards && (
          <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
            <div className="relative mt-[5rem] flex h-[30rem] w-[60rem] gap-10 rounded-md border-2 bg-white p-2 ">
              <IoMdClose
                className="absolute right-6 top-6 z-50 flex cursor-pointer gap-2 text-2xl"
                onClick={() => setShowLeaderBoards(false)}
              />
              <h1 className="absolute left-6 top-6 text-start text-2xl font-semibold uppercase">
                leaderbords
              </h1>
              <Table className="mt-[5rem] border-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold text-black">
                      Image
                    </TableHead>

                    <TableHead className="font-bold text-black">
                      Product Name
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Amount
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Date Created
                    </TableHead>
                    <TableHead className="font-bold text-black">
                      Full Name
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderBoards.map((lead, index) => {
                    return (
                      <TableRow className="border-b-2 text-start" key={index}>
                        <TableCell>
                          <img
                            className="h-[8em] w-[8em] rounded-md object-cover"
                            src={lead.image_path}
                            alt={lead.product_name}
                          />
                        </TableCell>

                        <TableCell className="font-bold">
                          {lead.product_name}
                        </TableCell>

                        <TableCell>₱ {lead.amt}</TableCell>
                        <TableCell>{lead.date_created}</TableCell>
                        <TableCell>{lead.fname}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Biddings;
