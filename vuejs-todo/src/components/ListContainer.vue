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
   *  Created
   */
  created() {
    this.get()
      /* eslint-disable-next-line */
      .catch(err => console.error(err));
  },
  /**
   *  Render
   *
   *  @return {Component}
   */
  /* eslint-disable-next-line */
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
