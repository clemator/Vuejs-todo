<template>
  <div
    class="todo-element"
    :id="todo.id"
    @click="$emit('todo-click')"
    @drag="$emit('todo-drag')"
  >
    <div class="id">Id: {{todo.id}}</div>
    <div class="description">Description: {{todo.description}}</div>
    <div class="status">Status: {{todo.status}}</div>
  </div>
</template>

<script>
  export default {
  name: "TodoElement",
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.todo-element {
  margin: 10px;
  padding: 5px 15px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
}
</style>