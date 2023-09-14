import InforCard from "@/Components/InforCard"
import Image from "next/image"
import feature from "public/feature.webp"
import { Button } from "@/Components/ui/button"


const Information = () => {
  return (
    <section className="flex flex-col xl:flex-row mt-56 items-center">
        {/* Right Div */}
        <div className="flex xl:w-1/2 w-full relative ">
            <div className="space-y-10"><InforCard heading="Using Good Quality Materials" para="Lorem ipsum dolor sit amt, 
            consectetur adipiscing elit."/>
            <InforCard heading="Modern Fashion Design" para="Lorem ipsum dolor sit amt, 
            consectetur adipiscing elit."/></div>
            <div className="space-y-10"><InforCard heading="100% Handmade Products" para="Lorem ipsum dolor sit amt, 
            consectetur adipiscing elit."/>
            <InforCard heading="Discount for Bulk Orders" para="Lorem ipsum dolor sit amt, 
            consectetur adipiscing elit."/></div>
            <span className="mt-28 absolute text-9xl font-bold text-gray-100 self-center -z-10">Different From Others</span>
        </div>


    {/* Left Div */}
    <div className="flex-1 xl:w-1/2 w-full mt-8 ">
         <h1 className="px-20 mb-16 tracking-widest scroll-m-20 text-5xl font-extrabold  lg:text-5xl">
         Unique and Authentic Vintage Designer Jewellery
      </h1>
      <div className="flex mt-4 items-center"><Image src={feature} alt={"feature"} />

      <div className="flex flex-col ml-8  ">
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-slate-800">
      This piece is ethically crafted in our small family-owned workshop in Peru with unmatched attention to detail and care. The Natural color is the actual natural color of the fiber, undyed and 100% traceable.
      </p><Button className=" mt-6 text-1xl font-semibold w-40 h-12">See All Products</Button></div>
      
    </div>
      
    </div>
    
    </section>
  )
}

export default Information