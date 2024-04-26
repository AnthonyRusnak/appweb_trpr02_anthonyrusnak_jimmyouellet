<script setup lang="ts">
import { onMounted, ref, defineProps, type Ref, computed } from 'vue'
import { gameService } from '../services/gameService'
import { useToast } from 'vue-toast-notification'
import { type Title, type Undead, type Character, type PopUpText } from '../scripts/interfaces'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import 'vue-loading-overlay/dist/css/index.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import GameLogger from '../components/game/GameLogger.vue'
import ActionPanel from '../components/game/ActionPanel.vue'
import EnemyUI from '../components/game/stats/EnemyUI.vue'
import PlayerUI from '../components/game/stats/PlayerUI.vue'
import { ActionType, EventType } from '../scripts/enums'
import { DEFAULT_PLAYER_EXPERIENCE, DEFAULT_PLAYER_HEALTH, DEFAULT_PLAYER_LIFE_FORCE, DEFAULT_PLAYER_STRENGTH, ENEMY_COLOR, ENEMY_MINION_KILL_CHANCE, GAME_COLOR, GAME_DELAY, PLAYER_BLOCK_DAMAGE_DIVIDER, PLAYER_COLOR, PLAYER_HEAL_AMOUNT, PLAYER_HEAL_COST_PER_AMOUNT, PLAYER_SUMMON_COST, UNDEAD_COLOR, POP_UP_FLEE, POP_UP_LOSS } from '@/scripts/consts'
import { handleAttack, handleHealthAjustment, isCharacterDead, delay } from '../scripts/utils/gameUtils'
import PopUp from '../components/game/PopUp.vue'

// Database elements
const undeads: Ref<Undead[]> = ref([])
const enemies: Ref<Character[]> = ref([])

// Player elements
const player: Ref<Character> = ref({} as Character)

const playerHealth: Ref<number> = ref(500)
let playerIsBlocking: boolean = false
let playerIsFleeing: boolean = false
const playerMinions: Ref<Undead[]> = ref([])
const playerMinionCount: Ref<number> = computed(() => playerMinions.value.length)

// Enemy elements
const currentEnemy: Ref<Character> = ref({} as Character)
const currentEnemyHealth: Ref<number> = ref(0)
let currentEnemyIsDead: boolean = false

// Game elements
const gameLog: Ref<string[][]> = ref([])
const currentFight: Ref<number> = ref(1)
const isLoading: Ref<boolean> = ref(false)
const isTurnPlaying: Ref<boolean> = ref(false)

// PopUp elements
const isPopUpShowing: Ref<boolean> = ref(false)
const popUpEventType: Ref<string> = ref('')
const popUpButtonAction: Ref<Function> = ref(() => {})
const currentPopUpText: Ref<PopUpText> = ref({} as PopUpText)

const props = defineProps({
  playerName: String,
  playerTitleId: String,
})

async function act(action: ActionType): Promise<void> {
  isTurnPlaying.value = true

  playerAct(action)
  await delay(GAME_DELAY)

  if (!playerIsFleeing){
    if (!currentEnemyIsDead ) {
      enemyAct()
      await delay(GAME_DELAY)

      undeadsAct()
      await delay(GAME_DELAY * playerMinionCount.value)
    }

    if (currentEnemyIsDead) {
      gameLog.value.push([`${currentEnemy.value.name} est mort!`, GAME_COLOR])
      player.value.lifeForce += currentEnemy.value.lifeForce
      getNextFight()
    }
    gameLog.value.push([`-----------------------------------------------------`, GAME_COLOR])
  }
  isTurnPlaying.value = false
}

//PLAYER ACTIONS SECTION
function playerAct(action: ActionType): void {
  playerIsBlocking = false
  playerIsFleeing = false
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
    gameLog.value.push([`Votre attaque a raté.` , PLAYER_COLOR])
  }else{
    currentEnemyHealth.value -= damage
    handleHealthAjustment(currentEnemyHealth)
    handleEnemyDeath()
    gameLog.value.push([`Vous lancez des flammes nécrotiques pour ${damage} points de dégâts.` , PLAYER_COLOR])
  }
}
function defend(): void {
  playerIsBlocking = true
  gameLog.value.push([`Vous formez un voile nécrotique autour de vous.` , PLAYER_COLOR])
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
  gameLog.value.push([`Vous abosrbez ${healCost} points de force vitale pour vous soigner de ${healAmount} points de vie.`, PLAYER_COLOR])
}
function summon(): void {
  player.value.lifeForce -= PLAYER_SUMMON_COST
  let newMinion: Undead = undeads.value[Math.floor(Math.random() * undeads.value.length)]
  playerMinions.value.push(newMinion)
  gameLog.value.push([`Vous réanimez un(e) ${newMinion.type} pour servir votre cause.`, PLAYER_COLOR])
}
function flee(): void{
  playerIsFleeing = true
  popUpEventType.value = EventType.FLEE as string
  currentPopUpText.value = POP_UP_FLEE
  popUpButtonAction.value = escape
  isPopUpShowing.value = true
}

