<template>
  <div>
    <div v-if="item">
      <p>{{ item. name}}</p>
      <p>{{ item.description }}</p>
      <p>{{ item.rarity.name }}</p>
    </div>
    <div v-if="itemStatistics">
      <div v-for="statistic in itemStatistics" :key="statistic.pk">
        <p>{{ statistic.name }}: {{ statistic.points }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },

  props: {
    item: {

    },
    itemStatistics: {

    },
  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>

</style>
