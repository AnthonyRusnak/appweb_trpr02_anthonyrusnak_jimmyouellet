<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import Loading from 'vue-loading-overlay'
import { gameService } from '../services/gameService'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import type Ranking from '../scripts/ranking'

const isLoading: Ref<boolean> = ref(false)
const rankings: Ref<Ranking[]>  = ref([])

onMounted(async () => {
  isLoading.value = true

  try 
  {
    rankings.value = await gameService.getRankings()
    rankings.value = rankings.value.sort((a, b) => b.score - a.score)
  } 
  catch (error) 
  {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Est-ce que vous avez démarré le backend localement ?`,
      { duration: 6000 }
    )
  } 
  finally 
  {
    isLoading.value = false
  }
})
</script>
<template>
  <div class="container">
    <h1 class="text-center outlined display-2 p-2">Tableau des scores</h1>
    <div class="table-responsive">
      <table class="table table-dark border-success w-75 mx-auto">
        <thead>
          <tr>
            <th scope="col" style="width: 10%">#</th>
            <th scope="col" style="width: 75%;">Nom</th>
            <th scope="col" style="width: 15%;">Force Vitale</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ranking in rankings">
            <th scope="row">{{ rankings.indexOf(ranking) + 1 }}</th>
            <td>{{ ranking.name }}</td>
            <td>{{ ranking.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <Loading :active="isLoading" />
</template>
<style scoped>
h1{
    font-weight: 900;
}
td, th {
  border-width:0.3rem;
}
</style>
