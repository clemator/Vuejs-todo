<template>
  <div class="top-toolbar">
    <h3
      class="top-toolbar__title"
    >
      My Vuejs todo app
    </h3>
    <button
      class="top-toolbar__add-button"
      @click="openCreationModal"
    >
      Create Todo
    </button>
  </div>
</template>

<script>
import TodoForm from './TodoForm.vue'
import { fetchMixin } from '../mixin/fetch'

export default {
  name: 'TopToolbar',
  mixins: [fetchMixin],
  methods: {
    openCreationModal() {
      this.$modal.show(TodoForm, {
        mode: 'creation',
        todo: {},
        callback: ({ description, status }) => {
          return this.$store.dispatch('todos/setTodo', { description, status })
            .then(() => this.post())
            .catch(err => console.error(err))
            .then(this.closeModal())
        }
      }, {
        name: 'creation-modal'
      })
    },
    closeModal() {
      this.$modal.hide('creation-modal')
    }
  }
}
</script>

<style lang="scss" scoped>
.top-toolbar {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.5);

  &__title {

  }

  &__add-button {
    margin: 0;
    height: 35px;
    min-width: 100px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    color: white;
    font-weight: bold;
    font-size: 17px;
    background-color: rgb(76, 175, 80);
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
}
</style>
