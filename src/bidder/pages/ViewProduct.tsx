import { useEffect, useState } from 'react';

import { ProductType } from '@/entities/types';
import axios from 'axios';
import UserNavigation from '../UserNavigation';
import { useParams } from 'react-router-dom';

const ViewProduct = () => {
  const [product, setProduct] = useState<ProductType[]>([]);

  const { id } = useParams();

  const fetchProductSpecific = async () => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product.php`, {
        params: {
          product_id: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      });
  };

  useEffect(() => {
    fetchProductSpecific();
  }, []);

  return (
    <div className="relative h-full">
      <UserNavigation />

      <div className="flex h-full items-center justify-center">
        <div className="w-1/2 rounded-lg bg-white p-5">
          {product.map((prod) => (
            <div key={prod.product_id}>
              <h1 className="text-center text-2xl font-bold">
                {prod.product_name}
              </h1>
              <div className="flex items-center justify-center">
                <img
                  src={prod.image_path}
                  alt={prod.product_name}
                  className="w-1/2"
                />
              </div>
              <p className="text-center text-lg">
                Brand name: {prod.brand_name}
              </p>
              <p className="text-center text-lg">
                Yeard Model: {prod.year_model}
              </p>
              <p className="text-center text-lg">
                Product Condition: {prod.product_condition}
              </p>
              <p className="text-center text-lg">
                Product Description: {prod.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
