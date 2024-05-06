import DefaultImage from '@/assets/defaultImage.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductType } from '@/entities/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import VIP from '@/assets/crown.png';
import { IoQrCodeOutline } from 'react-icons/io5';
import { TbVip } from 'react-icons/tb';
import { AiOutlineCloseCircle } from 'react-icons/ai';
const Dashboard = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductType>(
    {} as ProductType,
  );

  const [showQRDecider, setShowQRDecider] = useState(false);
  const [qrCodeID, setQRCodeID] = useState(0);
  const [slotAvailable, setSlotAvailable] = useState('');
  const [slotLimitDisabled, setSlotLimitDisabled] = useState(false);
  const [currentCount, setCurrentCount] = useState(0);

  const account_id = localStorage.getItem('lto_bidding_token');

  const [showPlaceBid, setShowPlaceBid] = useState(false);
  const [prodAccID, setProdAccID] = useState({
    product_id: 0,
    account_id: account_id,
  });
  const [bidAmount, setBidAmount] = useState(0);
  const [limitMessage, setLimitMessage] = useState('' as string);

  const isVip = localStorage.getItem('lto_vip') === 'true';

  const filteredProducts = product.filter((prod) => {
    return isVip ? true : parseInt(prod.is_vip) !== 1;
  });

  const fetchProduct = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/clientproduct.php`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleShowProductDetails = (product_id: number) => {
    axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product.php`, {
        params: {
          product_id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProductDetails(res.data[0]);
        setShowProductDetails(true);
      });
  };

  const handleShowPlaceBid = (
    product_id: number,
    account_id: string | null,
    available_slot: string,
  ) => {
    setShowPlaceBid(true);

    console.log(available_slot, 'slot');
    setProdAccID({
      product_id,
      account_id: account_id!,
    });
    setSlotAvailable(available_slot);

    axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/count-bid.php`, {
        params: {
          product_id,
        },
      })
      .then((res) => {
        if (isNaN(parseInt(available_slot))) return;

        const currentCounts = parseInt(available_slot) - res.data[0].count;
        console.log(currentCount, 'current count');

        setCurrentCount(currentCounts);

        if (res.data[0].count >= parseInt(available_slot)) {
          setSlotLimitDisabled(true);
          setLimitMessage('Slot limit reached');
        }
      });

    fetchProduct();
  };

  const handlePlaceBid = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .post(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/postbid.php`, {
        ...prodAccID,
        amount_bid: bidAmount,
      })
      .then((res) => {
        console.log(res.data);
        setShowPlaceBid(false);
        fetchProduct();
      });
  };

  const handleShowQR = (product_id: number) => {
    setQRCodeID(product_id);
    setShowQRDecider(true);
  };

  return (
    <div className="mx-[2rem]">
      <h1 className="my-4 text-[1.5rem] font-semibold">
        List of Motorcycle's{' '}
        <span className="text-gray-500">{'>'} Motorcycles</span>
      </h1>

      <div className="grid grid-cols-5">
        {filteredProducts.map((item, index) => (
          <div
            key={index}
            className="flex w-[20rem] flex-col rounded-md border-2 bg-white p-2 "
          >
            <div className="my-2 flex justify-between">
              {parseInt(item.is_vip) === 1 ? (
                <TbVip
                  className="
               text-3xl text-yellow-500"
                />
              ) : (
                <div></div>
              )}

              <IoQrCodeOutline
                className="cursor-pointer text-4xl text-blue-500"
                onClick={() => handleShowQR(item.product_id)}
              />
            </div>
            <img
              className="h-[15rem] w-full object-cover"
              src={item.image_path}
              alt="product"
            />

            <div className="mt-2">
              <h1 className="mb-2 font-semibold text-gray-700">
                Product Name: {item.product_name}
              </h1>

              <h1 className="mb-2 font-semibold text-gray-700">
                Starting Amount: ₱ {item.starting_price}
              </h1>
              <h1 className="mb-2 font-semibold text-gray-700">
                Highesh Bid: ₱ {item.amt}
              </h1>
              <h1 className="mb-2 font-semibold text-gray-700">
                Until : {item.date_until}
              </h1>
            </div>

            <div className="mt-[2rem] flex w-full justify-around">
              {new Date().toISOString() > item.date_until ? (
                <div className="w-full">
                  <Button className="w-full rounded-sm bg-red-500 p-2 text-white">
                    Closed
                  </Button>
                </div>
              ) : (
                <div className="flex w-full gap-2">
                  <Button
                    onClick={() => handleShowProductDetails(item.product_id)}
                    className="w-full rounded-sm bg-blue-500 p-2 text-white"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() =>
                      handleShowPlaceBid(
                        item.product_id,
                        account_id,
                        item.available_slot,
                      )
                    }
                    className="w-full  rounded-sm bg-green-500 p-2 text-white"
                  >
                    Bid Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showQRDecider && (
        <div className="absolute bottom-0 top-0 flex h-screen w-dvw items-center justify-center  bg-white bg-opacity-85">
          <div className="flex h-[80%] w-[80%] flex-col items-center justify-center">
            <Button
              className="mb-4 flex w-[8rem] items-center gap-2 bg-red-500"
              onClick={() => setShowQRDecider(false)}
            >
              <AiOutlineCloseCircle className="text-2xl" /> Close
            </Button>
            <QRCode
              size={156}
              style={{ height: 'auto', maxWidth: '20%', width: '20%' }}
              value={`http://localhost:5173/view/${qrCodeID}`}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      )}

      {showPlaceBid && (
        <div className="absolute right-0 top-0 flex h-full w-full justify-center bg-white bg-opacity-80">
          <div className="relative mt-[5rem] flex h-[15rem] w-[30rem] flex-col items-start justify-center gap-10 rounded-sm border-2 bg-white p-4 text-start">
            <div className="mb-[-1rem] flex w-full justify-between text-[2rem] ">
              <h1 className="text-xl font-semibold">Enter your bidding</h1>

              {slotLimitDisabled ? (
                <span className="block text-xl font-semibold text-red-500">
                  {limitMessage}
                </span>
              ) : isNaN(parseInt(slotAvailable)) ? (
                <span className="block text-xl font-semibold">No limit</span>
              ) : (
                <span className="block text-xl font-semibold">
                  Available slots: {currentCount}
                </span>
              )}
            </div>
            <div className="w-full ">
              <form onSubmit={handlePlaceBid}>
                <Label className="my-4 block">Amount</Label>
                <Input
                  onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                  required
                  type="text"
                  placeholder="Enter amount"
                  disabled={slotLimitDisabled}
                />

                <div className="mt-4 flex w-full justify-end gap-5">
                  <Button
                    className="bg-red-500"
                    onClick={() => setShowPlaceBid(false)}
                  >
                    Cancel
                  </Button>

                  <Button disabled={slotLimitDisabled} type="submit">
                    Place Bid
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showProductDetails && (
        <div className="absolute right-0 top-0 flex h-full w-full justify-center bg-white bg-opacity-80">
          <div className="relative mt-[5rem] flex h-[30rem] w-[60rem] items-center justify-center gap-10 rounded-sm border-2 bg-white p-2">
            <Button
              className="absolute right-2 top-2 bg-red-500"
              onClick={() => setShowProductDetails(false)}
            >
              <AiOutlineCloseCircle className="text-2xl" /> Close
            </Button>
            <div className="flex justify-around">
              <img
                className="mb-4  h-[20rem] w-[20rem] rounded-lg object-cover"
                src={
                  productDetails.image_path!
                    ? productDetails.image_path!
                    : DefaultImage
                }
              />
            </div>
            <div className="w-[70%]">
              <div className="flex gap-4">
                <div className="flex w-[100%] flex-col ">
                  <Label className="my-4 block">Product Name</Label>
                  <span className="block rounded-sm border-2 p-2">
                    {productDetails.product_name}
                  </span>
                </div>

                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Year Model</Label>
                  <span className="block rounded-sm border-2 p-2">
                    {productDetails.year_model}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Brand Name</Label>
                  <span className="block rounded-sm border-2 p-2">
                    {productDetails.brand_name}
                  </span>
                </div>

                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Product Condition</Label>

                  <span className="block rounded-sm border-2 p-2">
                    {productDetails.product_condition}
                  </span>
                </div>
              </div>

              <Label className="my-4 block">Description</Label>
              <span className="block rounded-sm border-2 p-2">
                {productDetails.description}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
