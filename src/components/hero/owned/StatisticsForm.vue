<template>
  <!-- statistics form -->
    <div id="statistics-form" class="tab" v-if="statistics">
      <div class="success" v-if="success">
        <span>{{ success }}</span>
      </div>
      <div class="error" v-if="errors">
        <span v-for="error in errors ">{{ error }}</span>
      </div>
      <h4>Points to use: {{ hero.statistic_points }}</h4>
      <!--<form @submit.prevent="updateStatistics">-->
        <div v-for="statistic in statistics">
          <span>{{ statistic.name | capitalize}}: {{ statistic.points }}</span>
          <span :class="'decrease-statistic ' + statistic.name" @click="decreaseHeroStatisticPoints($event)">-</span>
          <span :class="'increase-statistic ' + statistic.name" @click="increaseHeroStatisticPoints($event)">+</span>
        </div>
        <button type="submit" @click="updateStatistics()">Update Statistics</button>
      </form>
    </div>
</template>

<script>
export default {
  mounted () {
    this.unpackData();
  },
  data () {
    return {
      statistics: null,
      hero: null,
      success: null,
      errors: [],
    };
  },
  methods: {
    unpackData: function () {
      this.statistics = this.$attrs.parentData.statistics;
      this.hero = this.$attrs.parentData.hero;
    },
    increaseHeroStatisticPoints: function (event) {
      let classes = event.srcElement.className.split(' ');
      for (let i=0; i<this.statistics.length; i++){
        if (classes.includes(this.statistics[i].name)) {
          if (this.hero.statistic_points <= 0){
            let error = 'You don\'t have enough statistic points.'
            if (!this.errors.includes(error)) {
              this.errors.push(error);
            };  
          } else {
            this.statistics[i].points += 1;
            this.hero.statistic_points -= 1;
          };
        };
      };
    },
    decreaseHeroStatisticPoints: function (event) {
      let classes = event.srcElement.className.split(' ');
      for (let i=0; i<this.statistics.length; i++){
        if (classes.includes(this.statistics[i].name)) {
          let decreasedStatisticPoints = this.statistics[i].points - 1;
          if (decreasedStatisticPoints < this.statistics[i].pointsCopy){
            let error = 'You can\'t decrease your statistic points.'
            if (!this.errors.includes(error)) {
              this.errors.push(error);
            };  
          } else {
            this.statistics[i].points -= 1;
            this.hero.statistic_points += 1;
          };
        };
      };
    },
    updateStatistics: function () {
      this.checkStatisticsForm();
      if (this.errors == 0) {
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
      let statistics = this.deletePointsCopies();
      let heroStatisticPoints = this.hero.statistic_points;
      this.$http
        .post(`${this.$store.state.url}hero/statistic/all/upgrade/`, {statistics, heroStatisticPoints})
        .then(response => (this.successfullyUpgraded()))
        .catch(error => (this.errors.push(error)))
    },
    successfullyUpgraded: function (response) {
      this.success = 'Your hero has been upgraded.';
      this.$router.push('/hero/owned');
      // TODO after updating hero, memory is not cleaned and levels copies are deleted,
      // this allows user to decreasing their abilities
    },
    deletePointsCopies: function () {
      // TODO program is deleting data from this.statistics instead of copy. 
      // That occurs with error when user send data, he can change it as he want, bcs there isnt pointsCopy
      let statistics = this.statistics;
      for (let i=0; i<statistics.length; i++) {
        delete statistics[i].pointsCopy;
      };
      return statistics;
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
.success {
  color: green;
  font-weight: bold;
}
.error {
  color: red;
  font-weight: bold;
}
</style>