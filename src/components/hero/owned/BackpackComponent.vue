<template>
  <div>
    <p>Backpack</p>
    <div v-for="item in items" :key="item.id">
      <ItemComponent :item="item"/>
    </div>
  </div>
</template>

<script>
import ItemComponent from '@/components/artifical/ItemComponent.vue';


export default {
  data() {
    return {

    };
  },

  components: {
    ItemComponent,
  },

  props: {
    items: [],
  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>

</style>
