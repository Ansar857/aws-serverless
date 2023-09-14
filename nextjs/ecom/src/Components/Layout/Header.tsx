import Image from "next/image"
import logo from "public/logo.webp"
import {ShoppingCart} from "lucide-react"
import Link from "next/link"


const Header = () => {
  return (
    <div className="flex justify-between items-center py-6 px-32 ">
        <Image className="w-40" src = {logo} alt = {"Logo"} />
        <ul className="text-lg font-sans flex gap-x-8">
            <li>Female
            <Link href={"/"}></Link></li>
            <li>Male</li>
            <Link href={"/"}></Link>
            <li>Kids</li>
            <Link href={"/"}></Link>
            <li>All Products</li>
            <Link href={"/"}></Link>
        </ul>

        <div className="h-10 w-10 bg-slate-100 rounded-full flex justify-center items-center ">
            <ShoppingCart/>
        </div>

    </div>
  )
}

export default Header