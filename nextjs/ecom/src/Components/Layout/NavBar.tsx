import Image from "next/image"
import logo from "public/logo.webp"
import { TwitterIcon } from "lucide-react"
import { Facebook } from "lucide-react"
import { Linkedin } from "lucide-react"
import IconCard from "../IconCard"

const NavBar = () => {
  return (
    <main className="flex mt-56 justify-evenly">
        {/* First Div */}
        <div className="w-1/4"> 
        <Image className="w-40" src = {logo} alt = {"Logo"} />
        <p className="leading-7 [&:not(:first-child)]:mt-10">Small, artisan label that offers a 
        thoughtfully curated collection of high quality everyday essentials made.
      </p>
      <div className="flex gap-x-4 mt-10">
      <IconCard icon={TwitterIcon}/>
      <IconCard icon={Facebook}/>
      <IconCard icon={Linkedin}/></div>
        </div>

        {/* Second Div */}
        <div>
            <ul className="space-y-4">
                <li className="text-gray-600 font-bold text-xl mb-7">Company</li>
                <li className="text-lg text-gray-500">About</li>
                <li className="text-lg text-gray-500">Terms of Use</li>
                <li className="text-lg text-gray-500">Privacy Policy</li>
                <li className="text-lg text-gray-500">How it Works</li>
                <li className="text-lg text-gray-500">Contact Us</li>
            </ul>
        </div>

        {/* Third Div */}
        <div>
            <ul className="space-y-4">
                <li className="text-gray-600 font-bold text-xl mb-7">Support</li>
                <li className="text-lg text-gray-500">Support Carrer</li>
                <li className="text-lg text-gray-500">24h Service</li>
                <li className="text-lg text-gray-500">Quick Chat</li>
            </ul>
        </div>

        {/* Fourth Div */}
        <div>
            <ul className="space-y-4">
                <li className="text-gray-600 font-bold text-xl mb-7">Contact</li>
                <li className="text-lg text-gray-500">Whatsapp</li>
                <li className="text-lg text-gray-500">Support 24h</li>
            </ul>
        </div>
    </main>
  )
}

export default NavBar