import { getReviewsForProduct } from "_/api/services/route.services";
import { ProductType } from "_/api/services/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "_/components/ui/tabs";
import { BsBox2Fill } from "react-icons/bs";
import { FaRegStar, FaShieldAlt, FaStar, FaTruck } from "react-icons/fa";
import { FaArrowRotateLeft, FaRegStarHalfStroke } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
type ProductCrtProps = {
  productDetails: ProductType | undefined;
};
export async function ProductDetailTabs({ productDetails }: ProductCrtProps) {
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

  const reviews: Array<{ rating: number }> =
    (await getReviewsForProduct(productDetails?.id || "")) || [];

  const ratings = [5, 4, 3, 2, 1].map((star) => ({
    stars: star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const total = reviews.length;

  const percentage = ((productDetails?.count ?? 0) / total) * 100;

  return (
    <Tabs defaultValue="productdetails" className="bg-white ">
      <div className="overflow-x-auto scrollbar-hide overflow-y-hidden">
        <TabsList className="flex py-6.75 bg-white  min-w-max">
          <TabsTrigger
            className="shrink-0 cursor-pointer data-[state=active]:text-green-500 text-[#4A5565] data-[state=active]:border-b-green-500 border-b-6 flex items-center gap-2 px-6 py-6.75 font-medium whitespace-nowrap hover:text-green-600! hover:bg-gray-50 transition-all duration-200"
            value="productdetails"
          >
            <span className="text-sm">
              <BsBox2Fill />
            </span>
            <span>Product Details</span>
          </TabsTrigger>

          <TabsTrigger
            className="cursor-pointer data-[state=active]:text-green-500 text-[#4A5565] data-[state=active]:border-b-green-500 border-b-6 flex items-center gap-2 px-6 py-6.75 font-medium whitespace-nowrap hover:text-green-600! hover:bg-gray-50 transition-all duration-200"
            value="reviews"
          >
            <FaStar />
            Reviews ({productDetails?.ratingsQuantity})
          </TabsTrigger>

          <TabsTrigger
            className="cursor-pointer data-[state=active]:text-green-500 text-[#4A5565] data-[state=active]:border-b-green-500 border-b-6 flex items-center gap-2 px-6 py-6.75 font-medium whitespace-nowrap hover:text-green-600! hover:bg-gray-50 transition-all duration-200"
            value="Shipping"
          >
            <FaTruck />
            Shipping & Returns
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="productdetails" className="p-6">
        <div className="">
          <h3 className="font-semibold text-[#101828] text-lg/[28px] ">
            About this Product
          </h3>

          <p className="font-medium text-[#4A5565] text-base/[26px] pt-3 pb-6 ">
            Material Polyester Blend Colour Name Multicolour Department Women
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
            <div className="bg-[#F9FAFB] rounded-[8px]  p-3">
              <h4 className="font-medium text-[#101828] text-base/[24px] px-4">
                Product Information
              </h4>
              <ul className="pt-3 px-4">
                <li className="flex justify-between  text-sm py-1">
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Category
                  </span>
                  <span className="text-[#101828] font-medium">
                    {productDetails?.category.name}
                  </span>
                </li>

                <li className="flex justify-between text-sm py-1">
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Subcategory
                  </span>
                  <span className="text-[#101828] font-medium">
                    {productDetails?.subcategory.map((sub) => sub.name)}
                  </span>
                </li>

                <li className="flex justify-between text-sm py-1 ">
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Brand
                  </span>
                  <span className="text-[#101828] font-medium">
                    {productDetails?.brand.name}
                  </span>
                </li>

                <li className="flex justify-between items-center gap-2 lg:gap-0 text-sm py-1">
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Items Sold
                  </span>
                  <span className="text-[#101828] font-medium text-wrap lg:text-nowrap">
                    <span>{productDetails?.ratingsQuantity ?? 0}+ sold</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-[#F9FAFB] rounded-[8px] p-3 ">
              <h4 className="font-medium text-[#101828] text-base/[24px] px-4">
                Key Features{" "}
              </h4>
              <ul className="pt-3  ">
                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Premium Quality Product{" "}
                  </span>
                </li>

                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    100% Authentic Guarantee
                  </span>
                </li>

                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Fast & Secure Packaging
                  </span>
                </li>

                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Quality Tested
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>




      </TabsContent>




      <TabsContent value="reviews">
        <div className="p-6">
          {" "}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {" "}
                  {productDetails?.ratingsAverage?.toFixed(1) || 0}
                </div>
                <div className="flex flex-row items-center pb-4 pt-1">
                  <div className="text-[#FCC800] flex pr-2 gap-[0.75px] text-xl">
                    {productDetails
                      ? renderStars(productDetails.ratingsAverage)
                      : null}{" "}
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  Based on {productDetails?.ratingsQuantity} reviews
                </p>
              </div>

              <div className="flex-1 w-full">
                {ratings.map((item) => {
                  const percentage = total ? (item.count / total) * 100 : 0;

                  return (
                    <div key={item.stars} className="flex items-center  mb-7">
                      {/* النجوم */}
                      <span className="text-sm text-gray-600 w-8 flex items-center gap-1">
                        {item.stars}
                        <FaStar className="text-yellow-400" />
                      </span>

                      {/* البار */}
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      {/* العدد */}
                      <span className="w-10 text-sm text-gray-500 text-right">
                        {item.count}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <div className="text-center py-8">
              <span  className="text-gray-300 mb-3 text-4xl flex justify-center! items-center!"><FaStar/></span>
              <p className="text-gray-400 font-medium">Customer reviews will be displayed here.</p>
              <button className="mt-4 text-green-600 hover:text-green-700 font-medium">
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="Shipping" className="p-6">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6  ">
              <div className="flex items-center px-2">
                <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                  <FaTruck />
                </div>
                <h4 className="font-medium text-[#101828] text-base/[24px] px-4">
                  Shipping Information
                </h4>
              </div>

              <ul className="pt-3  ">
                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Free shipping on orders over $50
                  </span>
                </li>

                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Standard delivery: 3-5 business days
                  </span>
                </li>

                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Express delivery available (1-2 business days)
                  </span>
                </li>

                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Track your order in real-time
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6  ">
              <div className="flex items-center px-2">
                <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                  <FaArrowRotateLeft />
                </div>
                <h4 className="font-medium text-[#101828] text-base/[24px] px-4">
                  Returns & Refunds
                </h4>
              </div>
              <ul className="pt-3  ">
                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    30-day hassle-free returns
                  </span>
                </li>

                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Full refund or exchange available
                  </span>
                </li>

                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Free return shipping on defective items
                  </span>
                </li>

                <li className=" flex flex-row gap-1  text-sm py-1.75 px-2 ">
                  <span className="text-[#16A34A] text-lg">
                    <IoMdCheckmark />
                  </span>
                  <span className="text-[#6A7282] font-medium  text-sm/[20px]">
                    Easy online return process
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4">
            <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4 pt-6">
              <div className="h-14 w-14 bg-gray-200 text-lg text-gray-600 rounded-full flex items-center justify-center shrink-0">
                <FaShieldAlt />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Buyer Protection Guarantee
                </h4>
                <p className="text-sm text-gray-600">
                  Get a full refund if your order doesn't arrive or isn't as
                  described. We ensure your shopping experience is safe and
                  secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      
    </Tabs>

    
  );
}
