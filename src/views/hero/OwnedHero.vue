<template>
  <div class="owned">
    <h2>Your Hero</h2>
    <OwnedHero/>
  </div>
</template>

<script>
import OwnedHero from '@/components/hero/OwnedHero.vue';

export default {
  components: {
    OwnedHero,
  },
};
</script>
