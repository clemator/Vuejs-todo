<template>
  <div
    class="todo-form"
  >
    <div
      class="todo-form__form-title"
    >
      {{ mode === 'creation' ? 'New todo' : 'Todo edition' }}
    </div>
    <div
      class="todo-form__form-container"
    >
      <div
        class="description-input-container"
      >
        <div
          class="label"
        >
          Description:
        </div>
        <textarea
          class="description-input"
          :class="{ error: ! isDescriptionSet && isFormSubmitted }"
          v-model="todo.description"
        ></textarea>
      </div>

      <div
        class="status-input-container"
      >
        <div
          class="label"
        >
          Status:
        </div>
        <select
          class="status-input"
          :class="{ error: ! isStatusSet && isFormSubmitted }"
          v-model="todo.status"
        >
          <option value="backlog">Backlog</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
    <div
      v-if="mode === 'creation'"
    >
      <button
        class="todo-form__submit-button"
        @click="submitForm()"
      >
        Create
      </button>
    </div>
    <div
      v-else
    >
      <button
        class="todo-form__submit-button"
        @click="submitForm()"
      >
        Save
      </button>

      <button
        class="todo-form__submit-button"
        @click="this.deleteCallback()"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoForm',
  data() {
    return {
      isFormSubmitted: false
    }
  },
  props: {
    mode: {
      type: String,
      required: true,
      default: 'creation'
    },
    todo: {
      type: Object,
      required: true,
      default: () => {}
    },
    callback: {
      type: Function,
      required: true
    },
    deleteCallback: {
      type: Function,
      required: false
    }
  },
  computed: {
    isStatusSet() {
      return typeof this.todo.status !== 'undefined'
    },
    isDescriptionSet() {
      return (typeof this.todo.description !== 'undefined' && this.todo.description !== '')
    }
  },
  methods: {
    submitForm() {
      this.isFormSubmitted = true

      if (! this.$props.todo.description || ! this.$props.todo.status)
        return

      return this.callback(this.$props.todo)
        .finally(() => {
          this.isFormSubmitted = false
        })
    }
  }
}
</script>

<style lang="scss">
.todo-form {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &__form-title {
    display: flex;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    border-bottom-color: black;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    font-size: 20px;
    font-weight: bold;
    color: black;
    text-transform: uppercase;
  }

  &__form-container {
    padding: 15px 20px 0 20px;

    .description-input-container, .status-input-container {
      padding-bottom: 20px;
      .label {
        font-weight: bold;
        font-size: 18px;
      }
      .error {
        border-color: red;
        border-width: 2px;
      }
    }

    .description-input-container {
      .description-input {
        padding: 5px 10px;
        width: 100%;
        box-sizing: border-box;
        outline: none;
        min-height: 60px;
        border-radius: 4px;
      }
    }

    .status-input-container {
      .status-input {
        outline: none;
        width: 100px;
        height: 20px;
      }
    }
  }

  &__submit-button {
    margin: 0 20px;
    height: 35px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
  }
}
</style>