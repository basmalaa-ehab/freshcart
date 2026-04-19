import { getAllProducts, getSpecificProduct } from "_/api/services/route.services";
import AddToCartButton from "_/app/_components/AddToCartButton/AddToCartButton";
import AddToWishlistButton from "_/app/_components/AddToWishlistButton/AddToWishlistButton";
import MySliders from "_/app/_components/MySliders/MySliders";
import { ProductDetailTabs } from "_/app/_components/ProductDetailTabs/ProductDetailTabs";
import Link from "next/link";
import {
  FaBolt,
  FaRegHeart,
  FaRegStar,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import {
  FaArrowRotateLeft,
  FaRegStarHalfStroke,
  FaTruckFast,
} from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi2";
import { IoIosHeart, IoMdCheckmark } from "react-icons/io";
import { RiShareFill } from "react-icons/ri";
import ProductQuantityUpdate from "../ProductQuantityUpdate";
import { ProductType } from "_/api/services/types";
import RelatedProducts from "_/app/_components/ReRelatedProducts/RelatedProducts";
// rating
const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} />);
  }

  if (hasHalfStar) {
    stars.push(<FaRegStarHalfStroke key="half" />);
  }

  const emptyStars = 5 - stars.length;

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} />);
  }

  return stars;
};


export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;








const productDetails = await getSpecificProduct(id);
  const allProducts = await getAllProducts();
  const relatedProducts = allProducts
    ?.filter(
      (product) =>
        product.category?._id === productDetails?.category?._id && product._id !== id,
    )
    .slice(0, 8);

