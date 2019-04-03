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
      let occupationAbilities = this.occupationAbilities;
      return { hero, heroAbilities, occupationAbilities }
    },
    getHeroPrimaryDataAndPairAbilities: function () {
      this.$http
        .get(`${this.$store.state.url}hero/owned/`)
        .then(response =>  {
          this.hero = response.data.hero;
          this.statistics = this.getStatisticsWithCopy(response.data.statistics);
          this.heroAbilities = response.data.abilities;
          this.occupation = response.data.occupation;
          this.getOccupationAbilities(response.data.occupation.id);
        })
        .catch(error => (this.errors.push(error)))
    },
    getStatisticsWithCopy: function (statistics) {
      for (let i=0; i<statistics.length; i++) {
        statistics[i].pointsCopy = statistics[i].points;
      }
      return statistics;
    },
    getOccupationAbilities: function (occupation_id) {
      this.$http
        .get(`${this.$store.state.url}hero/occupation/${occupation_id}/ability/all/`)
        .then(response =>  {
          this.occupationAbilities = response.data;
          this.displayTab('statistics-form');
        })
        .catch(error => (this.errors.push(error)))
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
