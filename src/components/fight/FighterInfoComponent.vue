<template>
  <div v-if="data" class="container">
    <p v-if="data.object" class="name">
      {{ data.object.name}}
    </p>
    <div v-for="statistic in data.statistics" class="statistic">
      <p>{{ statistic.name }}: {{ statistic.points}}</p>
    </div>
  </div>
</template>

<script>

export default {
  // socket keys are socket emits names
  props: {
    data: {
      type: null,
    },
  },

  sockets: {
    
  },
  
  mounted() {
    
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
}
.name {
  border: 1px solid;
  padding: 20px;
  font-weight: bold;
}
</style>