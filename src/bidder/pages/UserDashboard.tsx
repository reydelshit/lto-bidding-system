import DefaultImage from '@/assets/defaultImage.jpg';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ProductType } from '@/entities/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductType>(
    {} as ProductType,
  );

  const fetchProduct = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product.php`)
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

  return (
    <div>
      <h1>List of Motorcycle's</h1>

      <div className="grid grid-cols-5">
        {product.map((item, index) => (
          <div key={index} className="w-[20rem] rounded-md border-2 p-2">
            <img
              className="h-[15rem] w-full object-cover"
              src={item.image_path}
              alt="product"
            />

            <div>
              <h1>Product Name: {item.product_name}</h1>

              <h1>Starting Amount: {item.starting_price}</h1>
              <h1>Highesh Bid: {item.date_until}</h1>
              <h1>Until : {item.date_until}</h1>
            </div>

            <div className="mt-[2rem] flex w-full justify-around">
              <Button
                onClick={() => handleShowProductDetails(item.product_id)}
                className="rounded-md bg-green-500 p-2 text-white"
              >
                View Details
              </Button>
              <Button className="rounded-md bg-green-500 p-2 text-white">
                Bid Now
              </Button>
            </div>
          </div>
        ))}
      </div>

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
