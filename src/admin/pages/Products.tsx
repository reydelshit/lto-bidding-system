import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import VIP from '@/assets/crown.png';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ProductType } from '@/entities/types';
import AddProductModal from '../components/AddProductModal';

const Products = () => {
  const [product, setProduct] = useState<ProductType[]>([]);

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchProduct, setSearchProduct] = useState('');

  const handleDelete = (id: number) => {
    axios
      .delete(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product.php`, {
        data: { product_id: id },
      })
      .then((res) => {
        if (res.data) {
          fetchProduct();
        }
      });
  };

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

  return (
    <div className="relative mt-[2rem]">
      <h1 className="my-4 text-2xl font-bold">Products</h1>

      {showAddProduct ? (
        <AddProductModal setShowAddProduct={setShowAddProduct} />
      ) : (
        <div className="mt-[1rem] w-full rounded-lg bg-white p-2">
          <div className="my-2 flex w-full items-center justify-between">
            <Input
              onChange={(e) => setSearchProduct(e.target.value)}
              className="w-[20rem]"
              placeholder="search product.."
            />

            <Button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="self-end"
            >
              {showAddProduct ? 'Close' : 'Add Product'}
            </Button>
          </div>

          <Table>
            <TableCaption>A list of product added.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-black"></TableHead>
                <TableHead className="font-bold text-black">
                  Product Details
                </TableHead>
                <TableHead className="font-bold text-black">
                  Bidding Details
                </TableHead>

                <TableHead className="font-bold text-black ">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product
                .filter((prod) => prod.product_name.includes(searchProduct))
                .map((prod) => {
                  return (
                    <TableRow
                      className="border-b-2 text-start"
                      key={prod.product_id}
                    >
                      <TableCell className="flex items-center gap-4">
                        <img
                          className="h-[6rem] w-[8rem] rounded-md object-cover"
                          src={prod.image_path}
                          alt={prod.product_name}
                        />
                        {parseInt(prod.is_vip) === 1 && (
                          <img
                            className="h-[5rem] w-[5rem] rounded-md object-cover"
                            src={VIP}
                            alt="vip"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-bold">{prod.product_name}</p>
                          <p>{prod.brand_name}</p>
                          <p>{prod.year_model}</p>
                          <p>{prod.product_condition}</p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div>
                          <p>Regular Price: {prod.regular_price}</p>
                          <p>Starting Price: {prod.starting_price}</p>
                          <p>Until Date: {prod.date_until}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="flex gap-2">
                          <AlertDialog>
                            <AlertDialogTrigger className="cursor-pointer">
                              <RiDeleteBin5Line className="h-[1.5rem] w-[2rem] text-[#5d383a]" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete the product and remove the
                                  data from the server.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(prod.product_id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <Link to={`/admin/product/update/${prod.product_id}`}>
                            {' '}
                            <FiEdit3 className="h-[1.5rem] w-[2rem] text-[#5d383a]" />
                          </Link>
                          {/* <Link to={`/shop/${prod.product_id}`}>
                          {' '}
                          <AiOutlineEye className="h-[1.5rem] w-[2rem] text-[#5d383a]" />
                        </Link> */}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Products;
