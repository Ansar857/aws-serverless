import PokeCard from "@/components/PokeCard"
import Axios from "axios";
import Link from "next/link";
import Image  from "next/image";



export default async function page({params}: {
    params: { search: string },
}) {
    const response = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${params.search}`);
     
    //   console.log(response.data.types.map((type:string) => type.type.name).join(", "))
    
    
      return (
        <main className="flex flex-col justify-center items-center gap-y-4">
        
        <div className=" bg-purple-100 flex flex-col items-center gap-y-4 py-10 w-1/6 rounded-lg shadow-lg">
        <Image className="rounded-full w-auto " src={response.data.sprites['front_default']} alt="Bulbasaur" height={200} width={200}  />
      <h1 className="text-black  bg-slate-200 px-3 py-1 w-min rounded-xl">#001</h1>
      <h2 className="font-bold  text-black text-lg">{response.data.name}</h2>
      <p className="">Type:{response.data.types.map((type:string) => type.type.name).join(", ") }</p>
      </div> 
           

        <Link className="bg-purple-200 space-y-8 rounded-full hover:bg-purple-300 py-2 w-1/6 text-center font-bold text-3xl text-slate-700" href="/">Back</Link>
        </main>
      )
    }

    