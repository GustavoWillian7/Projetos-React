import axios from 'axios'

//https://pokeapi.co/api/v2/pokemon/${pokemon})

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon/'
})

export default api