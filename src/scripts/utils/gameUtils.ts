import { ATTACK_DAMAGE_RANGE } from '../consts'
import { type Ref } from 'vue';

export function handleAttack(experience: number, strength: number): number {
    const hitChance = 20 * experience;
    if (Math.random() * 100 < hitChance) {
        const damageRange = Math.floor(Math.random() * (ATTACK_DAMAGE_RANGE + 1)) + ATTACK_DAMAGE_RANGE;
        return Math.floor(strength * (damageRange / 100));
    }
    return 0;
}

export function isCharacterDead(health: number): boolean {
    return health <= 0;
}

export function handleHealthAjustment(health: Ref<number>): void {
    if (health.value < 0) {
        health.value = 0;
    }
}