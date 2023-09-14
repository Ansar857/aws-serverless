import {Button} from "@/Components/ui/button"
import {Input} from "@/Components/ui/input"
const Subscriber = () => {
  return (
    <div className="flex relative mt-56 items-center flex-col">
        <h2 className="  text-4xl font-bold">Subscribe Our Newsletter</h2>
     <p className="leading-7  text-lg [&:not(:first-child)]:mt-6 text-slate-800">
     Get the latest information and promo offers directly
      </p>
      <div className="flex mt-8 w-full max-w-lg items-center space-x-2">
      <Input type="email" placeholder="Input email address" />
      <Button className="rounded-sm w-44">Get Started</Button>
    </div>
      <span className=" absolute text-9xl font-bold text-gray-100 self-center -z-10">Newsletter</span>
      </div>
  )
}

export default Subscriber