import CharacterCreationView from '../../views/CharacterCreationView.vue';
import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

describe('CharacterCreationView', () => {
  it('Renders properly', () => {
    const wrapper = mount(CharacterCreationView)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Démarrer') 
  })

  it('Should submit form', async () => {
    const wrapper = mount(CharacterCreationView)
    await flushPromises()

    await wrapper.find('input').setValue('TestName')
    await wrapper.find('select').setValue(1)
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted()).toHaveProperty('submit')
  })

  it('Button should be disabled if name and title is empty', async () => {
    const wrapper = mount(CharacterCreationView)
    await flushPromises()

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('Button should be disabled if name is too long', async () => {
    const wrapper = mount(CharacterCreationView)
    await wrapper.find('input').setValue('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    await flushPromises()

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('Button should be disabled if no title is selected', async () => {
    const wrapper = mount(CharacterCreationView)
    await wrapper.find('input').setValue('TestName')
    await flushPromises()

    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('Button should be enabled if name is valid and title is selected', async () => {
    const wrapper = mount(CharacterCreationView)
    await wrapper.find('input').setValue('TestName')
    await wrapper.find('select').setValue(1)
    await flushPromises()

    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
  })
})