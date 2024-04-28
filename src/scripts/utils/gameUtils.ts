import { ATTACK_DAMAGE_RANGE, GAME_DELAY, HIT_CHANCE_PERCENTAGE } from '../consts'
import { type Ref } from 'vue';
import { DEATH_TRESHOLD } from '../consts';

export function handleAttack(experience: number, strength: number): number {
    const hitChance = HIT_CHANCE_PERCENTAGE * experience;
    if (Math.random() * 100 < hitChance) {
        const damageRange = Math.floor(Math.random() * (ATTACK_DAMAGE_RANGE + 1)) + ATTACK_DAMAGE_RANGE;
        return Math.floor(strength * (damageRange / 100));
    }
    return 0;
}

export function isCharacterDead(health: number): boolean {
    return health <= DEATH_TRESHOLD;
}

export function handleHealthAjustment(health: Ref<number>): void {
    if (health.value < DEATH_TRESHOLD) health.value = DEATH_TRESHOLD;
}

export async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}