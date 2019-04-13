<template>
  <div v-if="ability" class="container">
    <p>{{ ability.name }}</p>
    <p>{{ ability.description }}</p>
  </div>
</template>

<script>

export default {
  // socket keys are socket emits names
  props: {
    ability: {
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