<template>
  <div
    class="dropdown"
    :class="{'dropdown--open': isOpen}"
    @click="isOpen = !isOpen"
  >
    <p>
      {{ dropdownOptions[value] || 'Ordenar por' }}
    </p>

    <img src="../assets/images/arrow-down-icon.svg" alt="">

    <ul class="dropdown__options">
      <li
        v-for="(option, name) in dropdownOptions"
        :key="option"
        @click="handleSelectedOption(name)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  props: {
    value: String
  },
  data() {
    return {
      isOpen: false,
      dropdownOptions: {
        price: 'Preço',
        score: 'Popularidade',
        name: 'Ordem Alfabética',
      }
    }
  },
  methods: {
    handleSelectedOption(option) {
      this.$emit('input', option)
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
    padding: 0;
    border: 1px solid #E1E1E1;
    border-radius: 4px;
    background-color: #ffffff;
    list-style: none;
    text-align: left;
    overflow: hidden;
    box-sizing: border-box;
    opacity: 0;
    transition: .3s;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);

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