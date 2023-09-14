import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import {ShoppingCart} from "lucide-react"
import Image from "next/image"
import heroimage from "public/hero-image.webp"
import Featured1 from "public/Featured1.webp"
import Feature2 from "public/Featured2.webp"
import Featured3 from "public/Featured3.webp"
import Featured4 from "public/Featured4.webp"

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row gap-y-16 py-10">
        {/* Right div */}
        <div className="flex-1 mt-14"> 
        <Badge className="bg-blue-100 text-blue-700 font-bold py-1 px-5 text-lg rounded-md">Sale 70%</Badge>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-6">
        An Industrial Take on Streetwear
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
      Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.</p>
      <Button className=" mt-6 text-lg font-semibold gap-x-2 h-16 px-6"><ShoppingCart/> Start Shopping</Button>
      <ul className="flex mt-24 gap-x-16">
        <li><Image src={Featured1} alt="logo" /></li>
        <li><Image src={Feature2} alt="logo"/></li>
        <li><Image src={Featured3} alt="logo"/></li>
        <li><Image src={Featured4} alt="logo"/></li>
      </ul>

    </div>

        {/* Left div */}
        <div className="flex-1">
        <Image src={heroimage} alt={"Hero"} />
        </div>
    </section>
  )
}

export default Hero