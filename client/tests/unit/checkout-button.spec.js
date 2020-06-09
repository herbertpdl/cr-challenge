import { shallowMount } from '@vue/test-utils'

import CheckoutButton from '@/components/CheckoutButton'

describe('Tests for CheckoutButton', () => {
  // mount component with label prop
  const wrapper  = shallowMount(CheckoutButton, {
    propsData: {
      label: 'finalizar compra'
    }
  })

  it('Should have the right initial value', () => {
    const buttonElement = wrapper.find('.checkout-button')

    // validate label prop
    expect(buttonElement.text()).toBe('finalizar compra')
  })
})