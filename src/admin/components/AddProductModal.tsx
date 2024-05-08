import defaultProfile from '@/assets/product-456x456.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

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
  const [selectedSlot, setSelectedSlot] = useState('' as string);

  const [isVip, setIsVip] = useState(false);

  const [image, setImage] = useState<string | null>(null);

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
        is_vip: isVip ? 1 : 0,
        available_slot: selectedSlot,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 'success') {
          window.location.reload();
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

  const handleConditionType = (event: string) => {
    const selectedValue = event;
    setSelectedCategory(selectedValue);
    // console.log(selectedValue);
  };

  const handleSlot = (event: string) => {
    const selectedValue = event;
    setSelectedSlot(selectedValue);
    // console.log(selectedValue);
  };

  const handleChangeBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsVip(event.target.checked);
  };

  return (
    <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
      <div className="w-[80%]">
        <div className="relative mt-[5rem] flex w-full justify-between gap-[4rem] border-2 bg-white px-4 py-6">
          <IoMdClose
            className="absolute right-4 top-4 mb-4 flex cursor-pointer gap-2 text-3xl"
            onClick={() => setShowAddProduct(false)}
          />

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

          <form onSubmit={handleSubmit} className="flex w-full flex-col ">
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
                    <SelectValue placeholder="Condition" />
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
                  type="number"
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

            <div className="flex w-full gap-2">
              <div className="item-start flex w-[50%] flex-col  p-4 ">
                <Label className="mb-2 text-start">Bidding Until Date</Label>
                <Input
                  type="datetime-local"
                  name="date_until"
                  className="mb-2 w-full"
                  onChange={handleChange}
                />
              </div>
              <div className=" w-[50%] p-4 text-start">
                <Label className="mb-4 block">Slot Available</Label>

                <Select value={selectedSlot} onValueChange={handleSlot}>
                  <SelectTrigger>
                    <SelectValue placeholder="Slotss.." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="70">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="-">No Limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="item-start flex w-full flex-col  p-4 ">
              <Label className="mb-2 text-start">
                Is for Vip? (leave uncheck if not)
              </Label>
              <Input
                type="checkbox"
                name="is_vip"
                className="mb-2 w-[1rem]"
                onChange={handleChangeBox}
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button className="w-[40%] self-center" type="submit">
                Add product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
