import { describe, it, expect, vi } from 'vitest'
import PopUp from '../../game/PopUp.vue'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { POP_UP_WIN } from '../../../scripts/consts'
import { EventType } from '../../../scripts/enums'

describe('PopUp', () => {
    it('Renders the pop up correctly', async () => {
        const wrapper = mount(PopUp, {
            props: {
                isShowing: true,
                eventType: EventType.WIN as string,
                popUpText: POP_UP_WIN
            }
        })

        expect(wrapper.text()).toContain(POP_UP_WIN.title)
        expect(wrapper.text()).toContain(POP_UP_WIN.description)
        expect(wrapper.text()).toContain(POP_UP_WIN.buttonFalseText)
        expect(wrapper.text()).toContain(POP_UP_WIN.buttonTrueText)
    })

    it('Emits a false event when false button is clicked', async () => { 
        const wrapper = mount(PopUp, {
            props: {
                isShowing: true,
                eventType: EventType.WIN as string,
                popUpText: POP_UP_WIN
            }
        })
        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted().win[0]).toEqual([false])
    })

    it('Emits a true event when true button is clicked', async () => { 
        const wrapper = mount(PopUp, {
            props: {
                isShowing: true,
                eventType: EventType.WIN as string,
                popUpText: POP_UP_WIN
            }
        })
        await wrapper.findAll('button')[1].trigger('click')
        expect(wrapper.emitted().win[0]).toEqual([true])
    })
})