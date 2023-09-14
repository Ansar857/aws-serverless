import Image, { StaticImageData } from "next/image"

const IconCard = (props:{icon:any}) => {
  return (
    <div className="h-12 w-12 bg-gray-200 rounded-xl flex justify-center items-center ">
            <props.icon/>
        </div>
  )
}

export default IconCard