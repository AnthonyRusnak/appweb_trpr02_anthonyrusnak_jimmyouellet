import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { PLAYER_COLOR } from '../../../../scripts/consts'
import CharacterStats from '../../../game/stats/CharacterStats.vue'

describe('CharacterStats', () => {
    it('Should render all stats if character has minions', () => {
        const wrapper = mount(CharacterStats, {
            props: {
                lifeForce: 100,
                experience: 1,
                strength: 250,
                minionCount: 3,
                color: PLAYER_COLOR
            }
        })
        expect(wrapper.text()).toContain('Apprenti')
        expect(wrapper.text()).toContain('Force: 250')
        expect(wrapper.text()).toContain('Force vitale: 100')
        expect(wrapper.text()).toContain('Serviteurs: 3')
    })
})