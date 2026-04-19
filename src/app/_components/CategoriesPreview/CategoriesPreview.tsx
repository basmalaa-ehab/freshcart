import { getAllCategories } from "_/api/services/route.services";
import Link from "next/link";

export default async function () {
  const allCategories = await getAllCategories();

  return (
    <section className="CategoriesPreview py-10">
      <div className="container mx-auto px-4">


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allCategories?.map(category =>     <Link key={category._id}
            href={""}
            className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
          >
            <div className="h-20 w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition">
              <img src={category.image} className="w-full h-full object-cover" alt={category.name} />
            </div>
            <h3 className="font-medium text-[#364153]">{category.name}</h3>
          </Link> )}

      
        </div>
      </div>
    </section>
  );
}
