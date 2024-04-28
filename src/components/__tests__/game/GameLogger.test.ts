import { describe, it, expect, vi } from 'vitest'
import GameLogger from '../../game/GameLogger.vue'
import { mount } from '@vue/test-utils'

describe('GameLogger.vue', () => {
    it('GameLogger renders correctly', () => {
        const wrapper = mount(GameLogger, {
            props: {
                gameLog: [['test 1', '#000000'], ['test 2', '#000000'], ['test 3', '#000000']], currentFight: 1
            }
        })
        
        expect(wrapper.findAll('li').length).toBe(3)
        expect(wrapper.text()).toContain('test 1')
        expect(wrapper.text()).toContain('Combat : 1 /')
    })

    it('GameLogger renders correctly with no log', () => {
        const wrapper = mount(GameLogger, {
            props: {
                gameLog: [], currentFight: 1
            }
        })
        
        expect(wrapper.findAll('li').length).toBe(0)
        expect(wrapper.text()).toContain('Combat : 1 /')
    })
})