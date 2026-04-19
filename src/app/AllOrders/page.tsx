import { GetUserOrders } from "_/api/services/route.services";
import { OrderType } from "_/api/services/types";
import OrderCard from "_/app/_components/OrderCard";
import Link from "next/link";
import { FaBagShopping } from "react-icons/fa6";
import { PiBoxArrowDownFill } from "react-icons/pi";

// Force dynamic rendering because we use cookies for authentication
export const dynamic = 'force-dynamic';

export const metadata = {
  title: {
    default: "All Orders",
  },
};
export default async function AllOrders() {
  const myorder = (await GetUserOrders()) as OrderType[];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-green-600 transition">
            {" "}
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">My Orders</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
              <PiBoxArrowDownFill className="text-2xl text-white" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Orders
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                Track and manage your {myorder.length} orders
              </p>
            </div>
          </div>
          <div className="self-start sm:self-auto text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 transition-all text-sm">
            <FaBagShopping />
            Continue Shopping
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {myorder.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>{" "}
    </div>
  );
}
