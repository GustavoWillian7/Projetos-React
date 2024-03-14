import styles from './App.module.css'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react';
import api from './services/api'

function App() {
  const [input, setInput] = useState('')
  const [pokemonInfo, setPokemonInfo] = useState({})
  const [pokemonImage, setPokemonImage] = useState('')

  async function handleSearch() {
    // Se o usuário deixar não passar input
    if (input === '') {
      alert('Escolha algum Pokémon!')
      return
    }

    try {
      // Get na api passando o input com lowercase na primeira letra
      const response = await api.get(`${input.toLowerCase()}`)
      setPokemonInfo(response.data)
      
      // Variável que armazena a sprite do pokemon
      const imageUrl = response.data.sprites.versions['generation-v']['black-white'].animated.front_default;
      setPokemonImage(imageUrl);

      setInput('')
    } catch (error) {
      alert('Erro ao procurar o Pokémon ou ID informado!')
      console.log(`Erro ao procurar o Pokémon ou ID informado!\n${error}`)
      setInput('')
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Poké Finder</h1>

      <div className={styles.containerInput}>
        <input 
          type="text" 
          placeholder='Digite o nome ou número do Pokémon na Pokedex'    
          value={input}
          // Input que sempre que for atualizado, passa o valor atual para o input 
          onChange={(e) => setInput(e.target.value)} 
          // Ao apertar enter, faz o handleSearch
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }} 
        />
        <button className={styles.buttonSearch} onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {Object.keys(pokemonInfo).length > 0 && (
        <>
          <main className={styles.main}>
            <div className={styles.pokemonImageDiv}>
              <img src={pokemonImage} alt="pokemon" className={styles.pokemonImage} />
            </div>
              
            <div className={styles.pokemonInfo}>
              <h2>{pokemonInfo.name && pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1)}</h2>

              <span>Número da Dex: {pokemonInfo.id}</span>
              <span>Peso: {pokemonInfo.weight}kg</span>
              <span>Altura: {pokemonInfo.height}m</span>
              <span>Tipos: {pokemonInfo.types && pokemonInfo.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(' - ')}</span>
              <span>Ability: {pokemonInfo.abilities && pokemonInfo.abilities[0].ability.name.charAt(0).toUpperCase() + pokemonInfo.abilities[0].ability.name.slice(1)}</span>
            </div>
          </main>
        </>
      )}
      
      
    </div>    
  );
}

export default App;
