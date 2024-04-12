<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Loading from 'vue-loading-overlay'
import { gameService } from '../services/gameService'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import type Character from '../scripts/character'

const posts = ref([] as Character[])
const isLoading = ref(false)

//onMounted est utilisée pour exécuter du code spécifiquement après que le composant a été monté dans le DOM (Document Object Model).
onMounted(async () => {
  isLoading.value = true

  try 
  {
    posts.value = await gameService.getTitles()
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

<!-- Ce composant est associé à la route "/". Il affiche la liste des publications de l'utilisateur. Lorsque l'utilisateur clique sur l'un des liens "Éditer" associés à une publication, il est redirigé vers la route "/posts/:id" (voir fichier src/router/routes.js). -->
<template>
  <div>
    <h1 class="text-center">
      Necro Gate
    </h1>
    <div>
      description ici :D
    </div>
    <Loading :active="isLoading" />
  </div>
</template>

<style>
</style>
