import DefaultImage from '@/assets/defaultImage.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiUser } from 'react-icons/ci';
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export default function Register() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorInput, setErrorInput] = useState<string>('');
  const [credentials, setCredentials] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;

    setUsername(value);
    setPassword(value);

    setCredentials((values) => ({ ...values, [name]: value }));

    console.log(credentials);
  };

  const handleRegister = () => {
    if (!username || !password)
      return setErrorInput('Please fill in all fields');

    axios
      .post(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/login.php`, {
        ...credentials,
        is_verified: 0,
        id_image: image,
      })
      .then((res: any) => {
        console.log(res.data, 'login successfully');
        if (res.data.status === 'success') {
          // setSuccessfulLogin(true);
          navigate('/register/redirect');
        }
      });
  };

  // navigate to login in 5 seconds

  const handleCheckPassword = (e: ChangeEvent) => {
    const { value } = e.target;

    if (value !== password) {
      setErrorInput('Passwords do not match');
    } else {
      setErrorInput('');
    }
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

  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <div className="flex w-[40%] flex-col rounded-md border-2 p-4 shadow-lg">
        <div>
          <div className="flex gap-4">
            <div className="flex w-[100%] flex-col ">
              <Label className="my-4 block">First Name</Label>
              <Input
                onChange={handleChange}
                className="mb-2"
                placeholder="First Name"
                name="first_name"
                required
              />
            </div>

            <div className="flex w-[100%] flex-col">
              <Label className="my-4 block">Last Name</Label>
              <Input
                onChange={handleChange}
                className="mb-2"
                placeholder="Last Name"
                name="last_name"
                required
              />
            </div>

            <div className="flex w-[100%] flex-col">
              <Label className="my-4 block">Middle Name</Label>
              <Input
                onChange={handleChange}
                className="mb-2"
                placeholder="Middle Name"
                name="middle_name"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex w-[100%] flex-col">
              <Label className="my-4 block">Phone Number</Label>
              <Input
                onChange={handleChange}
                className="mb-2"
                placeholder="Phone Number"
                name="phone_number"
                required
              />
            </div>

            <div className="flex w-[100%] flex-col">
              <Label className="my-4 block">Email</Label>

              <Input
                onChange={handleChange}
                className="mb-2"
                placeholder="Email"
                name="email_address"
                required
              />
            </div>
          </div>

          <Label className="my-4 block">Username</Label>
          <Input
            onChange={handleChange}
            className="mb-2"
            placeholder="Username"
            name="username"
            required
          />

          <div className="flex gap-4">
            <div className="flex w-[100%] flex-col">
              <Label className="my-4 block">Password</Label>
              <Input
                onChange={handleChange}
                className="mb-2"
                placeholder="Password"
                name="password"
                type="password"
                required
              />
            </div>

            <div className="flex w-[100%] flex-col">
              <Label className="my-4 block">Confirm Password</Label>
              <Input
                onChange={handleCheckPassword}
                className="mb-2"
                placeholder="Confirm Password"
                name="confirm_password"
                type="password"
                required
              />
            </div>
          </div>

          <Label className="my-4 block">Address</Label>
          <Input
            onChange={handleChange}
            className="mb-2"
            placeholder="Address"
            name="address"
            required
          />
        </div>

        <div className="flex justify-around">
          {/* <img
            className="mb-4  h-[8rem] w-[8rem] rounded-lg object-cover"
            src={image! ? image! : DefaultImage}
          /> */}
          <div className="mb-2 w-full">
            <Label className="my-4 block">Image</Label>
            <Input
              required
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
              name="crops_img"
            />
          </div>
        </div>

        {errorInput.length > 0 && (
          <p className="my-4 rounded-md border-2  bg-white p-2 font-semibold text-primary-red">
            {errorInput}
          </p>
        )}
        <div className="flex w-full items-center justify-center">
          <Button
            className="flex w-full items-center gap-2"
            onClick={handleRegister}
          >
            <CiUser className="text-xl" /> Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}
