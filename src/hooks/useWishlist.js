import { useEffect, useState } from "react";


const WISHLIST_KEY =  "wishlist";

const readWishlist = () => {
    try {
        const data = JSON.parse(localStorage.getItem(WISHLIST_KEY))
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

export default function useWishlist() {
  
  const [ids, setIds] = useState(readWishlist);

  
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
    } catch {}
  }, [ids]);

  
  useEffect(() => {
    const sync = (e) => {
      if (e.key === WISHLIST_KEY) setIds(readWishlist());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const isLiked = (id) => ids.includes(id);

  const toggleLike = (id) =>
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return { ids, isLiked, toggleLike };
}