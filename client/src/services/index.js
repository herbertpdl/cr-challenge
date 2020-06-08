import axios from 'axios'

export function getProducts() {
  return axios.get('http://localhost:3001/products')
    .then(resp => resp.data)
}