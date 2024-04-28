import { describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import GameView from '../../views/GameView.vue'
import { ActionType } from '../../scripts/enums'
import ActionPanel from '../../components/game/ActionPanel.vue'
import PlayerUI from '../../components/game/stats/PlayerUI.vue'
import EnemyUI from '../../components/game/stats/EnemyUI.vue'

describe('GameView.vue', () => {
   it('Should renders properly', async () => {
        const wrapper = mount(GameView, { props: { playerName: 'Test', playerTitleId: '1' } })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('Should display the action panel', async () => {
        const wrapper = mount(GameView, { props: { playerName: 'Test', playerTitleId: '1' } })
        expect(wrapper.findComponent(ActionPanel).exists()).toBe(true)
    })

    it('Should display the player UI', async () => {
        const wrapper = mount(GameView, { props: { playerName: 'Test', playerTitleId: '1' } })
        expect(wrapper.findComponent(PlayerUI).exists()).toBe(true)
    })

    it('Should display the enemy UI', async () => {
        const wrapper = mount(GameView, { props: { playerName: 'Test', playerTitleId: '1' } })
        expect(wrapper.findComponent(EnemyUI).exists()).toBe(true)
    })

})