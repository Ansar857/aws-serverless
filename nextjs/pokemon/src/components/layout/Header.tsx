"use client";
import {
  Box,
  HStack,
  Heading,
  Text,
  Input,
  Select,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Link from "next/link";
import { SearchIcon } from '@chakra-ui/icons'
import logo from "public/logo.webp"
import Image from "next/image";


interface resultType {
  name: string,
  url: string
}

const page = () => {
  const [searcPokemon, setSearcPokemon] = useState<string>("");
  // const dataSet = ["charminda", "squirt", "warTortle"];
  const [dataSet, setDataSet] = useState([]);
  const [seacrchResult, setSearchResult] = useState<resultType[]>([{
    name: "",
    url: ""
  }]);
  
  useEffect(()=>{
    const searchPokemon = async () => {
      const response = await Axios.get("https://pokeapi.co/api/v2/pokemon");
      setDataSet(response.data.results); // dataset of poekmon with array type
      // dataSet.map((results: any) => {
      //   console.log(results.name);
      // });
    };
    searchPokemon();
  },[])
  
  const searchabc = () => {
    const filterPokemon = dataSet.filter((pokemon: any)=>{
      // console.log(pokemon.name);
      return pokemon.name === searcPokemon 
    })
    setSearchResult(filterPokemon);
    return filterPokemon;
  }
  // filterPokemon()
  
  // dataSet ? filterPokemon() : 
  return (

  <Flex borderRadius={"10px"}  justify={"space-around"}  m={"36"} backgroundColor={"#c0ff75"}>
<Box marginTop={'10'}> 
  <Image src={logo} alt="logo" width={150} />
</Box>

    <Box marginTop={'20'}>
    
      <Input backgroundColor={"#DCFCE7"} borderRadius={"10px"} p="4" borderColor="#3D5B9E"  borderWidth="2px"  
        value={searcPokemon }
        placeholder="search pokemon"

        onChange={(e: any) => {
          setSearcPokemon(e.target.value)
          
        }}
      />
     
      
      <Button marginX={"-30"} paddingX={"5"} color={"#3D5B9E"} 
        onClick={() => {
          searcPokemon ? searchabc() : alert("Search Bar is empty")
          
          // console.log(searchabc())
          // searchPokemon();
        }}
      ><SearchIcon/>
      </Button>
      
    <Link  href={`searchlist/${seacrchResult.length > 0 ? seacrchResult[0].name : alert("ponkemon not found")}`}>
    <Box p={"12"} marginX={"-9"} onClick={()=>{
      setSearcPokemon("")
      setSearchResult([{name: "", url: ""}])
    }}>{seacrchResult.length > 0 ? seacrchResult[0].name : "pokemon not found" }</Box>
    </Link>

    </Box>

      </Flex>
  );
};

export default page;
