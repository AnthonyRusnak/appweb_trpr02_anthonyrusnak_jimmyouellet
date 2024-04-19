<script setup lang="ts">
import { onMounted, ref, defineProps, type Ref, computed } from 'vue'
import { gameService } from '../services/gameService'
import { useToast } from 'vue-toast-notification'
import type Title from '../scripts/interfaces'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import 'vue-loading-overlay/dist/css/index.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import type Undead from '../scripts/interfaces'
import type Character from '../scripts/interfaces'
import GameLogger from '../components/game/GameLogger.vue'
import ActionPanel from '../components/game/ActionPanel.vue'
import EnemyUI from '../components/game/EnemyUI.vue'
import PlayerUI from '../components/game/PlayerUI.vue'
import { ActionType } from '../scripts/enums'
import { ATTACK_DAMAGE_RANGE, DEFAULT_PLAYER_EXPERIENCE, DEFAULT_PLAYER_HEALTH, DEFAULT_PLAYER_STRENGTH } from '@/scripts/consts'

// Database elements
const undeads: Ref<Undead[]> = ref([])
const enemies: Ref<Character[]> = ref([])

// Player elements
const player: Ref<Character> = ref({} as Character)

const playerHealth: Ref<number> = ref(500)
let playerIsBlocking: boolean = false
const playerMinions: Ref<Undead[]> = ref([])
const playerMinionCount: Ref<number> = computed(() => playerMinions.value.length)

// Enemy elements
const currentEnemy: Ref<Character> = ref({} as Character)
const currentEnemyHealth: Ref<number> = ref(0)

// Game elements
const gameLog: Ref<string[]> = ref([])
const currentFight: Ref<number> = ref(0)
const isLoading: Ref<boolean> = ref(false)

const props = defineProps({
  playerName: String,
  playerTitleId: String,
})

function playerAct(action: ActionType) {
  switch (action) {
    case ActionType.ATTACK:
      attack()
      break
    case ActionType.DEFEND:
      defend()
      break
    case ActionType.HEAL:
      heal()
      break
    case ActionType.SUMMON:
      summon()
      break
    case ActionType.FLEE:
      flee()
      break
    default:
      break
  }
  enemyAct()
}

function attack(): void {
  const damage = handleAttack(player.value.experience, player.value.strength)
  if (damage === 0) {
    gameLog.value.push(`Votre attaque a raté}.`)
  }else{
    currentEnemyHealth.value -= damage
    if (currentEnemyHealth.value <= 0) {
      currentEnemyHealth.value = 0
    } else {
    gameLog.value.push(`Vous attaquez pour ${damage} points de dégâts.`)
    }
  }
}

function handleAttack(experience: number, strength: number): number {
  let hitChance = 20 * experience
  if (Math.floor(Math.random() * 100) < hitChance) {
    return Math.floor(strength * (
      (Math.floor(Math.random() * (ATTACK_DAMAGE_RANGE + 1)) + ATTACK_DAMAGE_RANGE) / 100 // Damage range is between the value of ATTACK_DAMAGE_RANGE to 100%
    ))
  } else {
    return 0
  }
}

function defend() {
  playerIsBlocking = true
  gameLog.value.push(`${player.value.name} se prépare à bloquer les attaques de ${currentEnemy.value.name}.`)
}
function heal() {
  if (player.value.lifeForce > 0) {
    const heal = player.value.strength
    playerHealth.value += heal
    player.value.lifeForce -= heal
    gameLog.value.push(`${player.value.name} se soigne de ${heal} points de vie.`)
  } else {
    gameLog.value.push(`${player.value.name} n'a pas assez de force vitale pour se soigner.`)
  }
}
function summon() {
  if (player.value.lifeForce > 0){
    const minion = undeads.value[Math.floor(Math.random() * undeads.value.length)]
    player.value.lifeForce -= minion.strength
    playerMinions.value.push(minion)
    gameLog.value.push(`${player.value.name} invoque un ${minion.type}.`)
  } else {
    gameLog.value.push(`${player.value.name} n'a pas assez de force vitale pour invoquer un serviteur.`)
  }
}
function flee() {
  gameLog.value.push(`${player.value.name} fuit le combat.`)
}
function enemyAct() {
  if (currentEnemyHealth.value <= 0) {
    gameLog.value.push(`${currentEnemy.value.name} est vaincu!`)
    currentEnemy.value = enemies.value[Math.floor(Math.random() * enemies.value.length)]
    currentEnemyHealth.value = currentEnemy.value.vitality
  } else {
    let damage = handleAttack(currentEnemy.value.experience, currentEnemy.value.strength)
    if (playerIsBlocking) {
      damage = Math.floor(damage / 2)
      playerIsBlocking = false
    }
    playerHealth.value -= damage
    gameLog.value.push(`${currentEnemy.value.name} attaque ${player.value.name} pour ${damage} points de dégâts.`)
  }
}

function getNewEnemy() {
  currentEnemy.value = enemies.value[Math.floor(Math.random() * enemies.value.length)]
  currentEnemyHealth.value = currentEnemy.value.vitality
}

onMounted(async () => {
  isLoading.value = true

  try 
  {
    var playerTitle: Title = await gameService.getTitleById(parseInt(props.playerTitleId?? '0'))
    enemies.value = await gameService.getCharacters()
    undeads.value = await gameService.getUndeads()
    getNewEnemy()

    player.value = {
      id: 0,
      name: props.playerName?? '',
      title: playerTitle.name,
      lifeForce: 100,
      strength: DEFAULT_PLAYER_STRENGTH,
      experience: DEFAULT_PLAYER_EXPERIENCE,
      vitality: DEFAULT_PLAYER_HEALTH
    } as Character
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
  <template v-if="!isLoading">
    <div class="container overflow-hidden text-light">
      <div class="row align-items-start gx-4">
        <div class="col-4">
          <PlayerUI :player="player" :playerCurrentHealth="playerHealth" :playerMinionCount="playerMinionCount" />
        </div>
        <div class="col-4">
          <GameLogger :gameLog="gameLog" :currentFight="currentFight" />
        </div>
        <div class="col-4">
          <EnemyUI :ennemy="currentEnemy" :ennemyCurrentHealth="currentEnemyHealth"/>
        </div>
      </div>
      <ActionPanel @playerAct="playerAct" />
    </div>
  </template>
  <Loading :active="isLoading" />
</template>

<style scoped>
</style>