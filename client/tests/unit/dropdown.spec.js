import { shallowMount, createWrapper } from '@vue/test-utils'

import Dropdown from '@/components/Dropdown'

describe('Tests for Dropdown', () => {
  // mount component with options prop
  const wrapper = shallowMount(Dropdown, {
    propsData: {
      options: {
        price: 'Preço',
        score: 'Popularidade',
        name: 'Ordem Alfabética',
      }
    }
  })

  it ('Should have the right initial values', () => {
    // validate that 3 options was created
    expect(wrapper.findAll('.dropdown__options li').length).toEqual(3)

    // validate options value
    expect(wrapper.findAll('.dropdown__options li').at(0).text()).toBe('Preço')
    expect(wrapper.findAll('.dropdown__options li').at(1).text()).toBe('Popularidade')
    expect(wrapper.findAll('.dropdown__options li').at(2).text()).toBe('Ordem Alfabética')
  })

  it ('Should open and close when clicking', async () => {
    // validate handle isOpen data (isOpen starts with false value)

    await wrapper.trigger('click')
    expect(wrapper.vm.isOpen).toBe(true)
    expect(wrapper.classes('dropdown--open')).toBe(true)

    await wrapper.trigger('click')
    expect(wrapper.vm.isOpen).toBe(false)
    expect(wrapper.classes('dropdown--open')).toBe(false)
  })

  it('Should emmit input event when clcking in some option', () => {
    // validate emmited event
    wrapper.findAll('.dropdown__options li').at(0).trigger('click')
    expect(wrapper.emitted('input')).toBeTruthy()

    // validate if the event was emitted once
    expect(wrapper.emitted('input').length).toBe(1)

    // validate emited value
    expect(wrapper.emitted('input')[0]).toEqual(['price'])
  })
})