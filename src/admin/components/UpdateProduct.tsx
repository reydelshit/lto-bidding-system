import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import defaultProfile from '@/assets/default.jpg';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
// import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import moment from 'moment';

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

type Images = {
  product_id: number;
  images_data: string;
  image_id: number;
};

export default function UpdateProducts({}: {}) {
  const [selectedCategory, setSelectedCategory] = useState('' as string);

  const [image, setImage] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productYear, setProductYear] = useState('');
  const [productCondition, setProductCondition] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStartPrice, setProductStartPrice] = useState('');
  const [productDate, setProductDate] = useState('');

  const [images, setImages] = useState<Images[]>([]);
  const [newImages, setNewImages] = useState<string[]>([]);
  const [storeProduct, setStoreProducts] = useState([]);

  const { id } = useParams();
  //   const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent) => {
    const value = e.target.value;
    const name = e.target.name;
    setStoreProducts((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product.php`,
      {
        params: {
          product_id: id,
        },
      },
    );

    console.log(res.data);
    if (res.data.length > 0) {
      setStoreProducts(res.data[0]);
      setImage(res.data[0].image_path);
      setProductName(res.data[0].product_name);
      setProductBrand(res.data[0].brand_name);
      setProductYear(res.data[0].year_model);
      setProductCondition(res.data[0].product_condition);
      setProductDescription(res.data[0].description);
      setProductPrice(res.data[0].regular_price);
      setProductStartPrice(res.data[0].starting_price);
      setProductDate(res.data[0].date_until);
    }
    // setStoreProducts(res.data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(image);
    // console.log(user);

    axios
      .put(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product.php`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...storeProduct,
        product_condition: selectedCategory,
        image_path: image,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FileReader();
    data.readAsDataURL(e.target.files![0]);

    data.onloadend = () => {
      const base64 = data.result;
      if (base64) {
        setImage(base64.toString());

        // console.log(base64.toString());
      }
    };
  };

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const newnewImages = [...newImages];

    const promises = [];
    for (let i = 0; i < files!.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files![i]);

      promises.push(
        new Promise((resolve, reject) => {
          reader.onload = () => {
            resolve(reader.result as string);
          };

          reader.onerror = (error) => {
            reject(error);
          };
        }),
      );
    }

    Promise.all(promises)
      .then((results) => {
        // console.log('Results:', results);
        newnewImages.push(...(results as string[]));
        // console.log('New Images:', newImages);
        setNewImages(newnewImages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleConditionType = (event: string) => {
    const selectedValue = event;
    setSelectedCategory(selectedValue);
  };

  return (
    <div className="flex h-fit w-full flex-col items-center justify-center p-4 text-center">
      <div className="w-[80%]">
        <div className="mt-[5rem] flex w-full justify-between gap-[4rem]">
          <div className="mb-2 mt-[2rem] flex flex-col">
            <img
              className="mb-4  h-[25rem] w-[40rem] rounded-lg object-cover"
              src={image! ? image! : defaultProfile}
            />
            <Label className="mb-2 text-start">Primary image</Label>

            <Input
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              className="cursor-pointer"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col text-[#5d383a]"
          >
            <div className="flex w-full gap-2">
              <div className="item-start flex w-[50%] flex-col p-4">
                <Label className="mb-2 text-start">Product Name</Label>
                <Input
                  name="product_name"
                  className="mb-2"
                  onChange={handleChange}
                  defaultValue={productName}
                />
              </div>

              <div className="item-start flex w-[50%] flex-col  p-4 ">
                <Label className="mb-2 text-start">Year Model</Label>
                <Input
                  type="number"
                  name="year_model"
                  className="mb-2"
                  onChange={handleChange}
                  defaultValue={productYear}
                />
              </div>
            </div>

            <div className="flex w-full items-center gap-2">
              <div className="item-start flex w-[50%] flex-col  p-4">
                <Label className="mb-2 text-start">Brand Name</Label>
                <Input
                  name="brand_name"
                  className="mb-2"
                  onChange={handleChange}
                  defaultValue={productBrand}
                />
              </div>

              <div className=" w-[50%] p-4 text-start">
                <Label className="mb-4 block">
                  Product Condition ({productCondition})
                </Label>

                <Select
                  value={selectedCategory}
                  onValueChange={handleConditionType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GOOD">GOOD</SelectItem>
                    <SelectItem value="SLIGHTLY USE">SLIGHTLY USE</SelectItem>
                    <SelectItem value="DAMAGED">DAMAGED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 text-start">
              <Label className="mb-2">Description</Label>
              <Textarea
                onChange={handleChange}
                defaultValue={productDescription}
                name="description"
                className="mb-2 mt-2 min-h-[10rem]"
              ></Textarea>
            </div>

            <div className="flex w-full gap-2">
              <div className="item-start flex w-[50%] flex-col p-4">
                <Label className="mb-2 text-start">Regular Price</Label>
                <Input
                  name="regular_price"
                  className="mb-2"
                  onChange={handleChange}
                  defaultValue={productPrice}
                />
              </div>

              <div className="item-start flex w-[50%] flex-col  p-4 ">
                <Label className="mb-2 text-start">Start Bidding Amount</Label>
                <Input
                  type="number"
                  name="starting_price"
                  className="mb-2"
                  onChange={handleChange}
                  defaultValue={productStartPrice}
                />
              </div>
            </div>

            <div className="item-start flex w-full flex-col  p-4 ">
              <Label className="mb-2 text-start">
                Bidding Until Date ({productDate})
              </Label>
              <Input
                type="datetime-local"
                name="date_until"
                className="mb-2"
                onChange={handleChange}
                defaultValue={productDate}
              />
            </div>

            <div className="flex gap-4">
              <Button className="w-[40%] self-center " type="submit">
                Save and Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
