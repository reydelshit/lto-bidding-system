import { ProductType } from '@/entities/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserNavigation from '../UserNavigation';
import { Link } from 'react-router-dom';

type ProductBidHistoryType = {
  product_id: number;
  product_name: string;
  amount_bid: number;
  createdOn: string;
  bidding_id: number;
  image_path: string;
};

const BidHistory = () => {
  const [product, setProduct] = useState<ProductBidHistoryType[]>([]);

  const fetchProduct = async () => {
    await axios
      .get(
        `${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product-bid-history.php`,
        {
          params: {
            bided_products: true,
            account_id: localStorage.getItem('lto_bidding_token'),
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <UserNavigation />
      <h1 className="my-2 text-[2rem]">PRODUCT BID HISTORY</h1>
      <div className="mt-[2rem]">
        <div className="grid grid-cols-5">
          {product.map((item, index) => (
            <div
              key={index}
              className="flex w-[20rem] flex-col rounded-md border-2 p-2"
            >
              <img
                className="h-[15rem] w-full object-cover"
                src={item.image_path}
                alt="product"
              />

              <div>
                <Link
                  className="cursor-pointer"
                  to={`/bid-logs/${item.product_id}`}
                >
                  <h1 className="font-bold">
                    Product Name: {item.product_name}
                  </h1>{' '}
                </Link>

                <h1>Your Latest Bid : ₱ {item.amount_bid}</h1>
                <h1>Latest Bid Date : {item.createdOn}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BidHistory;