// discount percentage
function getDiscountPercentage(productDetails: ProductType | undefined) {
  if (!productDetails?.priceAfterDiscount || !productDetails?.price) return 0;

  return Math.round(
    ((productDetails.price - productDetails.priceAfterDiscount) /
      productDetails.price) *
      100,
  );
}






  return (
    <>
      <section className=" product-detail">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-8 ">
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
                <MySliders
                  images={[
                    ...(productDetails?.imageCover
                      ? [productDetails.imageCover]
                      : []),
                    ...(productDetails?.images ?? []),
                  ]}
                />
              </div>
            </div>

            <div className="lg:w-3/4">
              <div className="p-6  bg-white rounded-xl shadow-sm">
                <div className="flex flex-row gap-2">
                  <Link
                    href="/womunfashion"
                    className="bg-green-50 text-green-700 font-medium text-xs px-3 py-1.5 rounded-full hover:bg-green-100 transition"
                  >
                    {productDetails?.category.name}
                  </Link>

                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">
                    defacto
                  </span>
                </div>

                <h2 className="font-bold text-3xl/[30px] text-[#101828] pt-4 pb-3">
                  {" "}
                  {productDetails?.title}
                </h2>

                {/* rating */}
                <div className="flex flex-row items-center pb-4 pt-1">
                  <div className="text-[#FCC800] flex pr-2 gap-[0.75px] text-xl">
                    {productDetails
                      ? renderStars(productDetails.ratingsAverage)
                      : null}{" "}
                  </div>

                  <div className="font-medium text-sm/[16px] text-[#6A7282] pr-0.5">
                    {productDetails?.ratingsAverage}
                  </div>

                  <div className="font-medium text-sm/[16px] text-[#6A7282] gap-2">
                    ({productDetails?.ratingsQuantity} review)
                  </div>
                </div>

                {/*price  */}
                <div className="flex   gap-3 items-center pb-5">
                  <div className="  ">
                    {productDetails?.priceAfterDiscount ? (
                      <div className="gap-[5.5px]">
                        <div className="flex flex-row gap-[7.69px] items-center  ">
                          <span className="   font-bold text-3xl/[28px]  gap-1 flex">
                            {" "}
                            {`${productDetails?.priceAfterDiscount}`} EGP
                          </span>
                          <span className="line-through text-[#6A7282] font-medium text-sm/[20px] gap-1">
                            {`${productDetails?.price}`} <span>EGP</span>{" "}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[#1E2939] font-bold text-3xl/[28px] gap-1 ">
                        {productDetails?.price} EGP
                      </span>
                    )}
                  </div>

                  {productDetails?.priceAfterDiscount ? (
                    <span className="bg-red-500 text-white  text-sm px-1.5 py-1.5 md:px-3 md:py-1 rounded-full font-medium">
                      Save {getDiscountPercentage(productDetails)}%
                    </span>
                  ) : null}

                  {/* 
              <div className=" ">
                <button className="   h-10 w-10 rounded-full flex items-center justify-center transition bg-green-600 text-white hover:bg-green-700 disabled:opacity-70">
                  <FiPlus />
                </button>
              </div> */}
                </div>

                {/* in stock */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    In Stock
                  </span>
                </div>
                <div className="bg-[#F3F4F6] w-[95%] h-px "></div>
                {/* description */}
                <p className="text-[#4A5565] font-medium text-base/[26px] pt-5 pb-6">
                  {productDetails?.description}
                </p>
                {/* quantity button */}

                <div className="cursor-pointer quanity pb-6">
                  <span className="text-[#364153] text-sm/[20px] font-medium block pb-2">
                    Quantity
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center ">
                      {productDetails && (
                        <ProductQuantityUpdate
                          id={productDetails._id}
                          unitPrice={productDetails.price}
                          discountedPrice={productDetails.priceAfterDiscount}
                        />
                      )}
                    </div>

                    <span className="text-sm text-[#6A7282] font-medium   ">
                      220 available
                    </span>
                  </div>
                </div>

                {/* buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
                  {/* add to cart button  */}
                  {/* <div className="cursor-pointer flex-1 text-white  px-6 rounded-xl font-medium hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 bg-green-600"> */}
                  <AddToCartButton
                    id={productDetails?._id!}
                    className="flex-1 text-white py-3.5 w-full md:w-0 px-6 rounded-xl font-medium hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 bg-green-600"
                    afterAddContent={
                      <div className="flex items-center gap-2">
                        <IoMdCheckmark />
                        <span>Added to Cart</span>
                      </div>
                    }
                  >
                    <>
                      <HiShoppingCart />
                      Add to Cart
                    </>
                  </AddToCartButton>{" "}
                  {/* </div> */}
                  {/* <AddToCartButton id={productDetails?._id!} /> */}
                  {/* buy now button */}
                  <button  className="flex-1 bg-gray-900 w-full md:w-0 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <FaBolt />
                    Buy Now{" "}
                  </button>
                </div>

                {/* add to wishlist */}

                <div className="flex gap-3 mb-6">
                  <AddToWishlistButton
                    id={productDetails?._id!}
                    className="cursor-pointer flex-1   px-4 rounded-xl font-medium transition flex items-center justify-center gap-2  text-gray-700 hover:border-green-300 hover:text-green-600"
                    afterAddContent={
                      <span className="flex-1 border-2 py-4 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-red-200 text-red-600 bg-red-50">
                        <IoIosHeart />
                        In Wishlist
                      </span>
                    }
                  >
                    <div className="border-2 px-4 py-4 cursor-pointer flex-1  rounded-xl font-medium transition flex items-center justify-center gap-2  text-gray-700 hover:border-green-300 hover:text-green-600">
                      <FaRegHeart />
                      Add to Wishlist
                    </div>
                  </AddToWishlistButton>

                  <button className="cursor-pointer border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-green-300 hover:text-green-600 transition">
                    <RiShareFill />
                  </button>
                </div>

                {/* shipping info  */}
                <div className="pt-6 border-t border-gray-100  px-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                        <FaTruckFast />
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Free Delivery
                        </h4>
                        <p className="text-xs/[16px] font-medium  text-[#6A7282]">
                          Orders over $50
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                        <FaArrowRotateLeft />
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          30 Days Return
                        </h4>
                        <p className="text-xs/[16px] font-medium  text-[#6A7282]">
                          Money back
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                        <FaShieldAlt />
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Secure Payment
                        </h4>
                        <p className="text-xs/[16px] font-medium  text-[#6A7282]">
                          100% Protected
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-details-tabs pt-14 px-4">
        <div className="container mx-auto  bg-white rounded-lg shadow-sm  overflow-hidden">
          <ProductDetailTabs productDetails={productDetails} />
        </div>
      </section>






<section className="similar-products py-10">
  <div className="container  mx-auto px-4">
    <RelatedProducts relatedProducts={relatedProducts ?? []} />
  </div>
</section>












    </>
  );
}
