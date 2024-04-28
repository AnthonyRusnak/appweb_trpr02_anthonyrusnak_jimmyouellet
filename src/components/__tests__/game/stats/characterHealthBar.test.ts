import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { PLAYER_COLOR } from '../../../../scripts/consts'
import CharacterHealthBar from '../../../game/stats/CharacterHealthBar.vue'

describe('CharacterHealthBar', () => {
    it('Should render properly', () => {
        const wrapper = mount(CharacterHealthBar, {
            props: {
                characterCurrentHealth: 500,
                characterMaxHealth: 500,
                color: PLAYER_COLOR
                }
            })
        expect(wrapper.text()).toContain('500 PV')
    })
})