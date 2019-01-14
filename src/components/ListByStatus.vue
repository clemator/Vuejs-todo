<template>
  <div
    :class="['list-by-status', status]"
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
    }
  },
  methods: {
    selectTodo(todo) {
      return this.$store.dispatch('todos/setTodo', todo)
        .then(this.openEditionModal())
    },
    openEditionModal() {
      const {description, status, id} = this.$store.getters['todos/todo']

      this.$modal.show(TodoForm, {
        mode: 'edition',
        todo: {description: description, status: status, id: id},
        callback: (todo) => {
          return this.$store.dispatch('todos/setTodo', todo)
            .then(() => this.put())
            /* eslint-disable-next-line */
            .catch(err => console.error(err))
            .then(this.closeModal())
        }
      }, {
        name: 'edition-modal'
      })
    },
    closeModal() {
      this.$modal.hide('edition-modal')
    }
  }
};
</script>

<style lang="scss">
.list-by-status {
  flex: 1;
  max-width: 300px;

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
    padding: 10px;
    border-bottom-color: black;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    text-transform: uppercase;
  }
}
</style>