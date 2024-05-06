import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CardCompo({
  title,
  description,
  icon,
  value,
}: {
  title: string;
  description: string;
  icon: any;
  value: string;
}) {
  return (
    <>
      <Card className="w-[40%] bg-white text-start">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium ">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-500">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </>
  );
}
