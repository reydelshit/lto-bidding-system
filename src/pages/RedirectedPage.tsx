import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectedPage = () => {
  const [seconds, setSeconds] = useState(8);

  const navigate = useNavigate();

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  window.setTimeout(() => {
    return navigate('/login');
  }, 5000);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[30rem] rounded-md border-2 p-4 text-center shadow-md">
        <p className="font-semibold">
          We need to verify your valid ID to validate if it is yours. Kindly
          relogin back up after 1 hr - 2 hrs. Thank you! We redirected you in
          the sign in page
        </p>
        <span className="text-4xl font-bold">{seconds}</span>
      </div>
    </div>
  );
};

export default RedirectedPage;
