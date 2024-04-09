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
import VIP from '@/assets/crown.png';

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
        to: '+639658971546',
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="relative mt-[1rem] w-full rounded-lg bg-white p-2">
      <h1 className="my-4 text-2xl font-bold">Biddings</h1>

      <div className="my-2 flex w-full items-center justify-between">
        <Input
          onChange={(e) => setSearchProduct(e.target.value)}
          className="w-[20rem]"
          placeholder="search product.."
        />
      </div>

      <Table>
        <TableCaption>A list of product added.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-black">Image</TableHead>
            <TableHead className="font-bold text-black">
              Product Details
            </TableHead>
            <TableHead className="font-bold text-black">
              Bidding Details
            </TableHead>
            <TableHead className="w-[5rem] font-bold text-black">
              Status
            </TableHead>
            <TableHead className=" w-[5rem]  font-bold text-black">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {biddings
            .filter((bid) => bid.product_name.includes(searchProduct))
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
                      <span>Product Name: {bid.product_name}</span>
                      <span>Brand Name: {bid.brand_name}</span>
                      <span>Year Model: {bid.year_model}</span>
                      <span>Condition: {bid.product_condition}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col">
                      <span>Regular Price : ₱ {bid.regular_price}</span>
                      <span>Starting Price : ₱ {bid.starting_price}</span>
                      <span> Total Bid : {bid.cnt}</span>
                      <span>Highest Bid : ₱ {bid.amt}</span>
                      <span> Highest Bidder : {bid.fname}</span>
                      <span>Until : {bid.date_until}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    {bid.date_until > new Date().toISOString() ? (
                      <span className="rounded-md bg-green-500 p-2 text-white">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-md bg-red-500 p-2 text-white">
                        Closed
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    {bid.date_until > new Date().toISOString() ? (
                      <Button
                        onClick={() => handleShowLeaderBoards(bid.product_id)}
                      >
                        Leaderboads
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          handleShowBiddingProfile(
                            bid.account_id,
                            bid.product_name,
                          )
                        }
                      >
                        Winner Details
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {showBiddingProfileWinnerDecider && (
        <div className="absolute right-0 top-0 flex h-full w-full justify-center bg-white bg-opacity-80">
          <div className="relative mt-[5rem] flex h-[30rem] w-[60rem] items-center justify-center gap-10 rounded-md border-2 bg-white p-2">
            <Button
              className="absolute right-2 top-2"
              onClick={() => setShowBiddingProfileWinnerDecider(false)}
            >
              Close
            </Button>
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
            <div className="w-[80%]">
              <div className="flex gap-4">
                <div className="flex w-[100%] flex-col ">
                  <Label className="my-4 block">First Name</Label>
                  <span className="block rounded-md border-2 p-1">
                    {biddingWinner.first_name}
                  </span>
                </div>

                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Last Name</Label>
                  <span className="block rounded-md border-2 p-1">
                    {biddingWinner.last_name}
                  </span>
                </div>

                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Middle Name</Label>
                  <span className="block rounded-md border-2 p-1">
                    {biddingWinner.middle_name}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Phone Number</Label>
                  <span className="block rounded-md border-2 p-1">
                    {biddingWinner.phone_number}
                  </span>
                </div>

                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Email</Label>

                  <span className="block rounded-md border-2 p-1">
                    {biddingWinner.email_address}
                  </span>
                </div>
              </div>

              <Label className="my-4 block">Username</Label>
              <span className="block rounded-md border-2 p-1">
                {biddingWinner.username}
              </span>

              <Label className="my-4 block">Address</Label>
              <span className="block rounded-md border-2 p-1">
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
        <div className="absolute right-0 top-0 flex h-full w-full justify-center bg-white bg-opacity-80">
          <div className="relative mt-[5rem] flex h-[30rem] w-[60rem] gap-10 rounded-md border-2 bg-white p-2">
            <Button
              className="absolute right-2 top-2 z-10 cursor-pointer"
              onClick={() => setShowLeaderBoards(false)}
            >
              Close
            </Button>

            <Table className="mt-[2rem] border-2">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold text-black">Image</TableHead>

                  <TableHead className="font-bold text-black">
                    Product Name
                  </TableHead>
                  <TableHead className="font-bold text-black">Amount</TableHead>
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
                        <img src={lead.image_path} alt={lead.product_name} />
                      </TableCell>

                      <TableCell>{lead.product_name}</TableCell>

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
  );
};

export default Biddings;
