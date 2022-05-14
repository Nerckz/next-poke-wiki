import { GetStaticProps, NextPage } from 'next';

import { Card, Grid, Row, Text } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces/pokemon-list';
import { pokeApi } from '../api';
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title="Pokémon App">
      {
        <Grid.Container gap={ 2 } justify="flex-start">
          {
            pokemons.map((pokemon) => (
              <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
            ))
          }
        </Grid.Container>
      }
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;