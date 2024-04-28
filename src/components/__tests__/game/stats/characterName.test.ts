import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { PLAYER_COLOR } from '../../../../scripts/consts'
import CharacterName from '../../../game/stats/CharacterName.vue'

describe('CharacterName', () => {
    it('Should render properly', () => {
        const wrapper = mount(CharacterName, {
            props: {
                characterName: 'Pootis',
                characterTitle: 'The big bird',
                color: PLAYER_COLOR
                }
            })
        expect(wrapper.text()).toContain('Pootis')
        expect(wrapper.text()).toContain('The big bird')
    })
})