import { useState } from "react";
import DetailCard from "../components/DetailCard";
import productData from "../data/productData.json"


 function ProductDetails() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = ["all", ...new Set(productData.map((p) => p.category))]

  const filtered = productData.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="flex-1 border rounded p-2 bg-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2 bg-white capitalize"
        >
          {categories.map((cart1, index) => (
            <option key={index} value={cart1}>
              {cart1}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5 lg:gap-6 mb-12">
          {filtered.map((p) => (
            <DetailCard key={p.id} product={p} />
            
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetails