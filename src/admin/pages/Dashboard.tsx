import { GoNumber } from 'react-icons/go';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import CardCompo from '../utils/CardCompo';

const monthlyVisits = [
  { name: 'Jan', total: 400 },
  { name: 'Feb', total: 300 },
  { name: 'Mar', total: 200 },
  { name: 'Apr', total: 278 },
  { name: 'May', total: 189 },
  { name: 'Jun', total: 239 },
  { name: 'Jul', total: 349 },
  { name: 'Aug', total: 200 },
  { name: 'Sep', total: 278 },
  { name: 'Oct', total: 189 },
  { name: 'Nov', total: 239 },
  { name: 'Dec', total: 349 },
];

const Dashboard = () => {
  return (
    <div className="mt-[2rem]">
      <h1 className="my-4 text-2xl font-bold">Dashboard</h1>

      <div className="flex gap-4">
        <CardCompo
          title="TOTAL NUMBER OF PATIENTS"
          description="The total number of patients registered in the system."
          icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
          value={'5'}
        />
        <CardCompo
          title="TOTAL NUMBER OF PATIENTS"
          description="The total number of patients registered in the system."
          icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
          value={'5'}
        />
        <CardCompo
          title="TOTAL NUMBER OF PATIENTS"
          description="The total number of patients registered in the system."
          icon={<GoNumber className="h-[1.5rem] w-[1.5rem]" />}
          value={'5'}
        />
      </div>

      <div className="mt-[2rem] flex justify-between gap-2">
        <div className="rounded-lg border-2 bg-white md:w-[60%] md:p-5">
          <h1 className="mb-5 font-bold uppercase">Monthly Product</h1>
          <ResponsiveContainer width="100%" height={450}>
            <BarChart data={monthlyVisits}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: string) => `${value}`}
              />
              <Bar dataKey="total" fill="#FACC15" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-[40%] rounded-lg border-2  bg-white">
          <h1 className="mb-5 font-bold uppercase">Bidders</h1>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyVisits}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: string) => `${value}`}
              />
              <Bar dataKey="total" fill="#FACC15" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
