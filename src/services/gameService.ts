import axios from 'axios'
import type Character from '../scripts/interfaces'
import type Undead from '../scripts/interfaces'
import type Ranking from '../scripts/interfaces'
import type Title from '../scripts/interfaces'
// import { API } from '@/shared/config'

// Note sur le gestion des erreurs:
// - Dans ce projet, la gestion des erreurs (try/catch) est gérée par le code qui utilise ce service.
// - Dans un contexte d'entreprise, il serait utile de loguer les erreurs qui surviennent dans ce service et ensuite de les relancer en précisant le contexte de l'erreur.

const API_URL = 'http://127.0.0.1:3000'

async function getTitles(): Promise<Title[]> {
  const { data } = await axios.get(`${API_URL}/titles`)
  return data
}

async function getTitleById(id : number): Promise<Title> {
  const { data } = await axios.get(`${API_URL}/titles/${id}`)
  return data
}

async function getRankings(): Promise<Ranking[]> {
  const { data } = await axios.get(`${API_URL}/ranking`)
  return data
}

async function getCharacters(): Promise<Character[]> {
  const { data } = await axios.get(`${API_URL}/characters`)
  return data
}

async function getUndeads(): Promise<Undead[]> {
  const { data } = await axios.get(`${API_URL}/undeads`)
  return data
}

async function updateRanking(character : Character) {
  await axios.put(`${API_URL}/posts/${character.id}`, character)
}

export const gameService = {
  getTitles,
  getTitleById,
  getRankings,
  getCharacters,
  getUndeads,
  updateRanking
}