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
      <form>
        <div v-for="statistic in statistics">
          <label :for="statistic.name">{{ statistic.name | capitalize}}</label>
          <input :name="statistic.name" type="number" :min="statistic.points" :value="statistic.points"></input>
        </div>
        <button type="submit" v-on:click="updateStatistics()">Update Statistics</button>
      </form>
    </div>

    <!-- abilities form -->
    <div id="abilities-form" class="tab">
      <span v-for="ability in occupation_abilities">{{ ability.name | capitalize }} </span>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.getHeroPrimaryData();
    this.displayTab('statistics-form');
  },

  data () {
    return {
      hero: null,
      statistics: [],
      hero_abilities: [],
      occupation: {},
      occupation_abilities: [],
      errors: [],
    };
  },

  methods: {
    getHeroPrimaryData: function () {
      this.$http
        .get(`${this.$store.state.url}hero/owned/`)
        .then(response =>  {
          this.hero = response.data.hero;
          this.statistics = response.data.statistics;
          this.hero_abilities = response.data.abilities;
          this.occupation = response.data.occupation;
          this.getOccupationAbilities(response.data.occupation.id);
        })
        .catch(error => (this.errors.push(error)))
    },

    getOccupationAbilities: function (occupation_id) {
      this.$http
        .get(`${this.$store.state.url}hero/occupation/${occupation_id}/ability/all/`)
        .then(response =>  {
          this.occupation_abilities = response.data;
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
      pass;
    },

    updateStatistics: function () {

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
