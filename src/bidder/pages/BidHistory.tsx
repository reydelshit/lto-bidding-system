import { ProductType } from '@/entities/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserNavigation from '../UserNavigation';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
    <div className="h-full w-full bg-gray-50">
      <UserNavigation />
      <div className="relative mx-[2rem] h-full w-full bg-gray-50">
        <h1 className="my-4 text-[1.5rem] font-semibold">
          PRODUCT BID HISTORY{' '}
          <span className="text-gray-500">{'>'} List of Bid History</span>
        </h1>
        <div className="mt-[2rem]">
          <div className="grid grid-cols-5">
            {product.map((item, index) => (
              <div
                key={index}
                className="flex w-[20rem] flex-col rounded-lg border-2 border-[#5AB2FF] bg-white p-2"
              >
                <img
                  className="h-[15rem] w-full object-cover"
                  src={item.image_path}
                  alt="product"
                />

                <div className="py-4">
                  <Link
                    className="mb-2 block cursor-pointer"
                    to={`/bid-logs/${item.product_id}`}
                  >
                    <h1 className="text-2xl font-bold uppercase hover:text-blue-600">
                      {item.product_name}
                    </h1>{' '}
                  </Link>

                  <h1 className="mb-2 text-gray-800">
                    Your Latest Bid :{' '}
                    <span className="inline-block font-bold">
                      {' '}
                      ₱ {item.amount_bid}
                    </span>
                  </h1>
                  <h1 className="mb-2 text-gray-800">
                    Latest Bid Date : {moment(item.createdOn).format('LLL')}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidHistory;
