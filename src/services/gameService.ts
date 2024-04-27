import axios from 'axios'
import { type Character } from '../scripts/interfaces'
import { type Undead } from '../scripts/interfaces'
import { type Ranking } from '../scripts/interfaces'
import { type Title } from '../scripts/interfaces'

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

async function getNextRankingId(): Promise<number> {
  const { data } = await axios.get(`${API_URL}/ranking`)
  return data.length + 1
}

async function addRanking(ranking : Ranking) {
  await axios.post(`${API_URL}/ranking`, ranking)
}

export const gameService = {
  getTitles,
  getTitleById,
  getRankings,
  getCharacters,
  getUndeads,
  getNextRankingId,
  addRanking
}