function escape(healing: boolean): void{
  if (healing) heal()
  getNextFight()
}


//ENEMY ACTIONS SECTION
function enemyAct(): void {
  if (playerMinionCount.value > 0 && Math.random() < ENEMY_MINION_KILL_CHANCE) {
    enemyKillMinion()
  } else {
    enemyAttack()
  }
}

function enemyAttack(): void {
  let damage = handleAttack(currentEnemy.value.experience, currentEnemy.value.strength)
  if (damage === 0) {
    gameLog.value.push([`${currentEnemy.value.name} rate son attaque.`, ENEMY_COLOR])
  } else {
    if (playerIsBlocking){
      damage = Math.floor(damage / PLAYER_BLOCK_DAMAGE_DIVIDER)
    }
    playerHealth.value -= damage
    handleHealthAjustment(playerHealth)
    handlePlayerDeath()
    gameLog.value.push([`${currentEnemy.value.name} attaque ${player.value.name} pour ${damage} points de dégâts.`, ENEMY_COLOR])
  }
}

function enemyKillMinion(){
  let minion = playerMinions.value[Math.floor(Math.random() * playerMinions.value.length)]
  playerMinions.value.splice(playerMinions.value.indexOf(minion), 1)
  gameLog.value.push([`${currentEnemy.value.name} à éliminé votre ${minion.type}.`, ENEMY_COLOR])
}

//UNDEAD ACTIONS SECTION
function undeadsAct(): void {
  let currentMinion = 0
  playerMinions.value.forEach(async minion => {
    currentMinion++
    await delay(GAME_DELAY * (currentMinion-1))
    undeadAttack(minion)
  })
}
function undeadAttack(minion: Undead): void {
  let damage = handleAttack(minion.experience, minion.strength)
  if (damage === 0) {
    gameLog.value.push([`${minion.type} rate son attaque.`, UNDEAD_COLOR])
  } else {
    currentEnemyHealth.value -= damage
    handleHealthAjustment(currentEnemyHealth)
    handleEnemyDeath()
    gameLog.value.push([`${minion.type} attaque pour ${damage} points de dégâts.` , UNDEAD_COLOR])
  }
}

//GAME SECTION
function getNextFight(): void {
  prepNextFight()
  getNewEnemy()
  gameLog.value.push([`${currentEnemy.value.name} se dresse devant vous.`, GAME_COLOR])
}

function prepNextFight(): void {
  enemies.value.splice(enemies.value.indexOf(currentEnemy.value), 1)
  gameLog.value = [];
  currentFight.value++
}

function getNewEnemy(): void {
  currentEnemyIsDead = false
  currentEnemy.value = enemies.value[Math.floor(Math.random() * enemies.value.length)]
  currentEnemyHealth.value = currentEnemy.value.vitality
}

function handleEnemyDeath(): void {
  currentEnemyIsDead = isCharacterDead(currentEnemyHealth.value)
}

function handlePlayerDeath(): void {
  if (isCharacterDead(playerHealth.value)) {
    popUpEventType.value = EventType.LOSS as string
    currentPopUpText.value = POP_UP_LOSS
    isPopUpShowing.value = true
  }
}

function handleFightOver(): void {
  popUpEventType.value = EventType.FIGHT_OVER as string
  currentPopUpText.value = { title: 'Vous avez vaincu tous les ennemis!', description: 'Voulez-vous recommencer?', buttonFalseText: 'Non', buttonTrueText: 'Oui' }
  popUpButtonAction.value = getNextFight
  isPopUpShowing.value = true
}

function popUpAct(condition: boolean): void {
  isPopUpShowing.value = false
  popUpButtonAction.value(condition)
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
      lifeForce: DEFAULT_PLAYER_LIFE_FORCE,
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
    <PopUp :isShowing="isPopUpShowing" :eventType="popUpEventType" :popUpText="currentPopUpText" @[popUpEventType]="popUpAct" />
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
      <ActionPanel :isPlaying="isTurnPlaying" :playerHealth="playerHealth" :playerLifeForce="player.lifeForce" @playerAct="act" />
    </div>
  </template>
  <Loading :active="isLoading" />
</template>

<style scoped>
</style>