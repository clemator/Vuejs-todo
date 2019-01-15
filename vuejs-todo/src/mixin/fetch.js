/**
 *  Fetch Mixin
 */
export const fetchMixin = {
  methods: {
    /**
     *  Get
     *    - Fetch data from the server
     *
     *  @return {Promise}
     */
    get() {
      return fetch('http://localhost:3000/todos')
        .then(res => res.json())
        .then(todos => this.$store.dispatch('todos/setTodos', todos))
        .catch(err => Promise.reject(err));
    },
    /**
     *  Post
     *    - Post data to the server
     *
     *  @return {Promise}
     */
    post() {
      const todo = this.$store.getters['todos/todo']
      const params = {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'description=' + todo.description + '&status=' + todo.status
      }

      return fetch('http://localhost:3000/todos', params)
        .then(res => res.json())
        .then(newTodo => this.$store.dispatch('todos/addTodo', newTodo))
        .catch(err => Promise.reject(err));
    },
    /**
     *  Put
     *    - Put data to the server
     *
     *  @return {Promise}
     */
    put() {
      const todo = this.$store.getters['todos/todo']
      const params = {
        method: 'put',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'description=' + todo.description + '&status=' + todo.status
      }

      return fetch('http://localhost:3000/todos/' + todo.id, params)
        .then(res => res.json())
        .then(newTodo => this.$store.dispatch('todos/updateTodo', newTodo))
        .then(() => this.$store.dispatch('todos/unsetTodo'))
        .catch(err => Promise.reject(err));
    },
    delete() {
      const todoId = this.$store.getters['todos/todo'].id
      const params = {
        method: 'delete',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }

      return fetch('http://localhost:3000/todos/' + todoId, params)
        .then(res => res.json())
        .then(() => this.$store.dispatch('todos/unsetTodo'))
        .catch(err => Promise.reject(err));
    }
  }
};
