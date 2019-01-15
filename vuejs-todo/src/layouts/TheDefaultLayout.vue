<template>
  <div class="default-layout">
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
import TopToolbar from '../components/TopToolbar.vue'
import ListContainer from '../components/ListContainer.vue'
import ListByStatus from '../components/ListByStatus.vue'

export default {
  name: 'TheDefaultLayout',
  components: {
    TopToolbar,
    ListContainer,
    ListByStatus,
  }
}
</script>

<style lang="scss">
.default-layout {
  height: 100%;
  background-color: #F0F0F0;
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