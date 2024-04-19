<script setup lang="ts">
import MainText from '../components/MainText.vue'
import { HOME_MAIN_TEXT } from '../scripts/consts';
</script>

<template>
  <div class="container">
    <MainText :text="HOME_MAIN_TEXT" />
    <div class="mx-auto text-center w-50">
      <div>
        <p class="p-2 border border-success rounded border-4 bg-dark text-light fs-5" style="--bs-bg-opacity: .75;">
          La Necro Gate est la porte menant au passage entre le monde des vivants et celui des morts. Il s'agit d'un endroit froid et sinistre 
          où aucun être doté de bon sens ne voudrait se retrouver. Depuis des lustres, en raison de leurs liens avec la magie des morts, 
          des nécromanciens déchus parviennent à entrer dans la Necro Gate dans l'espoir de franchir le passage des âmes et de revenir parmi les 
          vivants. Pour stopper ce flux d'êtres revenant d'entre les morts, de nombreux paladins, prêtres et mages blancs gardent le passage 
          jonché des dépouilles nécrotiques des nécromanciens assez fous pour défier l'ordre sacré. Vous êtes l'un de ces nécromanciens, 
          votre âme a trouvé son chemin jusqu'à l'entrée de la porte et brille d'un désir unique : revivre. Oserez-vous passer la porte?
        </p>
      </div>

      <router-link to="/character">
        <button class="btn btn-dark btn-lg border border-success border-4">
          Entrer
        </button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
</style>
