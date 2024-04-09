import DefaultImage from '@/assets/defaultImage.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductType } from '@/entities/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

const Dashboard = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductType>(
    {} as ProductType,
  );

  const [showQRDecider, setShowQRDecider] = useState(false);
  const [qrCodeID, setQRCodeID] = useState(0);

  const account_id = localStorage.getItem('lto_bidding_token');

  const [showPlaceBid, setShowPlaceBid] = useState(false);
  const [prodAccID, setProdAccID] = useState({
    product_id: 0,
    account_id: account_id,
  });
  const [bidAmount, setBidAmount] = useState(0);

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
  ) => {
    setShowPlaceBid(true);

    setProdAccID({
      product_id,
      account_id: account_id!,
    });
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
    <div>
      <h1>List of Motorcycle's</h1>

      <div className="grid grid-cols-5">
        {product.map((item, index) => (
          <div
            key={index}
            className="flex w-[20rem] flex-col rounded-md border-2 p-2"
          >
            <Button
              onClick={() => handleShowQR(item.product_id)}
              className="my-2 self-end"
            >
              SCAN QR
            </Button>
            <img
              className="h-[15rem] w-full object-cover"
              src={item.image_path}
              alt="product"
            />

            <div>
              <h1>Product Name: {item.product_name}</h1>

              <h1>Starting Amount: ₱ {item.starting_price}</h1>
              <h1>Highesh Bid: ₱ {item.amt}</h1>
              <h1>Until : {item.date_until}</h1>
            </div>

            <div className="mt-[2rem] flex w-full justify-around">
              {new Date().toISOString() > item.date_until ? (
                <div>
                  <Button className="rounded-md bg-red-500 p-2 text-white">
                    Closed
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleShowProductDetails(item.product_id)}
                    className="rounded-md bg-green-500 p-2 text-white"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() =>
                      handleShowPlaceBid(item.product_id, account_id)
                    }
                    className="rounded-md bg-green-500 p-2 text-white"
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
            <Button className="mb-4" onClick={() => setShowQRDecider(false)}>
              Close
            </Button>
            <QRCode
              size={256}
              style={{ height: 'auto', maxWidth: '50%', width: '50%' }}
              value={`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/view/${qrCodeID}`}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      )}

      {showPlaceBid && (
        <div className="absolute right-0 top-0 flex h-full w-full justify-center bg-white bg-opacity-80">
          <div className="relative mt-[5rem] flex h-[15rem] w-[40rem] flex-col items-start justify-center gap-10 rounded-md border-2 bg-white p-4 text-start">
            <h1 className="mb-[-1rem]  text-[2rem] font-bold">
              Enter your bidding
            </h1>
            <div className="w-full ">
              <form onSubmit={handlePlaceBid}>
                <Label className="my-4 block">Amount</Label>
                <Input
                  onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                  required
                  type="text"
                  placeholder="Enter amount"
                />

                <div className="mt-2 flex w-full justify-end gap-5">
                  <Button onClick={() => setShowPlaceBid(false)}>Cancel</Button>

                  <Button type="submit">Place Bid</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showProductDetails && (
        <div className="absolute right-0 top-0 flex h-full w-full justify-center bg-white bg-opacity-80">
          <div className="relative mt-[5rem] flex h-[30rem] w-[60rem] items-center justify-center gap-10 rounded-md border-2 bg-white p-2">
            <Button
              className="absolute right-2 top-2"
              onClick={() => setShowProductDetails(false)}
            >
              Close
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
            <div className="w-[80%]">
              <div className="flex gap-4">
                <div className="flex w-[100%] flex-col ">
                  <Label className="my-4 block">Product Name</Label>
                  <span className="block rounded-md border-2 p-1">
                    {productDetails.product_name}
                  </span>
                </div>

                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Year Model</Label>
                  <span className="block rounded-md border-2 p-1">
                    {productDetails.year_model}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Brand Name</Label>
                  <span className="block rounded-md border-2 p-1">
                    {productDetails.brand_name}
                  </span>
                </div>

                <div className="flex w-[100%] flex-col">
                  <Label className="my-4 block">Product Condition</Label>

                  <span className="block rounded-md border-2 p-1">
                    {productDetails.product_condition}
                  </span>
                </div>
              </div>

              <Label className="my-4 block">Description</Label>
              <span className="block rounded-md border-2 p-1">
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
