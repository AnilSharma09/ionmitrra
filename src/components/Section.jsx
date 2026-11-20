import { useNavigate } from "react-router-dom";

export default function Section(){         
     const navigate = useNavigate();

     return(
        <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col-reverse items-center gap-10 px-8 py-12 md:flex-row">
           
                <div className="flex w-full flex-col item-center  gap-8 text-center md:w-1/2 md:items-start md:text-left">
                <h1 className="text-4xl font-bold landing-tight md:text-3xl">The Art of Giving, Reimagined.</h1>
                <p className="max-w-md text-grey landing-relaxed">Discover a collection of masterfully curated gifts, designed for those who appreciate the finer details of luxury and elegance.</p>
           

        <button
        onClick={() => navigate("/products")}
        className=" cursor-pointer rounded-lg bg-blue-500 px-2 py-3 text-white font-bold transition hover:bg-blue-700">
            Shop Now

        </button>

        </div>
        
            
           <div className="w-full md:w-1/2">
            <div className="h-[280px] overflow-hidden rounded-2xl sm:h-[360px] md:h-[450px]">
                <img src="/a.webp" alt="image" className="h-full w-full object-cover  transition-transform duration-700 hover:scale-105"
                />
            </div>
            </div>
            
        </section>
     )
}

