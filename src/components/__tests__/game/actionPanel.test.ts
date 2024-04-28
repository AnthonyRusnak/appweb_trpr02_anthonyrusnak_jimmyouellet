import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ActionPanel from '../../game/ActionPanel.vue'


describe('ActionPanel.vue', () => {
    it('Action panel renders correctly', () => {
        const wrapper = mount(ActionPanel, {
            props: {
                playerLifeForce: 100,
                playerHealth: 500,
                isPlaying: true
            }
        })
        
        expect(wrapper.findAll('button').length).toBe(5)
    })
    
    it('emits an attack event when the attack button is clicked', async () => {
        const wrapper = mount(ActionPanel, {
            props: {
                playerLifeForce: 100,
                playerHealth: 500,
                isPlaying: false
            }
        })
        await wrapper.find('button').trigger('click')
        
        expect(wrapper.emitted().playerAct[0]).toEqual(['attack'])
    })

    it('does not emit an attack event when isPlaying is true', async () => {
        const wrapper = mount(ActionPanel, {
            props: {
                playerLifeForce: 100,
                playerHealth: 500,
                isPlaying: true
            }
        })
        await wrapper.find('button').trigger('click')
        
        expect(wrapper.emitted().playerAct).toBeUndefined()
    })

    it('emits a heal event when the heal button is clicked', async () => {
        const wrapper = mount(ActionPanel, {
            props: {
                playerLifeForce: 100,
                playerHealth: 400,
                isPlaying: false
            }
        })
        await wrapper.findAll('button')[3].trigger('click')
        
        expect(wrapper.emitted().playerAct[0]).toEqual(['heal'])
    })

    it('does not emit a heal event when the player has full health', async () => {
        const wrapper = mount(ActionPanel, {
            props: {
                playerLifeForce: 100,
                playerHealth: 500,
                isPlaying: false
            }
        })
        await wrapper.findAll('button')[3].trigger('click')
        
        expect(wrapper.emitted().playerAct).toBeUndefined()
    })

    it('does not emit a heal event when the player has no life force', async () => {
        const wrapper = mount(ActionPanel, {
            props: {
                playerLifeForce: 0,
                playerHealth: 400,
                isPlaying: false
            }
        })
        await wrapper.findAll('button')[3].trigger('click')
        
        expect(wrapper.emitted().playerAct).toBeUndefined()
    })

    it('does not emit a heal event when isPlaying is true', async () => {
        const wrapper = mount(ActionPanel, {
            props: {
                playerLifeForce: 100,
                playerHealth: 400,
                isPlaying: true
            }
        })
        await wrapper.findAll('button')[3].trigger('click')
        
        expect(wrapper.emitted().playerAct).toBeUndefined()
    })

    it('emits a flee event when the flee button is clicked', async () => {
        const wrapper = mount(ActionPanel, {
            props: {
                playerLifeForce: 100,
                playerHealth: 500,
                isPlaying: false
            }
        })
        await wrapper.findAll('button')[4].trigger('click')
        
        expect(wrapper.emitted().playerAct[0]).toEqual(['flee'])
    })

    it('does not emit a flee event when isPlaying is true', async () => {
        const wrapper = mount(ActionPanel, {
            props: {
                playerLifeForce: 100,
                playerHealth: 500,
                isPlaying: true
            }
        })
        await wrapper.findAll('button')[4].trigger('click')
        
        expect(wrapper.emitted().playerAct).toBeUndefined()
    })
})