<template>
  <!-- statistics form -->
    <div id="statistics-form" class="tab" v-if="statistics">
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
          this.statistics[i].points += 1;
        };
      };
    },
    decreaseHeroStatisticPoints: function (event) {
      let classes = event.srcElement.className.split(' ');
      for (let i=0; i<this.statistics.length; i++){
        if (classes.includes(this.statistics[i].name)) {
          this.statistics[i].points -= 1;
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
      this.$http
        .post(`${this.$store.state.url}hero/statistic/all/upgrade/`, {statistics})
        .then(response => (this.$router.push('/hero/owned')))
        .catch(error => (this.errors.push(error)))
    },
    deletePointsCopies: function () {
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
