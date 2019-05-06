<template>
  <div>
    <p>Equipped Items</p>
    <div v-for="bodyPartWithItem in bodyPartsWithItems" :key="bodyPartWithItem.id">
      <BodyPartComponent
        :bodyPart="bodyPartWithItem.name"
        :item="bodyPartWithItem.item"
      />
    </div>
  </div>
</template>

<script>
import BodyPartComponent from '@/components/hero/owned/BodyPartComponent.vue';


export default {
  data() {
    return {

    };
  },
  
  components: {
    BodyPartComponent,
  },

  props: {
    bodyPartsWithItems: [],
  },
};
</script>

<style lang="scss" scoped>

</style>
