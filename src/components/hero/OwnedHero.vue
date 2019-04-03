<template>
  <div v-if="hero">
    <div v-if="errors" class="errors">
      <span v-for="error in errors">{{ error }}</span>
    </div>

    <HeroDetails :parentData="getDataToHeroDetailsComponent()" />

    <!-- tabs bar -->
    <div class="bar">
      <div class="bar-item" v-on:click="displayTab('statistics-form')">
        <h4>Statistics</h4>
      </div>
      <div class="bar-item" v-on:click="displayTab('abilities-form')">
        <h4>Abilities</h4>
      </div>
    </div>

    <StatisticsForm :parentData="getDataToStatisticsComponent()" id="statistics-form" class="tab"/>
    <AbilitiesForm :parentData="getDataToAbilitiesComponent()" id="abilities-form" class="tab"/>
  </div>
</template>

<script>
import StatisticsForm from '@/components/hero/owned/StatisticsForm.vue';
import AbilitiesForm from '@/components/hero/owned/AbilitiesForm.vue';
import HeroDetails from '@/components/hero/owned/HeroDetails.vue'


export default {
  components: {
    HeroDetails,
    StatisticsForm,
    AbilitiesForm,
  },
  mounted () {
    this.getHeroPrimaryDataAndPairAbilities();
  },
  ready () {
    this.displayTab('statistics-form');
  },
  data () {
    return {
      hero: null,
      statistics: [],
      heroAbilities: [],
      occupation: {},
      occupationAbilities: [],
      errors: [],
    };
  },

  methods: {
    getDataToHeroDetailsComponent: function () {
      let hero = this.hero;
      let occupation = this.occupation;
      return { hero, occupation };
    },
    getDataToStatisticsComponent: function () {
      let hero = this.hero;
      let statistics = this.statistics;
      return { hero, statistics};
    },
    getDataToAbilitiesComponent: function () {
      let hero = this.hero;
      let heroAbilities = this.heroAbilities;
      let occupation = this.occupation;
      return { hero, heroAbilities, occupation }
    },
    getHeroPrimaryDataAndPairAbilities: function () {
      this.$http
        .get(`${this.$store.state.url}hero/owned/`)
        .then(response =>  {
          this.hero = response.data.hero;
          this.statistics = this.getStatisticsWithCopy(response.data.statistics);
          this.heroAbilities = response.data.abilities;
          this.occupation = response.data.occupation;
        })
        .catch(error => (this.errors.push(error)))
    },
    getStatisticsWithCopy: function (statistics) {
      for (let i=0; i<statistics.length; i++) {
        statistics[i].pointsCopy = statistics[i].points;
      }
      return statistics;
    },
    
    displayTab: function(componentRef) {
      let tabs = document.getElementsByClassName("tab");
      for (let i=0; i<tabs.length; i++){
        tabs[i].style.display = "none";
      }
      document.getElementById(componentRef).style.display = "block";
    },
  },  
};
</script>

<style lang="scss" scoped>
.errors {
  color: red;
  font-weight: bold;
}

.bar-item {
  display: inline-block;
  margin: 10px 10px;
}
</style>
