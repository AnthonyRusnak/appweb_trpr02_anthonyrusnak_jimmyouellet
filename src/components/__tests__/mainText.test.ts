import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import MainText from '../MainText.vue'

describe('MainText', () => {
    it('Should render the main text', () => {
        const wrapper = mount(MainText, {
            props: { text: 'Hello World!' }
        })
        expect(wrapper.text()).toBe('Hello World!')
    })
})