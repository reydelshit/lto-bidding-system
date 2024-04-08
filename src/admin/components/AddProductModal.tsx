import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import defaultProfile from '@/assets/defaultImage.jpg';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// import { URL } from 'url';

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;
export default function AddProductModal({
  setShowAddProduct,
}: {
  setShowAddProduct: (value: boolean) => void;
}) {
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('' as string);

  const [image, setImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent) => {
    const value = e.target.value;
    const name = e.target.name;
    setProduct((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(image);
    // console.log(user);

    axios
      .post(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/product.php`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...product,
        product_condition: selectedCategory,
        image_path: image,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 'success') {
          //   window.location.reload();
          setShowAddProduct(false);
          // navigate('/');
        }
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
    const newImages = [...images];

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
        newImages.push(...(results as string[]));
        setImages(newImages);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleConditionType = (event: string) => {
    const selectedValue = event;
    setSelectedCategory(selectedValue);
    // console.log(selectedValue);
  };

  return (
    <div className="absolute top-0 flex h-fit w-full flex-col items-center justify-center p-4 text-center">
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
                />
              </div>

              <div className="item-start flex w-[50%] flex-col  p-4 ">
                <Label className="mb-2 text-start">Year Model</Label>
                <Input
                  type="number"
                  name="year_model"
                  className="mb-2"
                  onChange={handleChange}
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
                />
              </div>

              <div className=" w-[50%] p-4 text-start">
                <Label className="mb-4 block">Product Condition</Label>

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
                />
              </div>

              <div className="item-start flex w-[50%] flex-col  p-4 ">
                <Label className="mb-2 text-start">Start Bidding Amount</Label>
                <Input
                  type="number"
                  name="starting_price"
                  className="mb-2"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="item-start flex w-full flex-col  p-4 ">
              <Label className="mb-2 text-start">Bidding Until Date</Label>
              <Input
                type="datetime-local"
                name="date_until"
                className="mb-2"
                onChange={handleChange}
              />
            </div>

            {/* <div className="my-5 flex w-full flex-col items-center justify-center">
              <Label className="mb-2 text-start">Upload multiple images</Label>

              <div className="mb-2 flex w-full gap-2 border-2 p-2">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className="mb-4  h-[15rem] w-[20rem] rounded-lg object-cover"
                  />
                ))}
              </div>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultipleImages}
                className="cursor-pointer"
              />
            </div> */}

            <div className="flex gap-4">
              <Button
                className="w-[40%] self-center bg-[#5d383a]"
                type="submit"
              >
                Add product
              </Button>

              <Button
                onClick={() => setShowAddProduct(false)}
                className="w-[40%] self-center bg-[#5d383a]"
              >
                Close
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
