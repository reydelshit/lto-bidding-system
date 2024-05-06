import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useState } from 'react';
import { CiUnlock } from 'react-icons/ci';
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorInput, setErrorInput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [credentials, setCredentials] = useState([]);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;

    setUsername(value);
    setPassword(value);

    setCredentials((values) => ({ ...values, [name]: value }));

    console.log(credentials);
  };

  const fetchVipStatus = async (account_id: number) => {
    await axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/subscribe.php`, {
        params: {
          account_id: account_id,
        },
      })
      .then((res) => {
        console.log(res.data, 'vip status');
        if (res.data.length > 0) {
          localStorage.setItem('lto_vip', 'true');
        }
      });
  };

  const handleLogin = () => {
    if (!username || !password)
      return setErrorInput('Please fill in all fields');

    axios
      .get(`${import.meta.env.VITE_LTO_BIDDING_LOCAL_HOST}/login.php`, {
        params: credentials,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          if (res.data[0].account_type === 'admin') {
            localStorage.setItem('lto_bidding_token', res.data[0].account_id);
            localStorage.setItem('lto_accountType', res.data[0].account_type);

            fetchVipStatus(res.data[0].account_id);
            window.location.href = '/admin';
          } else if (parseInt(res.data[0].is_verified) === 0) {
            setError('Account not verified yet');
            setIsVerified(true);

            return;
          } else if (parseInt(res.data[0].is_verified) === 2) {
            setError('Account is rejected');
            return;
          } else {
            localStorage.setItem('lto_bidding_token', res.data[0].account_id);
            localStorage.setItem('lto_accountType', res.data[0].account_type);
            fetchVipStatus(res.data[0].account_id);

            window.location.href = '/';
          }
        }
      });
  };

  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      {isVerified && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center rounded-md bg-white p-4 px-[5rem] text-black shadow-slate-400">
            <p className="mb-4 text-lg text-blue-500">
              Your account is not verified yet
            </p>
            <Button
              className="mt-4 w-[10rem] p-2 text-white"
              onClick={() => setIsVerified(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
      <div className="flex h-[30rem] w-[30%] flex-col items-center justify-center rounded-md border-2 bg-white p-4  text-black shadow-md shadow-slate-400">
        <h1
          className="text-4xl
        font-bold"
        >
          Sign In
        </h1>

        <div className="my-[2rem] flex w-full items-center justify-center gap-2 px-2 text-center">
          Don't have an account?{' '}
          <a
            href="/register"
            className=" font-semibold text-blue-500 underline"
          >
            Sign up here
          </a>
        </div>
        <Input
          onChange={handleChange}
          className="mb-8 w-full rounded-sm border-2 p-6 text-xl   focus:outline-none"
          placeholder="Username"
          name="username"
          required
        />

        {/* <Label className="mb-1 self-start text-sm">Password</Label> */}
        <Input
          className="mb-2 w-full rounded-sm border-2 p-6 text-xl  focus:outline-none"
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Password"
          required
        />

        <Button
          onClick={handleLogin}
          className="mt-[2rem] flex w-full items-center gap-2 p-6 text-white"
        >
          <CiUnlock className="text-2xl" />
          Login
        </Button>

        {error.length > 0 && (
          <p className="my-2 rounded-md border-2 bg-white p-2 font-semibold text-primary-red">
            {error}
          </p>
        )}
        {errorInput && (
          <p className="rounded-md border-2 bg-white p-2 font-semibold text-primary-red">
            {errorInput}
          </p>
        )}
      </div>
    </div>
  );
}
