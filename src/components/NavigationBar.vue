<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <h1 class="text-success ps-3">
        Necro Gate | 
      </h1>
      <ul class="navbar-nav mr-auto ps-1">
        <li class="nav-item">
          <RouterLink class="nav-link text-success" id="home" to="/">Accueil</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link text-success" id="score" :to="{ name: 'Scores' }">Tableau des scores</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>