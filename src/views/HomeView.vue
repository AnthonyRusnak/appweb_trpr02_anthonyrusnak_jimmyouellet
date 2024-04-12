<script setup lang="ts">
import 'vue-loading-overlay/dist/css/index.css'
import 'vue-toast-notification/dist/theme-sugar.css'

</script>

<template>
  <div class="container" id="homeDiv">
    <div class="mx-auto text-center w-50">
      <h1 class="p-2 font-weight-bold">
        Necro Gate
      </h1>
      <div>
        <p class="p-2 border border-success rounded border-5 bg-dark text-light" style="--bs-bg-opacity: .5;">
          La Necro Gate est le passage entre le monde des vivants et celui des morts. Il s'agit d'un endroit froid et sinistre 
          où aucun être doté de bon sens ne voudrait se retrouver. Depuis des lustres, en raison de leurs liens avec la magie des morts, 
          des nécromanciens parviennent à entrer dans la Necro Gate dans l'espoir de franchir le passage des âmes et de revenir parmi les 
          vivants. Pour stopper ce flux d'êtres revenant d'entre les morts, de nombreux paladins, prêtres et mages blancs gardent le passage 
          jonché des dépouilles nécrotiques des nécromanciens assez fous pour défier l'ordre sacré. Vous êtes l'un de ces nécromanciens, 
          votre âme a trouvé son chemin jusqu'à l'entrée de la porte et brille d'un désir unique : revivre. Oserez-vous passer la porte?
        </p>
      </div>

      <router-link to="/character">
        <button class="btn btn-dark btn-lg border border-success border-5">
          Entrer
        </button>
      </router-link>
    </div>
  </div>
</template>

<style>
</style>
