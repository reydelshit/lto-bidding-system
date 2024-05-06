import { TbSquareRoundedNumber1 } from 'react-icons/tb';
import { MdMoneyOffCsred } from 'react-icons/md';
import { MdSmsFailed } from 'react-icons/md';
function BiddingNotificationItem({ row }: { row: any }) {
  const { statuss, date_until, product_name, outbid } = row;

  const notificationContent = () => {
    if (statuss === 1) {
      if (new Date(date_until) < new Date()) {
        return (
          <>
            <div className="flex items-center gap-2">
              <TbSquareRoundedNumber1 className="text-5xl text-blue-500" />
              <div>
                <h6>You won the bidding</h6>
                <p className="font-semibold">Product: {product_name}</p>
              </div>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="flex items-center gap-2">
              <TbSquareRoundedNumber1 className="text-5xl text-green-500" />

              <div>
                <h6>You lead the bidding</h6>
                <p className="font-semibold">Product: {product_name}</p>
              </div>
            </div>
          </>
        );
      }
    } else {
      if (new Date(date_until) < new Date()) {
        return (
          <>
            <div className="flex items-center gap-2">
              <MdSmsFailed className="text-5xl text-red-500" />
              <div>
                <h6>You lost the bidding.</h6>
                <p className="font-semibold">Product Name: {product_name}</p>
              </div>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="flex items-center gap-2">
              <MdMoneyOffCsred className="text-5xl text-yellow-500" />
              <div>
                <h6>You are outbid by ₱{Math.abs(outbid)}</h6>
                <p className="font-semibold">Product Name: {product_name}</p>
              </div>
            </div>
          </>
        );
      }
    }
  };

  return (
    <div className="d-flex align-items-center border-b-2 p-4">
      {notificationContent()}
    </div>
  );
}

export default BiddingNotificationItem;
