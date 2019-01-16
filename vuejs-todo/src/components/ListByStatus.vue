<template>
  <draggable
    :class="['list-by-status', status]"
    :list="filteredTodos"
    :options="{group: 'todos', draggable:'.todo-element'}"
    @remove="handleRemoveTodo"
  >
    <div
      class="list-title"
    >
      {{ status }}
    </div>
    <TodoElement
      class="todo-element"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @todo-click="selectTodo(todo)"
      :todo="todo"
    />
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import TodoElement from './TodoElement.vue'
import TodoForm from './TodoForm.vue'
import { fetchMixin } from '../mixin/fetch'

export default {
  name: 'ListByStatus',
  mixins: [fetchMixin],
  components: {
    draggable,
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
    filteredTodos: {
      get() {
        return this.todos
      },
    },
  },
  methods: {
    handleRemoveTodo(event) {
      const targetStatus = event.to.classList[1]
      const draggedTodoId = parseInt(event.item.id, 10)
      const {description, id} = this.todos.find(t => t.id === draggedTodoId)
      this.$store.dispatch('todos/setTodo', {description, id, status: targetStatus})
        .then(() => this.put())
    },
    getDraggedTodoTargetStatus(ev) {
      return 
    },
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
@keyframes nodeInserted {
  from { opacity: 0.2; height: 0; }
  to { opacity: 0.8; height: 76px; }
}

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

  &[aria-dropeffect="move"]:focus,
  &[aria-dropeffect="move"].dragover {
    outline: none;
    box-shadow: 0 0 0 1px #fff, 0 0 0 3px #68b;
  }

  .item-dropzone-area {
    height: 76px;
    opacity: 0.8;
    animation-duration: 0.5s;
    animation-name: nodeInserted;
  }
}
</style>