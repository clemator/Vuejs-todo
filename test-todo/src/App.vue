<template>
  <div id="app">
    <modals-container />

    <TopToolbar/>
    <ListContainer>
      <div
        slot-scope="{ todos }"
        class="columns-container"
      >
        <ListByStatus
          v-for="(status, index) in ['backlog', 'doing', 'done']"
          :key="index"
          :status="status"
          :todos="todos"
        />
      </div>
    </ListContainer>
  </div>
</template>

<script>
import TopToolbar from './components/TopToolbar.vue'
import ListContainer from './components/ListContainer.vue'
import ListByStatus from './components/ListByStatus.vue'

export default {
  name: 'app',
  components: {
    TopToolbar,
    ListContainer,
    ListByStatus,
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .list-container {
    margin-top: 50px;
    .columns-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
    }
  }
}
</style>
