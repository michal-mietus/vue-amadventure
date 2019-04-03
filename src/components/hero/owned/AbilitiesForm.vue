<template>
  <div id="abilities-form" class="tab" v-if="pairedHeroAndOccupationAbilities && hero">
    <div class="errors" v-if="errors">
      <span v-for="error in errors">{{ error }}</span>
    </div>
    <h4>Points to use: {{ hero.ability_points }}</h4>
    <form @submit.prevent="updateAbilities">
      <div v-for="ability in pairedHeroAndOccupationAbilities">
        <span>{{ ability.occupationAbility.name | capitalize}}: {{ ability.heroAbility.level }}</span>
        <span :class="'decrease-ability ' + ability.occupationAbility.id" @click="decreaseHeroAbilityPoints($event)">-</span>
        <span :class="'increase-ability ' + ability.occupationAbility.id" @click="increaseHeroAbilityPoints($event)">+</span>
      </div>
      <button type="submit">Update Abilities</button>
    </form>
  </div>
</template>

<script>
export default {
  mounted() {
    this.unpackData();
  },
  data() {
    return {
      hero: null,
      heroAbilities: [],
      occupationAbilities: [],
      pairedHeroAndOccupationAbilities: [],
      errors: [],
    };
  },
  methods: {
    unpackData: function () {
      this.hero = this.$attrs.parentData.hero;
      this.heroAbilities = this.$attrs.parentData.heroAbilities;
      let occupation = this.$attrs.parentData.occupation;
      this.occupationAbilities = this.getOccupationAbilities(occupation.id);
    },
    getOccupationAbilities: function (occupation_id) {
      this.$http
        .get(`${this.$store.state.url}hero/occupation/${occupation_id}/ability/all/`)
        .then(response =>  {
          this.occupationAbilities = response.data;
          this.pairHeroAndOccupationAbilities();
        })
        .catch(error => (this.errors.push(error)))
    },
    pairHeroAndOccupationAbilities: function () {
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
    increaseHeroAbilityPoints: function (event) {
      let classes = event.srcElement.className.split(' ');
      if (this.hero.ability_points > 0 ){
        for (let i=0; i<this.heroAbilities.length; i++){
          if (classes.includes(this.heroAbilities[i].ability.toString())) {
            this.heroAbilities[i].level += 1;
            this.hero.ability_points -= 1;
          };
        };
      };
    },
    decreaseHeroAbilityPoints: function (event) {
      let classes = event.srcElement.className.split(' ');
      for (let i=0; i<this.heroAbilities.length; i++){
        if (classes.includes(this.heroAbilities[i].ability.toString())) {
          let abilityLevel = this.heroAbilities[i].level - 1
          if (abilityLevel < this.heroAbilities[i].levelCopy){
            let error = 'You can\'t decrease your ability level.'
            if (!this.errors.includes(error)) {
              this.errors.push(error);
            } 
          } else {
            this.heroAbilities[i].level = abilityLevel;
            this.hero.ability_points += 1;
          };
        };
      };
    },
  },

  filters: {
    capitalize: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
}
</script>
<style lang="scss" scoped>
.errors {
  color: red;
  font-weight: bold;
}
</style>