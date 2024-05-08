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
import { GrFormView } from 'react-icons/gr';
import { IoMdClose } from 'react-icons/io';
import { MdReviews } from 'react-icons/md';
import { TbVip } from 'react-icons/tb';
import Filter from '../components/Filter';

type Reviews = {
  description: string;
  feedback_rating: number;
  first_name: string;
  last_name: string;
  image_path: string;
  product_name: string;
};

const Bidders = () => {
  const [bidders, setBidders] = useState<BiddersType[]>([]);
  const [showBiddingProfile, setShowBiddingProfile] = useState<number>(0);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchProduct, setSearchProduct] = useState('');
  const [showBiddingProfileDecider, setShowBiddingProfileDecider] =
    useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState<Reviews[]>([]);

  const [selectedValue, setSelectedValue] = useState<string>('All');

  const handleValueChange = (e: string) => {
    setSelectedValue(e);
    console.log(e);
  };

  const fetchBidders = async () => {
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
          console.log(res.data);
          fetchBidders();

          // setShowBiddingProfileDecider(false);
        }
      });
  };

  useEffect(() => {
    fetchBidders();
  }, []);

  const handleShowReviews = (account_id: number) => {
    setShowReviews(true);

    axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/reviews.php`, {
        params: {
          account_id: account_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setReviews(res.data);
      });
  };

  return (
    <div className="mt-[1rem] h-screen w-full rounded-lg bg-gray-50 p-2">
      <div className="mx-[2rem] h-full bg-gray-50 ">
        <h1 className="my-4 text-[1.5rem] font-semibold">
          BIDDERS <span className="text-gray-500">{'>'} List of Bidders</span>
        </h1>

        <div className="my-2 flex w-full items-center justify-between">
          <Input
            onChange={(e) => setSearchProduct(e.target.value)}
            className=" h-[3rem] w-[25rem] bg-white"
            placeholder="search bidders.."
          />

          <Filter
            handleValueChange={handleValueChange}
            title="Filter status"
            value={['All', 'In Progress', 'Verified', 'Rejected']}
          />
        </div>

        <Table className="rounded-md bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold text-blue-500">
                Fullname
              </TableHead>
              <TableHead className="font-bold text-blue-500">
                Username
              </TableHead>
              <TableHead className="w-[20rem] font-bold text-blue-500">
                Status
              </TableHead>
              <TableHead className="w-[20rem] font-bold text-blue-500">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bidders
              .filter((bid) => {
                const firstNameMatchesSearch = bid.first_name
                  .toLowerCase()
                  .includes(searchProduct.toLowerCase());

                return (
                  firstNameMatchesSearch &&
                  (selectedValue === 'All' ||
                    (selectedValue.includes('Progress') &&
                      bid.is_verified === 0) ||
                    (selectedValue.includes('Verified') &&
                      bid.is_verified === 1) ||
                    (selectedValue.includes('Rejected') &&
                      bid.is_verified === 2))
                );
              })
              .map((bid, index) => {
                return (
                  <TableRow className="border-b-2 text-start" key={index}>
                    <TableCell className="item-center flex gap-2">
                      <span className="block">
                        {' '}
                        {bid.first_name} {bid.last_name}
                      </span>
                      {bid.vip_id !== null && (
                        <TbVip
                          className="
                   text-3xl text-yellow-500"
                        />
                      )}
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

                    <TableCell className="flex gap-2">
                      <Button
                        className="flex items-center gap-2"
                        onClick={() => handleShowBiddingProfile(bid.account_id)}
                      >
                        <GrFormView className="text-3xl" /> Details
                      </Button>

                      <Button
                        className="flex items-center gap-2"
                        onClick={() => handleShowReviews(bid.account_id)}
                      >
                        <MdReviews className="text-2xl" /> User Reviews
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        {showReviews && (
          <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
            <div className="relative flex min-h-fit w-[60rem] items-center justify-center gap-10 rounded-2xl bg-white p-2">
              <IoMdClose
                className="absolute right-6 top-6 flex cursor-pointer gap-2 text-2xl"
                onClick={() => setShowReviews(false)}
              />

              <div className="flex h-fit min-h-[25rem] w-full flex-col items-center justify-center rounded-lg">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex h-fit w-full items-center justify-between gap-4 border-b-2 p-4 "
                    >
                      <div className="inline-block">
                        <div className="flex gap-4">
                          <h1 className="font-bold">
                            {review.first_name + review.last_name}
                          </h1>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }, (_, i) => i).map(
                              (number) => {
                                const untilWhatNumber = review.feedback_rating;
                                return (
                                  <svg
                                    key={number}
                                    className="mr-1 h-4 w-4 text-yellow-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={
                                      number == untilWhatNumber
                                        ? 'gray'
                                        : 'currentColor'
                                    }
                                    viewBox="0 0 22 20"
                                  >
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                  </svg>
                                );
                              },
                            )}
                          </div>
                        </div>
                        <p>{review.description}</p>
                      </div>

                      <div>
                        <h1>{review.product_name}</h1>
                        <img
                          className="h-[10rem] w-[10rem] rounded-lg object-cover"
                          src={review.image_path}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-[2rem] font-semibold">
                    EMPTY REVIEWS 😭
                  </h1>
                )}
              </div>
            </div>
          </div>
        )}

        {showBiddingProfileDecider && (
          <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
            <div className="pt-[4 rem] relative flex h-fit w-[60rem] items-center justify-around gap-10 rounded-md border-2  bg-white  p-16">
              <IoMdClose
                className="absolute right-6 top-6 flex cursor-pointer gap-2 text-2xl"
                onClick={() => setShowBiddingProfileDecider(false)}
              />
              <div className=" flex justify-around">
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
              <div className="w-[70%]">
                <div className="flex gap-4">
                  <div className="flex w-[100%] flex-col ">
                    <Label className="my-4 block">First Name</Label>
                    <span className="rounded-md border-2 p-1">
                      {
                        bidders.find(
                          (bid) => bid.account_id === showBiddingProfile,
                        )?.first_name
                      }
                    </span>
                  </div>

                  <div className="flex w-[100%] flex-col">
                    <Label className="my-4 block">Last Name</Label>
                    <span className="rounded-md border-2 p-1">
                      {
                        bidders.find(
                          (bid) => bid.account_id === showBiddingProfile,
                        )?.last_name
                      }
                    </span>
                  </div>

                  <div className="flex w-[100%] flex-col">
                    <Label className="my-4 block">Middle Name</Label>

                    <span className="rounded-md border-2 p-1">
                      {
                        bidders.find(
                          (bid) => bid.account_id === showBiddingProfile,
                        )?.middle_name
                      }
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex w-[100%] flex-col">
                    <Label className="my-4 block">Phone Number</Label>
                    <span className="rounded-md border-2 p-1">
                      {
                        bidders.find(
                          (bid) => bid.account_id === showBiddingProfile,
                        )?.phone_number
                      }
                    </span>
                  </div>

                  <div className="flex w-[100%] flex-col">
                    <Label className="my-4 block">Email</Label>
                    <span className="rounded-md border-2 p-1">
                      {
                        bidders.find(
                          (bid) => bid.account_id === showBiddingProfile,
                        )?.email_address
                      }
                    </span>
                  </div>
                </div>

                <Label className="my-4 block">Username</Label>
                <span className="rounded-md border-2 p-1">
                  {
                    bidders.find((bid) => bid.account_id === showBiddingProfile)
                      ?.username
                  }
                </span>

                <Label className="my-4 block">Address</Label>
                <span className="rounded-md border-2 p-1">
                  {
                    bidders.find((bid) => bid.account_id === showBiddingProfile)
                      ?.address
                  }
                </span>

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

                <div className="absolute bottom-8 right-8 flex gap-4">
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
    </div>
  );
};

export default Bidders;
