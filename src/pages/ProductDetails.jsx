import { useParams } from "react-router-dom";

import { useEffect } from "react";
import productData from "../data/productData.json";
import ProductCard from "../components/ProductCard";
import DetailCard from "../components/DetailCard";
import { slugify } from "../utils/Slug";


export default function ProductDetails() {
  const { slug } = useParams(); 

  
  const product = productData.find(
    (p) => slugify(p.name) === slug || String(p.id) === slug
  );

  
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-3">Product not found</h1>
        <Link to="/products" className="text-green-700 font-semibold underline">
          Back to products
        </Link>
      </div>
    );
  }

  const related = productData.filter((p) => p.id !== product.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <DetailCard key={product.id} product={product} />

      {related.length > 0 && (
        <section>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-5">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}