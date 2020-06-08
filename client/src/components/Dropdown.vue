<template>
  <div
    class="dropdown"
    :class="{'dropdown--open': isOpen}"
    @click="isOpen = !isOpen"
  >
    <p>
      {{ selectedOption }}
    </p>

    <img src="../assets/images/arrow-down-icon.svg" alt="">

    <ul class="dropdown__options">
      <li
        v-for="option in dropdownOptions"
        :key="option"
        @click="handleSelectedOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  data() {
    return {
      isOpen: false,
      selectedOption: 'Ordenar por',
      dropdownOptions: [
        'Preço',
        'Popularidade',
        'Ordem Alfabética'
      ]
    }
  },
  methods: {
    handleSelectedOption(option) {
      this.selectedOption = option
      this.$emit('reOrder', option)
    }
  }
}
</script>

<style lang="scss">
.dropdown {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 260px;
  height: 40px;
  padding: 0 15px 0 18px;
  border: 1px solid #E1E1E1;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;

  img {
    transition: .3s;
  }

  &--open {
    img {
      transform: rotate(180deg);
    }

    .dropdown__options {
      max-height: 200px;
      opacity: 1;
    }
  }

  &__options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 260px;
    max-height: 0;
    margin-top: 10px;
    padding: 10px 0;
    border: 1px solid #E1E1E1;
    border-radius: 4px;
    background-color: #ffffff;
    list-style: none;
    text-align: left;
    overflow: hidden;
    box-sizing: border-box;
    opacity: 0;
    transition: .3s;

    li {
      display: flex;
      align-items: center;
      height: 35px;
      padding: 0 18px;
      transition: .3s;

      &:hover {
        background-color: #E1E1E1;
      }
      
      &:not(:last-child) {
        border-bottom: 1px solid #E1E1E1;
      }
    }
  }

  p {
    margin: 0;
  }
}
</style>