<template>
  <div v-if="fighter" class="container">
    <p v-if="fighter.info" class="name">
      {{ fighter.info.name}}
    </p>
    <div v-for="statistic in fighter.mainStatistics" class="statistic">
      <p>{{ statistic.name }}: {{ statistic.points}}</p>
    </div>
    <div v-if="fighter.derivativeStatistics" class="statistic">
      <p>Damage: {{ fighter.derivativeStatistics.damage }}</p>
      <p>Critic chance: {{ fighter.derivativeStatistics.critic_chance }}%</p>
      <p>Mana: {{ fighter.derivativeStatistics.mana }}</p>
      <p>Health points: {{ fighter.derivativeStatistics.health_points }}</p>
    </div>
  </div>
</template>

<script>

export default {
  // socket keys are socket emits names
  props: {
    fighter: {
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