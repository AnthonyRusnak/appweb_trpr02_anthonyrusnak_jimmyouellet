import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayerUI from '../../../game/stats/PlayerUI.vue'
import { Character } from '../../../../scripts/interfaces'

describe('PlayerUI', () => {
    it('Should render player stats properly', () => {
        const wrapper = mount(PlayerUI, { props: { 
            player:{
                id: 0,
                name: 'test',
                title: 'test title',
                lifeForce: 10,
                strength: 2,
                experience: 3,
                vitality: 4
              } as Character, 
              playerCurrentHealth: 1, 
              playerMinionCount: 0 } 
        })

        expect(wrapper.text()).toContain('test')
        expect(wrapper.text()).toContain('test title')
        expect(wrapper.text()).toContain('10')
        expect(wrapper.text()).toContain('1')
        expect(wrapper.text()).toContain('2')
        expect(wrapper.text()).toContain('0')
    })
})