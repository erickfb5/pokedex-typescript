import  {FC, useState, useEffect } from "react";
import "./App.css";
import { colors } from "./colors";

interface Pokemon {
  name: string;
  id: number;
  types: {
    type: {
      name: string;
    };
  }[];
}

const App: FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const fetchPokemons = async () => {
    const pokemonCount: number = 150;
    for (let i: number = 1; i <= pokemonCount; i++) {
      const pokemon: Pokemon = await getPokemon(i);
      setPokemonList((prevList) => [...prevList, pokemon]);
    }
  };

  const getPokemon = async (id: number): Promise<Pokemon> => {
    const url: string = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res: Response = await fetch(url);
    const data: Pokemon = await res.json();
    return data;
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      <div className="poke-container" id="poke-container">
        {pokemonList.map((pokemon: Pokemon) => {
          const name: string =
            pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
          const id: string = pokemon.id.toString().padStart(3, "0");
          const pokeTypes: string[] = pokemon.types.map(
            (type) => type.type.name
          );
          const type: string | undefined = Object.keys(colors).find(
            (type) => pokeTypes.indexOf(type) > -1
          );
          const color: string | undefined = colors[type as keyof typeof colors];

          return (
            <div
              className="pokemon"
              style={{ backgroundColor: color }}
              key={pokemon.id}
            >
              <div className="img-container">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={name}
                />
              </div>
              <div className="info">
                <span className="number">#{id}</span>
                <h3 className="name">{name}</h3>
                <small className="type">
                  Type: <span>{type}</span>
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
