import ProductCard from "@/Components/ProductCard"
import dress from "public/dress.png"
import pant from "/public/pant.png"
import shirt from "/public/shirt.png"


const Productlist = () => {
  return (
    <main>
        {/* Promotions */}
    <div className="mt-56 space-y-3 text-center mb-10">
    <h1 className=" text-blue-700 font-bold font-sans">PROMOTIONS</h1>
    <h2 className="  text-4xl font-bold">Our Promotions Events</h2></div>
    
    <div className="flex justify-evenly  gap-x-12 "> 
    <ProductCard title="Cameryn Sash Tie Dress" price ={400} img = {dress} />
    <ProductCard title="Brushed Raglan Sweatshirt" price ={700} img = {shirt} />
    <ProductCard title="Flex Sweatpant" price ={800} img = {pant} />
         </div>
         </main>
  )
}

export default Productlist