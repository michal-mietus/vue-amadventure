<template>
  <div>
    <h2>Equipment</h2>
    <PutOnItemsComponent v-if="bodyPartsWithItems" :bodyPartsWithItems="bodyPartsWithItems"/>
    <BackpackComponent v-if="backpackItems" :items="backpackItems"/>
  </div>
</template>

<script>
import PutOnItemsComponent from '@/components/hero/owned/PutOnItemsComponent.vue';
import BackpackComponent from '@/components/hero/owned/BackpackComponent.vue';


export default {
  data() {
    return {
      bodyPartsWithItems: {},
      backpackItems: {},
    };
  },

  mounted() {
    this.getEquipment();
  },

  components: {
    PutOnItemsComponent,
    BackpackComponent,
  },

  methods: {
    getEquipment: function () {
      this.$http
      .get(`${this.$store.state.url}hero/equipment/`)
      .then(response => {
        console.log('data:!!!!!!!!!!!',response.data);
        this.bodyPartsWithItems = response.data.body_parts_with_items;
        this.backpackItems = response.data.backpack_items;
      })
      .catch(error => console.lor(error))
    },
  }
};
</script>
