import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useState } from 'react';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorInput, setErrorInput] = useState<string>('');

  const [credentials, setCredentials] = useState([]);

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
          localStorage.setItem('lto_bidding_token', res.data[0].account_id);
          localStorage.setItem('lto_accountType', res.data[0].account_type);

          fetchVipStatus(res.data[0].account_id);

          if (res.data[0].account_type === 'admin') {
            window.location.href = '/admin';
          } else if (
            res.data[0].is_verified === 0 &&
            res.data[0].is_verified === 2
          ) {
            setErrorInput('Wait for the admin to verify your account');
          } else {
            window.location.href = '/';
          }
        }
      });
  };

  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <div className="flex h-[25rem] w-[40%] flex-col items-center justify-center rounded-md border-4 border-green-500 bg-white p-4 px-[5rem] text-black shadow-slate-400">
        <Input
          onChange={handleChange}
          className="mb-8 w-full rounded-full border-4 border-green-500 p-8 text-2xl text-green-500 placeholder:text-2xl placeholder:font-semibold placeholder:text-green-500 focus:outline-none"
          placeholder="Username"
          name="username"
          required
        />

        {/* <Label className="mb-1 self-start text-sm">Password</Label> */}
        <Input
          className="mb-2 w-full rounded-full border-4 border-green-500 p-8 text-2xl text-green-500 placeholder:text-2xl placeholder:font-semibold placeholder:text-green-500 focus:outline-none"
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Password"
          required
        />

        <div className="w-full px-2 text-end">
          <a
            href="/register"
            className="text-[1.2rem] text-green-500 underline"
          >
            Create an account
          </a>
        </div>
        <Button
          className="mt-[2rem] w-[10rem] bg-green-500 p-2 text-white"
          onClick={handleLogin}
        >
          Login
        </Button>
        {errorInput && (
          <p className="rounded-md border-2 bg-white p-2 font-semibold text-primary-red">
            {errorInput}
          </p>
        )}
      </div>
    </div>
  );
}
