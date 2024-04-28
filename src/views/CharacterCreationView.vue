<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import Loading from 'vue-loading-overlay'
import { useRouter } from 'vue-router'
import { gameService } from '../services/gameService'
import 'vue-loading-overlay/dist/css/index.css'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { type Title } from '../scripts/interfaces'
import { isStringEmpty } from '@/scripts/utils/validationUtils'
import MainText from '../components/MainText.vue'
import { CHARACTER_CREATION_MAIN_TEXT, PLAYER_NAME_MAX_LENGTH } from '../scripts/consts'

const router = useRouter()

const titles: Ref<Title[]> = ref([] as Title[])
const isLoading: Ref<boolean> = ref(false)
const playerName: Ref<string> = ref('')
const playerTitleId: Ref<string> = ref("0")

function isFormInvalid(): boolean {
  return isStringEmpty(playerName.value) || playerTitleId.value === "0" || playerName.value.length > PLAYER_NAME_MAX_LENGTH
}

function submitForm(): void {
  router.push({ name: 'Game', params: { playerName: playerName.value, playerTitleId: playerTitleId.value } })
}

onMounted(async () => {
  isLoading.value = true

  try 
  {
    titles.value = await gameService.getTitles()
  } 
  catch (error) 
  {
    useToast().error(
      `Erreur avec le service: ${(error as Error).message}. Veuillez réessayer plus tard.`,
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
    <div class="mx-auto w-75">
    <MainText :text="CHARACTER_CREATION_MAIN_TEXT" />
      <form>
        <div class="p-2 border border-success rounded border-4 bg-dark fs-5" style="--bs-bg-opacity: .75;">
        <div class="mb-2">
          <label for="nameField" class="form-label outlined">Votre Nom</label>
          <input type="text" class="form-control bg-dark border-success border-4 text-white" v-model="playerName" id="nameField" required>
        </div>
        <div class="mb-2">
          <label for="titleField" class="form-label outlined">Votre Titre</label>
          <select class="form-select bg-dark text-white border-success border-4" v-model="playerTitleId" id="titleField" required>
            <option value="0" disabled selected>Choisissez un titre</option>
            <option v-for="title in titles" :value="title.id">{{ title.name }}</option>
          </select>
        </div>
      </div>
      <div class="p-4 text-center">
          <button type="button" :disabled="isFormInvalid()" v-on:click="submitForm()" class="btn btn-dark btn-lg border border-success border-4">Démarrer</button>
      </div>
      </form>
    <Loading :active="isLoading" />
    </div>
  </div>
</template>

<style scoped>
.form-label{
    font-weight: 700;
    font-size: 2rem;
}
</style>