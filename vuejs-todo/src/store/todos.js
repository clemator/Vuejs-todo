const state = {
  todos: [],
  todo: {}
};

const getters = {
  /**
   *  Todos
   *
   *  @param {Object} state
   *  @return {Array}
   */
  todos: (state) => {
    return state.todos
  },
  /**
   *  Todo
   *
   *  @param {Object} state
   *  @return {Object}
   */
  todo: (state) => {
    return state.todo
  }
};

const actions = {
  /**
   *  Set Todos
   *
   *  @param {Object} commit
   *  @param {Array} todos
   */
  setTodos({ commit }, todos) {
    if (todos.length === 0)
      return;

    commit('pushTodos', todos)
  },
  /**
   *  Set a Todo
   *
   *  @param {Object} state
   *  @param {Object} todo
   */
  setTodo({commit}, todo) {
    commit('setTodo', todo)
  },
  /**
   *  Unset the Todo
   *
   *  @param {Object} state
   */
  unsetTodo({commit}) {
    commit('unsetTodo')
  },
  /**
   *  Add a single todo
   *
   *  @param {Object} commit
   *  @param {Object} todo
   */
  addTodo({ commit }, todo) {
    commit('pushTodo', todo)
  },
  /**
   *  Remove Todo
   *
   *  @param {Object} commit
   *  @param {Number} id
   */
  removeTodo({ commit }, id) {
    if (typeof id !== 'number')
      return;

    commit('removeTodo', id)
  },
  /**
   *  Complete Todo
   *
   *  @param {Object} commit
   *  @param {Number} id
   */
  completeTodo({ commit }, id) {
    if (typeof id !== 'number')
      return;

    commit('completeTodo', id)
  },
  /**
   *  Update a todo from todos
   *
   *  @param {Object} commit
   *  @param {Object} todo
   */
  updateTodo({ commit }, todo) {
    commit('updateTodo', todo)
  },
  /**
   *  Delete a todo from todo list
   */
  deleteTodo({ commit }, id) {
    commit('deleteTodoById', id)
  }
};

/**
 *  Mutations
 */
const mutations = {
  /**
   *  Push Todos
   *
   *  @param {Object} state
   *  @param {Array} todos
   */
  pushTodos(state, todos) {
    state.todos = [...todos]
  },
  /**
   *  Set a Todo
   *
   *  @param {Object} state
   *  @param {Object} todo
   */
  setTodo(state, todo) {
    state.todo = todo
  },
  /**
   *  Unset a Todo
   *
   *  @param {Object} state
   */
  unsetTodo(state) {
    state.todo = {}
  },
  /**
   *  Push a todo
   *
   *  @param {Object} state
   *  @param {Object} todo
   */
  pushTodo(state, todo) {
    state.todos.push(todo)
  },
  /**
   *  Remove Todo
   *
   *  @param {Object} state
   *  @param {Number} id
   */
  removeTodo(state, id) {
    const todos = state.todos
    const newTodos = todos.map(t => {
      if (t.id === id)
        t.status = 'deleted'

      return t
    })

    state.todos = newTodos
  },
  /**
   *  Complete Todo
   *
   *  @param {Object} state
   *  @param {Number} id
   */
  completeTodo(state, id) {
    const currentTodos = state.todos
    const newTodos = currentTodos.map(t => {
      if (t.id === id)
        t.status = 'done'

      return t
    });

    state.todos = newTodos
  },
  /**
   *  Update a todo from the todo list
   *
   *  @param {Object} state
   *  @param {Object} todo
   */
  updateTodo(state, todo) {
    const currentTodos = state.todos
    const newTodos = currentTodos.map(t => {
      if (t.id === todo.id) {
        t.description = todo.description
        t.status = todo.status
      }

      return t
    });

    state.todos = newTodos
  },
  /**
   *  Look for a todo and remove it from todo list
   *
   *  @param {Object} state
   *  @param {Number} id
   */
  deleteTodoById(state, id) {
    const toSpliceTodos = state.todos

    const indexToSplice = toSpliceTodos.findIndex(t => t.id === id)

    toSpliceTodos.splice(indexToSplice, 1);

    state.todos = toSpliceTodos
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
