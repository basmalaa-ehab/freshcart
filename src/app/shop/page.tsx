import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa";
import ProductCard from "../_components/ProductCard/ProductCard";
import { getAllProducts } from "_/api/services/route.services";
import { ProductType } from '_/api/services/types';

export default async function shop() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen">
      <div className="bg-linear-to-br bg-green-600 to-bg-green-500 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">All Products</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <FaBoxOpen className="text-3xl" />
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Products
              </h3>
              <p className="text-white/80 mt-1">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

<div className="mb-6 text-sm font-medium text-gray-500">
    Showing {products?.length} products

</div>



        {products?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {products.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-slate-500">
            No products available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}
