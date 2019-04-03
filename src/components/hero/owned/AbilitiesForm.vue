<template>
  <div id="abilities-form" class="tab" v-if="pairedHeroAndOccupationAbilities && hero">
    <h4>Points to use: {{ hero.ability_points }}</h4>
    <form @submit.prevent="updateAbilities">
      <div v-for="ability in pairedHeroAndOccupationAbilities">
        <label :for="ability.occupationAbility.name">{{ ability.occupationAbility.name | capitalize }}</label>
        <span></span>
        <input
          type="number" 
          :name="ability.occupationAbility.name" 
          v-bind:min="ability.heroAbility.levelCopy" 
          v-model.number="ability.heroAbility.level">
        </input>
      </div>
      <button type="submit">Update Abilities</button>
    </form>
  </div>
</template>

<script>
export default {
  mounted () {
    this.unpackData();
    this.pairHeroAndOccupationAbilities();
  },
  data () {
    return {
      hero: null,
      heroAbilities: [],
      occupationAbilities: [],
      pairedHeroAndOccupationAbilities: [],
    };
  },
  methods: {
    unpackData: function () {
      this.hero = this.$attrs.parentData.hero;
      this.heroAbilities = this.$attrs.parentData.heroAbilities;
      this.occupationAbilities = this.$attrs.parentData.occupationAbilities;
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