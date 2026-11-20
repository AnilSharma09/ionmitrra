import { createContext, useContext } from "react";
import useWishlist from "../hooks/useWishlist";


const WishlistContext = createContext(null);

export function WishlistProvider({children}) {
   const wishlist =useWishlist();
   return <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>

}

export function useWishlistContex(){
    const contex = useContext(WishlistContext);
    if (!contex){
        throw new Error ("useWishlistContext must be used inside <WishlistProvider>")

    }
    return contex;

}