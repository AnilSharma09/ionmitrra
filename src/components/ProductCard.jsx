
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext'
import { useWishlistContex } from '../context/WishlistContext';
import { slugify } from '../utils/Slug';



function ProductCard({product}) {
 const {addToCart} = useCartContext();
 const {isLiked, toggleLike} = useWishlistContex();
  
  const {id, image, title, name, price, oldPrice, rating, reviews } = product
  const liked = isLiked(id);
  const link = `/product/${slugify(id)}`;


  const discount = oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0

  return (
   
    <div className="group  w-full bg-white rounded-3xl shadow-md p-3 sm:p-4 flex  flex-col">
      <div className="container ,">
      <div className=" relative rounded-2xl sm:rounded-3xl overflow-hidden h-[180px] sm:h-[240px] md:h-[260px]">
       <Link to={link} className="block w-full h-full"> <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        </Link>

        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-green-100 text-green-600 font-semibold text-xs sm:text-sm px-3 py-1 rounded-full">
            {discount}% off
          </span>
        )}

        <button
         type='button'
          onClick={() => toggleLike(id)}
          aria-pressed={liked}
          className="absolute top-2 right-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100/90 flex items-center justify-center"
          aria-label={liked ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          
           <i
        className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`}
        style={{ fontSize: '1.25rem', color: liked ? 'red' : 'inherit' }}
      ></i>
           
          
         
        </button>
      </div>

      <div className="pt-4 flex flex-col flex-1">
        <Link to={link}>
        <h2 className="font-bold text-[15px] sm:text-[18px] mb-1 truncate text-gray-900">
          {name}
        </h2>
</Link>
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-extrabold text-[18px] sm:text-[22px] text-green-700">
            ₹{price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-[13px] sm:text-sm line-through text-gray-500">
              ₹{oldPrice.toFixed(2)}
            </span>
          )}
        </div>

       <button
  onClick={() => addToCart(product)}
  className="mt-auto w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
  
>
  <i className="bi bi-cart"></i>
  Add to Cart
</button>
      </div>
      </div>
    </div>

    
  )
}

export default ProductCard
