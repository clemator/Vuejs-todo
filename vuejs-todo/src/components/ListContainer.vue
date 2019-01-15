<script>
import { fetchMixin } from '../mixin/fetch';
import { mapGetters } from 'vuex';

export default {
  name: 'ListContainer',
  mixins: [fetchMixin],
  computed: {
    ...mapGetters({
      todos: 'todos/todos'
    })
  },
  /**
   *  Created component hook
   *    - Fetch initial data from todo list
   */
  created() {
    this.get()
      .catch(err => console.error(err));
  },
  /**
   *  Render
   *
   *  @return {Component}
   */
  render(h) {
    return (
      <div class="list-container">
        {this.$scopedSlots.default({
          todos: this.todos
        })}
      </div>
    );
  }
};
</script>
