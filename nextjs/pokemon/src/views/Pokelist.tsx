'use client'
import React, { useState, useEffect } from 'react';
import PokeCard from '@/components/PokeCard';



interface Pokemon {
  id: number;
  sprites: { front_default: string };
  name: string;
  types: { type: { name: string } }[];
}

const Pokelist: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [abc, setAbc] = useState();

  useEffect(() => {
    async function fetchData() {
      const allPokemonData: Pokemon[] = [];
      for (let i = 1; i <= 50; i++) { // Fetching data for the first 10 Pokémon, you can adjust this range
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          const data: Pokemon = await res.json();
          allPokemonData.push(data);
        } catch (error) {
          console.error(error);
        }
      }
      setPokemonList(allPokemonData);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <section className="flex flex-wrap gap-8">
      {loading ? (
        <p>Loading...</p>
      ) : (
        pokemonList.map((data) => (
          <PokeCard
            key={data.id}
            img={data.sprites['front_default']}
            serial={`#${data.id.toString().padStart(3, '0')}`}
            name={data.name}
            type={data.types.map((type) => type.type.name).join(', ')}
          />
        ))
      )}
    </section>
  );
};

export default Pokelist;
