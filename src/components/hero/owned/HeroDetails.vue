<template>
  <div v-if="hero" class="hero-details">
    <span>Name: {{ hero.name }} </span>
    <span>Occupation: {{ occupation.name }}</span>
  </div>
</template>
<script>
export default {
  mounted () {
    this.unpackData();
  },
  data () {
    return {
      hero: null,
      occupation: null,
    };
  },
  methods: {
    unpackData: function () {
      this.hero = this.$attrs.parentData.hero;
      this.occupation = this.$attrs.parentData.occupation;
    },
  },
};
</script>

<style lang="scss" scoped>
.hero-details span {
  margin: 10px;
  padding: 10px;
  border: 1px solid;
  font-weight: bold;
}
</style>
