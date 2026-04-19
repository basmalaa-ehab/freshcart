export interface ProductType {
  images: string[];
  title: string;
  slug: string;
  description: string;
  _id: string;
  imageCover: string;
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  subcategory: subcategory[];
  category: category;
  brand: BrandType;
  reviews: reviews[];
  sold: number;
  id: string;
  count: number;
}

export interface category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
export interface BrandType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface reviews {
  _id: string;
  review: number;
  rating: string;
  product: string;
  updatedAt: string;
  createdAt: string;
  image: string;
}

export interface subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface cartResponse {
  _id: string;
  cartOwner: string;
  products: ItemType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
  shippingCost?: number;
  freeShipping?: boolean;

  numOfCartItems: number;
}
export interface ItemType {
  count: number;
  _id: string;
  price: number;
  product: ProductType;
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: ProductType[];
}

export interface shippingDetailsTypes {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
    postalCode: string;
  };
}

export interface OrderType {
  id: number; 

  _id: string;

  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };

  cartItems: ItemType[]; 

  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };

  paymentMethodType: "cash" | "card" | "online";

  isPaid: boolean;
  isDelivered: boolean;

  createdAt: string;
  updatedAt: string;

  totalOrderPrice: number;
  shippingPrice: number;
  taxPrice: number;
}















