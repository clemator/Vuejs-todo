<template>
  <div class="top-toolbar">
    <button @click="openCreationModal">
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
  justify-content: flex-end;
  align-items: center;
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: red;
  button {
    height: 30px;
  }
}
</style>
