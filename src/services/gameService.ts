import axios from 'axios'
import type Character from '../scripts/character'
// import { API } from '@/shared/config'

// Note sur le gestion des erreurs:
// - Dans ce projet, la gestion des erreurs (try/catch) est gérée par le code qui utilise ce service.
// - Dans un contexte d'entreprise, il serait utile de loguer les erreurs qui surviennent dans ce service et ensuite de les relancer en précisant le contexte de l'erreur.

const API_URL = 'http://127.0.0.1:3000'

async function getTitles () {
  const { data } = await axios.get(`${API_URL}/titles`)
  return data
}

async function getRankings () {
  const { data } = await axios.get(`${API_URL}/ranking`)
  return data
}

async function updatePost (character : Character) {
  await axios.put(`${API_URL}/posts/${character.id}`, character)
}

export const gameService = {
  getTitles,
  getRankings,
  updatePost
}