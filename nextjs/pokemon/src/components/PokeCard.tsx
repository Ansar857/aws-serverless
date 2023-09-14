import Image, { StaticImageData } from "next/image"


const PokeCard = (props:{serial:string,name:string,type:string,img:string}) => {
  return (
    <div className="ml-4 hover:scale-110 duration-500 bg-green-100 flex flex-col items-center gap-y-4 py-10 w-1/6 rounded-lg shadow-lg">
        <Image className="rounded-full w-auto " src={props.img} alt="Bulbasaur" height={200} width={200}  />
      <h1 className="text-black  bg-slate-200 px-3 py-1 w-min rounded-xl">{props.serial}</h1>
      <h2 className="font-bold  text-black text-lg">{props.name}</h2>
      <p className="">Type:{props.type}</p>
      </div>
  )
}

export default PokeCard