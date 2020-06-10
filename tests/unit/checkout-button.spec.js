import { shallowMount } from '@vue/test-utils'
import CheckoutButton from '@/components/CheckoutButton'

describe('Tests for CheckoutButton', () => {
  let wrapper = null
  beforeEach(() => {
    // Do Nothing - render the components in each unit test
  })

  afterEach(() => {
    wrapper.destroy()
  })
  
  it('Should have the right initial value', () => {
    // mount component with label prop
    wrapper  = shallowMount(CheckoutButton, {
      propsData: {
        label: 'finalizar compra'
      }
    })

    const buttonElement = wrapper.find('.checkout-button')

    // validate label prop
    expect(buttonElement.text()).toBe('finalizar compra')
  })
})