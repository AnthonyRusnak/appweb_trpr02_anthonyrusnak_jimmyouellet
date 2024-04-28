import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'
import { HOME_MAIN_TEXT } from '../../scripts/consts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../../router/routes'

const router = createRouter({
    history: createWebHistory(),
    routes : routes
})

describe('HomeView', () => {
  it('renders the main text', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain(HOME_MAIN_TEXT)
    expect(wrapper.text()).toContain('La Necro Gate')
    expect(wrapper.text()).toContain('Entrer')
  })

  it('Can go to create character', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(HomeView, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')

    await wrapper.find('button').trigger('click')

    expect(routerSpy).toHaveBeenCalledWith({ name: 'CharacterCreation' })
  })
})