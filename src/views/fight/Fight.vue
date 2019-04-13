<template>
  <div>
    <h2>Fight</h2>
    <div class="info-container">
      <FighterInfoComponent :data="heroData" class="fighter border"/>
      <FighterInfoComponent :data="mobData" class="fighter border"/>
    </div>
    <div class="abilities-container border">
      <AbilityComponent v-for="ability in abilities" :ability="ability" class="ability"/>
    </div>
  </div>
</template>

<script>
import FighterInfoComponent from '@/components/fight/FighterInfoComponent.vue';
import AbilityComponent from '@/components/fight/AbilityComponent.vue';

export default {
  components: {
    FighterInfoComponent,
    AbilityComponent,
  },

  data () {
    return {
      heroData: null,
      mobData: null,
      abilities: null,
    };
  },

  // socket keys are socket emits names 
  sockets: {
    returnedData: function (data) {
      console.log('Returned data', data);
      console.log(this.heroData);
      this.mobData = {
        object: data.mob,
        fightingMob: data.fighting_mob,
        statistics: data.fighting_mob_statistics,
      }
      
      this.heroData = {
        object: data.hero,
        abilities: data.hero_abilities,
        statistics: data.hero_statistics,
      };

      this.abilities = data.abilities;
    },
  },
  
  mounted() {
    this.getData();
  },

  methods: {
    getData: function () {
      const locationId = this.$route.params.locationId;
      const token = this.$store.state.token;
      this.$socket.emit('getData', { token, locationId });
    },
  },
};
</script>
<style lang="scss" scoped>

.border, .ability {
  border: 1px solid;
}

.ability {
  flex-grow: 1;
}

.info-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.abilities-container {
  display: flex;
}

.fighter {
  margin: 10px;
}

</style>