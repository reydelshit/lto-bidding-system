function BiddingNotificationItem({ row }: { row: any }) {
  const { statuss, date_until, product_name, outbid } = row;

  const notificationContent = () => {
    if (statuss === 1) {
      if (new Date(date_until) < new Date()) {
        return (
          <>
            <div>
              <h6>You won the bidding</h6>
              <p>Product: {product_name}</p>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div>
              <h6>You lead the bidding</h6>
              <p>Product: {product_name}</p>
            </div>
          </>
        );
      }
    } else {
      if (new Date(date_until) < new Date()) {
        return (
          <>
            <div>
              <h6>You lost the bidding.</h6>
              <p>Product Name: {product_name}</p>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div>
              <h6>You are outbid by ₱{Math.abs(outbid)}</h6>
              <p>Product Name: {product_name}</p>
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
