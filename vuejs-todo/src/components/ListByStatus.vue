<template>
  <div
    :class="['list-by-status', status]"
    v-drag-and-drop:options="options"
  >
    <div
      class="list-title"
    >
      {{ status }}
    </div>
    <div
      v-for="todo in filteredTodos"
      :key="todo.id"
    >
      <TodoElement
        @todo-click="selectTodo(todo)"
        :todo="todo"
        @todo-drag="setTodo(todo)"
      />
    </div>
  </div>
</template>

<script>
import TodoElement from './TodoElement.vue'
import TodoForm from './TodoForm.vue'
import { fetchMixin } from '../mixin/fetch'

export default {
  name: "ListByStatus",
  mixins: [fetchMixin],
  data() {
    const vm = this;

    return {
      options: {
        dropzoneSelector: 'div.list-by-status',
        draggableSelector: 'div.todo-element',
        showDropzoneAreas: true,
        onDragend(event) {
          const {description, id} = vm.$store.getters['todos/todo']
          const targetStatus = event.droptarget.className.split(' ')[1];
          return vm.$store.dispatch('todos/updateTodo', {id, description, status: targetStatus})
            .then(() => vm.put())
            .then(() => { event.stop() })
            .catch(err => { return err })
        },
      }
    }
  },
  components: {
    TodoElement
  },
  props: {
    status: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    filteredTodos() {
      return this.todos.filter(t => t.status === this.status)
    },
  },
  methods: {
    /**
     *  Set todo
     *
     *  @param {Object} todo
     *  @return {Promise}
     */
    setTodo(todo) {
      return this.$store.dispatch('todos/setTodo', todo)
    },
    /**
     *  Select todo
     *
     *  @param {Object} todo
     *  @return {Promise}
     */
    selectTodo(todo) {
      return this.setTodo(todo)
        .then(this.openEditionModal())
    },
    /**
     *  Close modal
     */
    closeModal() {
      this.$modal.hide('edition-modal')
    },
    /**
     *  Open the edition modal
     */
    openEditionModal() {
      const {description, status, id} = this.$store.getters['todos/todo']

      this.$modal.show(TodoForm, {
        mode: 'edition',
        todo: {description: description, status: status, id: id},
        /**
         *  Callback to edition modal submission
         *  @param {Object} todo
         *  @return {Promise}
         */
        callback: (todo) => {
          return this.$store.dispatch('todos/setTodo', todo)
            .then(() => this.put())
            .then(this.closeModal())
            .catch(err => console.error(err))
        },
        /**
         *  Deletion callback
         *  @return {Promise}
         */
        deleteCallback: () => {
          return this.$store.dispatch('todos/deleteTodo', id)
            .then(() => this.delete())
            .then(this.closeModal())
            .catch(err => console.error(err))
        }
      }, {
        name: 'edition-modal'
      })
    },
  }
};
</script>

<style lang="scss">
.list-by-status {
  flex: 1;
  max-width: 300px;
  box-shadow: 4px 7px 5px 1px #878787;
  border-radius: 3px;

  &.backlog {
    background-color: grey;
  }
  &.doing {
    background-color: blue;
  }
  &.done {
    background-color: green;
  }

  .list-title {
    display: flex;
    justify-content: center;
    padding: 10px 10px 8px 10px;
    border-bottom-color: #3A3A3A;
    border-bottom-style: solid;
    border-bottom-width: 2px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    text-transform: uppercase;
  }
}
</style>