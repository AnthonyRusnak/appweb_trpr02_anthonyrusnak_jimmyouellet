import { describe, expect, vi, it } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ScoreboardView from '../ScoreboardView.vue'
import { SCOREBOARD_MAIN_TEXT } from '../../scripts/consts'
import axios from 'axios'
import { gameService } from '../../services/gameService'
import { useToast } from 'vue-toast-notification'
import { watch } from 'fs'
import { onMounted } from 'vue'

describe('ScoreboardView', () => {
    it('Should render the scoreboard view', () => {
        const wrapper = mount(ScoreboardView)

        expect(wrapper.text()).toContain('#')
        expect(wrapper.text()).toContain('Force vitale')
        expect(wrapper.text()).toContain('Nom')
        expect(wrapper.text()).toContain(SCOREBOARD_MAIN_TEXT)
    })

    it('Should render all rankings', async () => {
        vi.spyOn(gameService, 'getRankings').mockResolvedValue([{"id": 1, "name": "Test", "score": 100}, {"id": 2, "name": "Test2", "score": 200}])

        const wrapper = mount(ScoreboardView)
        await flushPromises()

        expect(wrapper.text()).toContain('Test')
        expect(wrapper.text()).toContain('100')
        expect(wrapper.text()).toContain('Test2')
        expect(wrapper.text()).toContain('200')
    })

    it('Should sort rankings by score', async () => {
        vi.spyOn(gameService, 'getRankings').mockResolvedValue([{"id": 1, "name": "Test", "score": 100}, {"id": 2, "name": "Test2", "score": 200}])

        const wrapper = mount(ScoreboardView)
        await flushPromises()

        const scores = wrapper.findAll('td')
        expect(scores[1].text()).toBe('200')
        expect(scores[3].text()).toBe('100')
    })
})