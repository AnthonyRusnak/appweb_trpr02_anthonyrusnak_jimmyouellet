import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import EnemyUI from '../../../game/stats/EnemyUI.vue'
import { Character } from '../../../../scripts/interfaces'

describe('EnemyUI', () => {
    it('Should render enemy stats properly', () => {
        const wrapper = mount(EnemyUI, { props: { 
            enemy:{
                id: 0,
                name: 'test',
                title: 'test title',
                lifeForce: 1,
                strength: 2,
                experience: 3,
                vitality: 4
              } as Character, 
              enemyCurrentHealth: 1} 
        })

        expect(wrapper.text()).toContain('test')
        expect(wrapper.text()).toContain('test title')
        expect(wrapper.text()).toContain('1')
        expect(wrapper.text()).toContain('2')
    })
})

