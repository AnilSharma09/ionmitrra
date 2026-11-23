import { Link } from "react-router-dom";
import Section from "../components/Section";
import ProductCard from "../components/ProductCard";
import productData from "../data/productData.json";

export default function Home() {
  
  const featured = productData.slice(0, 4);

  return (
    <div>
      <Section />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Featured Perfumes
          </h2>
          <Link
            to="/products"
            className="text-sm sm:text-base font-semibold text-green-700 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}