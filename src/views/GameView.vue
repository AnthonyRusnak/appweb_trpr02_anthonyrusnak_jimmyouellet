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
import EnemyUI from '../components/game/stats/EnemyUI.vue'
import PlayerUI from '../components/game/stats/PlayerUI.vue'
import { ActionType } from '../scripts/enums'
import { DEFAULT_PLAYER_EXPERIENCE, DEFAULT_PLAYER_HEALTH, DEFAULT_PLAYER_STRENGTH, PLAYER_HEAL_AMOUNT, PLAYER_HEAL_COST_PER_AMOUNT, PLAYER_SUMMON_COST } from '@/scripts/consts'
import { handleAttack, handleHealthAjustment } from '../scripts/utils/gameUtils'

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

function act(action: ActionType): void {
  playerAct(action)
  enemyAct()
  undeadsAct()
}

function playerAct(action: ActionType): void {
  playerIsBlocking = false
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
}

function attack(): void {
  const damage = handleAttack(player.value.experience, player.value.strength)
  if (damage === 0) {
    gameLog.value.push(`Votre attaque a raté.`)
  }else{
    currentEnemyHealth.value -= damage
    handleHealthAjustment(currentEnemyHealth)
    gameLog.value.push(`Vous lancez des flammes nécrotiques pour ${damage} points de dégâts.`)
  }
}
function defend(): void {
  playerIsBlocking = true
  gameLog.value.push(`Vous formez un voile nécrotique autour de vous.`)
}
function heal(): void{
  const preHealHealth: number = playerHealth.value;
  let healCost: number = 0

  while (player.value.lifeForce >= PLAYER_HEAL_COST_PER_AMOUNT && playerHealth.value < player.value.vitality) {
    player.value.lifeForce -= PLAYER_HEAL_COST_PER_AMOUNT
    playerHealth.value += PLAYER_HEAL_AMOUNT
    healCost += PLAYER_HEAL_COST_PER_AMOUNT
  }
  if (playerHealth.value >= player.value.vitality) {
    playerHealth.value = player.value.vitality
  }

  let healAmount: number = playerHealth.value - preHealHealth
  gameLog.value.push(`Vous abosrbez ${healCost} points de force vitale pour vous soigner de ${healAmount} points de vie.`)
}
function summon(): void {
  player.value.lifeForce -= PLAYER_SUMMON_COST
  let newMinion: Undead = undeads.value[Math.floor(Math.random() * undeads.value.length)]
  playerMinions.value.push(newMinion)
  gameLog.value.push(`Vous réanimez un(e) ${newMinion.type} pour servir votre cause.`)
}
function flee(): void{
  gameLog.value.push(`${player.value.name} fuit le combat.`)
}

function enemyAct(): void {
  if (currentEnemyHealth.value <= 0) {
    gameLog.value.push(`${currentEnemy.value.name} est vaincu!`)
    currentEnemy.value = enemies.value[Math.floor(Math.random() * enemies.value.length)]
    currentEnemyHealth.value = currentEnemy.value.vitality
  } else {
    let damage = handleAttack(currentEnemy.value.experience, currentEnemy.value.strength)
    if (playerIsBlocking) {
      damage = Math.floor(damage / 2)
    }
    playerHealth.value -= damage
    gameLog.value.push(`${currentEnemy.value.name} attaque ${player.value.name} pour ${damage} points de dégâts.`)
  }
}
function undeadsAct(): void {
  playerMinions.value.forEach(minion => {
    let damage = handleAttack(minion.experience, minion.strength)
    if (damage === 0) {
      gameLog.value.push(`${minion.type} rate son attaque.`)
    } else {
      currentEnemyHealth.value -= damage
      gameLog.value.push(`${minion.type} attaque pour ${damage} points de dégâts.`)
    }
  })
}

function getNewEnemy(): void {
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
          <EnemyUI :enemy="currentEnemy" :enemyCurrentHealth="currentEnemyHealth"/>
        </div>
      </div>
      <ActionPanel :playerHealth="playerHealth" :playerLifeForce="player.lifeForce" @playerAct="act" />
    </div>
  </template>
  <Loading :active="isLoading" />
</template>

<style scoped>
</style>