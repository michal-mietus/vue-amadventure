<template>
  <div>
    <div v-if="errors" class="errors">
      <span v-for="error in errors">{{ error }}</span>
    </div>

    <!-- hero details -->
    <div v-if="hero" class="hero-details">
      <span>Name: {{ hero.name }} </span>
      <span>Occupation: {{ occupation.name }}</span>
    </div>

    <!-- tabs bar -->
    <div class="bar">
      <div class="bar-item" v-on:click="displayTab('statistics-form')">
        <h4>Statistics</h4>
      </div>
      <div class="bar-item" v-on:click="displayTab('abilities-form')">
        <h4>Abilities</h4>
      </div>
    </div>

    <!-- statistics form -->
    <div id="statistics-form" class="tab" v-if="statistics">
      <form @submit.prevent="updateStatistics">
        <div v-for="statistic in statistics">
          <label :for="statistic.name">{{ statistic.name | capitalize}}</label>
          <input :name="statistic.name" type="number" v-bind:min="statistic.pointsCopy" v-model.number="statistic.points"></input>
        </div>
        <button type="submit">Update Statistics</button>
      </form>
    </div>

    <!-- abilities form -->
    <div id="abilities-form" class="tab">
      <form @submit.prevent="updateAbilities">
        <div v-for="ability in pairedHeroAndOccupationAbilities">
          <label :for="ability.occupationAbility.name">{{ ability.occupationAbility.name | capitalize }}</label>
          <span></span>
          <input :name="ability.occupationAbility.name" type="number" v-bind:min="ability.heroAbility.levelCopy" v-model.number="ability.heroAbility.level"></input>
        </div>
        <button type="submit">Update Abilities</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.getHeroPrimaryDataAndPairAbilities();
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
      pairedHeroAndOccupationAbilities: [], 
    };
  },

  methods: {
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
          this.pairAbilities();
        })
        .catch(error => (this.errors.push(error)))
    },
    displayTab: function(tabId) {
      let tabs = document.getElementsByClassName("tab");
      for (let i=0; i<tabs.length; i++){
        tabs[i].style.display = "none";
      }
      document.getElementById(tabId).style.display = "block";
    },
    pairAbilities: function () {
      let pairedHeroAndOccupationAbilities = [];
      for (let heroAbility=0; heroAbility<this.heroAbilities.length; heroAbility++){
        for (let ability=0; ability<this.occupationAbilities.length; ability++){
          if (this.heroAbilities[heroAbility].ability == this.occupationAbilities[ability].id){
            let heroAbilityWithCopyLevels = this.heroAbilities[heroAbility];
            heroAbilityWithCopyLevels.levelCopy = heroAbilityWithCopyLevels.level; 
            let pairedHeroAndOccupationAbilitiesObjects = {
              heroAbility: this.heroAbilities[heroAbility],
              occupationAbility: this.occupationAbilities[ability]
            };
            pairedHeroAndOccupationAbilities.push(pairedHeroAndOccupationAbilitiesObjects);
          }
        }
      }
      this.pairedHeroAndOccupationAbilities = pairedHeroAndOccupationAbilities;
    },
    updateStatistics: function () {
      this.checkStatisticsForm();
      if (this.errors == 0) { // don't knwo why comparing to empty list returns false but to 0 is true...
        this.sendStatisticsToApi();
      };
    },
    checkStatisticsForm: function () {
      this.errors = [];
      for (let statistic=0; statistic<this.statistics.length; statistic++){
        if(this.statistics[statistic].points < this.statistics[statistic].pointsCopy){
          let error = 'You can\'t decrease your statistics.';
          this.errors.push(error);
        }
      };
    },
    sendStatisticsToApi: function () {
      console.log('sending');
    },
    updateAbilities: function () {
      this.checkAbilitiesForm();
    },
    checkAbilitiesForm: function () {

    },
  },

  filters: {
    capitalize: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>

<style lang="scss" scoped>
#statistics {
  margin: 40px 0 0 0;
}

#statistics span, #abilities span {
  padding: 5px;
  display: block;
}

.hero-details span {
  margin: 10px;
  padding: 10px;
  border: 1px solid;
  font-weight: bold;
}

.errors {
  color: red;
  font-weight: bold;
}

.bar-item {
  display: inline-block;
  margin: 10px 10px;
}
</style>
