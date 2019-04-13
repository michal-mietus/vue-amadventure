<template>
  <div class="create">
    <h2>Expedition</h2>
    <LocationListComponent/>
  </div>
</template>

<script>
// don't know how to use ExpeditionComponent
import LocationListComponent from '@/components/artifical/LocationListComponent.vue';

export default {
  components: {
    LocationListComponent,
  },
};
</script>
