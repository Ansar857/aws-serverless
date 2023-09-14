// "use client";
// import {
//   Box,
//   HStack,
//   Heading,
//   Text,
//   Input,
//   Select,
//   Button,
// } from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import Axios from "axios";
// import Link from "next/link";

// interface resultType {
//   name: string,
//   url: string
// }

// const page = () => {
//   const [searcPokemon, setSearcPokemon] = useState<string>("");
//   // const dataSet = ["charminda", "squirt", "warTortle"];
//   const [dataSet, setDataSet] = useState([]);
//   const [seacrchResult, setSearchResult] = useState<resultType[]>([{
//     name: "",
//     url: ""
//   }]);

//   useEffect(()=>{
//     const searchPokemon = async () => {
//       const response = await Axios.get("https://pokeapi.co/api/v2/pokemon");
//       setDataSet(response.data.results); // dataset of poekmon with array type
//       // dataSet.map((results: any) => {
//       //   console.log(results.name);
//       // });
//     };
//     searchPokemon();
//   },[])

//   const searchabc = () => {
//     const filterPokemon = dataSet.filter((pokemon: any)=>{
//       // console.log(pokemon.name);
//       return pokemon.name === searcPokemon 
//     })
//     setSearchResult(filterPokemon);
//     return filterPokemon;
//   }
//   // filterPokemon()

//   // dataSet ? filterPokemon() : 
//   return (
//     <Box>
//       <Input
//         value={searcPokemon}
//         placeholder="search pokonmon"
//         onChange={(e: any) => {
//           setSearcPokemon(e.target.value);
//         }}
//       />
//     <Link href={`searchlist/${seacrchResult[0].name}`}>
//     <Box   bg={"whiteAlpha.500"} >{seacrchResult.length > 0 ? seacrchResult[0].name : "pokemon not found"}</Box>
//     </Link>

//       <Button
//         onClick={() => {
//           searchabc();
//           // console.log(searchabc())
//           // searchPokemon();
//         }}
//       >
//         seacrch pokemon
//       </Button>
//     </Box>
//   );
// };

// export default page;



const page = () => {

  const fruits = [
    {name:"apple"},
    {name:"mango"},
    {name:"Orange"}
  ]
  return (
    <div>{fruits.map((value: any, id: number)=>{
      return <li>{value.name}</li>
    })} </div>
  )
}

export default page