export type BiddingsType = {
  product_id: number;
  product_name: string;
  brand_name: string;
  year_model: number;
  product_condition: string;
  regular_price: number;
  starting_price: number;
  date_until: string;
  image_path: string;
  account_id: number;
  cnt: number;
  amt: number;
  fname: string;
};

export type BiddersType = {
  account_id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  email_address: string;
  username: string;
  address: string;
  is_verified: number;
  image_path: string;
  id_image?: string;
};

export type LeaderBoardType = {
  product_name: string;
  amt: number;
  date_created: string;
  fname: string;
  image_path: string;
};
