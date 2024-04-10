import DefaultImage from '@/assets/defaultImage.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export default function Register() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorInput, setErrorInput] = useState<string>('');
  const [successfulLogin, setSuccessfulLogin] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(5);
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
          setSuccessfulLogin(true);
          // navigate('/login')

          window.setTimeout(() => {
            return navigate('/login');
          }, 5000);
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

  useEffect(() => {
    if (!successfulLogin) return;

    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [successfulLogin]);

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
      <div className="flex w-[50%] flex-col rounded-md border-2  border-green-500 p-4">
        <div>
          <div className="flex gap-4">
            <div className="flex w-[100%] flex-col ">
              <Label className="my-4 block">First Name</Label>
              <Input
                onChange={handleChange}
                className="mb-2 border-green-500"
                placeholder="First Name"
                name="first_name"
                required
              />
            </div>

            <div className="flex w-[100%] flex-col">
              <Label className="my-4 block">Last Name</Label>
              <Input
                onChange={handleChange}
                className="mb-2 border-green-500"
                placeholder="Last Name"
                name="last_name"
                required
              />
            </div>

            <div className="flex w-[100%] flex-col">
              <Label className="my-4 block">Middle Name</Label>
              <Input
                onChange={handleChange}
                className="mb-2 border-green-500"
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
                className="mb-2 border-green-500"
                placeholder="Phone Number"
                name="phone_number"
                required
              />
            </div>

            <div className="flex w-[100%] flex-col">
              <Label className="my-4 block">Email</Label>

              <Input
                onChange={handleChange}
                className="mb-2 border-green-500"
                placeholder="Email"
                name="email_address"
                required
              />
            </div>
          </div>

          <Label className="my-4 block">Username</Label>
          <Input
            onChange={handleChange}
            className="mb-2 border-green-500"
            placeholder="Username"
            name="username"
            required
          />

          <div className="flex gap-4">
            <div className="flex w-[100%] flex-col">
              <Label className="my-4 block">Password</Label>
              <Input
                onChange={handleChange}
                className="mb-2 border-green-500"
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
                className="mb-2 border-green-500"
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
            className="mb-2 border-green-500"
            placeholder="Address"
            name="address"
            required
          />
        </div>

        <div className="flex justify-around">
          <img
            className="mb-4  h-[8rem] w-[8rem] rounded-lg object-cover"
            src={image! ? image! : DefaultImage}
          />
          <div className="mb-2 border-green-500">
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
          <p className="my-4 rounded-md border-2 border-green-500 border-green-500 bg-white p-2 font-semibold text-primary-red">
            {errorInput}
          </p>
        )}
        <div className="flex w-full items-center justify-center">
          <Button className="w-[10rem]" onClick={handleRegister}>
            register
          </Button>
        </div>

        {successfulLogin && (
          <div className="my-4 rounded-md border-green-500 bg-green-500 p-2 text-white">
            Registed Successfully, navigating to login page in{' '}
            <span className="font-bold">{seconds}</span> seconds
          </div>
        )}
      </div>
    </div>
  );
}
