<template>
  <div v-if="areFighting()">
    <div>
      <h2>Fight</h2>
      <div class="info-container">
        <FighterInfoComponent :fighter="fightingHero" class="fighter border"/>
        <FighterInfoComponent :fighter="fightingMob" class="fighter border"/>
      </div>
      <div class="border" @click="attack">
        Attack
      </div>
      <div class="abilities-container border">
        <h3>Abilities</h3>
        <AbilityComponent v-for="ability in abilities" :ability="ability" :key="ability.pk" class="ability" />
      </div>
    </div>
    <div>

    </div>
  </div>
  <div v-else-if="winner">
    <p>{{ this.winner.additionalText }} </p>
    <div v-if="droppedItem">
      <p>You dropped item!</p>
      <ItemComponent 
        :item="droppedItem.item" 
        :itemStatistics="droppedItem.item_statistics"
      />
    </div>
    <div>
      <p>Do you want to keep this item?</p>
      <p>
        <span @click="keepItem">Yes</span>
        <span>No</span>
      </p>
    </div>
  </div>
</template>

<script>
import FighterInfoComponent from '@/components/fight/FighterInfoComponent.vue';
import AbilityComponent from '@/components/fight/AbilityComponent.vue';
import ItemComponent from '@/components/artifical/ItemComponent.vue';


export default {
  components: {
    FighterInfoComponent,
    AbilityComponent,
    ItemComponent,
  },

  data () {
    return {
      fightingHero: null,
      fightingMob: null,
      abilities: null,
      winner: null,
      droppedItem: null,
    };
  },

  mounted() {
    this.getData();
  },

  beforeRouteLeave (to, from, next) {
    if (!this.winner){
      this.$socket.emit('userLeaveFight');
    }
    next();
  },

  methods: {
    getData: function () {
      const locationId = this.$route.params.locationId;
      const token = this.$store.state.token;
      this.$socket.emit('getData', { token, locationId });
    },
    attack: function () {
      this.$socket.emit('attack');
    },

    areFighting: function () {
      return this.fightingHero && this.fightingMob;
    },
    replaceAll: function(target, search, replacement) {
      return target.replace(new RegExp(search, 'g'), replacement);
    },

    convertRarityToJson: function(item) {
      let rarity = this.replaceAll(item.rarity, '\'', '"');
      rarity = '\'' + rarity + '\'';
      rarity = rarity.slice(1, rarity.length-1);
      return JSON.parse(rarity);
    },

    keepItem: function () {
      this.$socket.emit('saveItemToHero');
    },
  },

  // socket keys are socket emits names 
  sockets: {
    getData: function (data) {
      this.fightingHero = data.fightingHero;
      this.fightingMob = data.fightingMob;
      this.abilities = data.abilities;
    },

    fightersChanged: function ({ hero, mob }) {
      this.fightingHero = hero;
      this.fightingMob = mob;
      console.log(hero, mob);
    },

    fightResult: function ({ hero, mob, winner }){
      this.fightingHero = null;
      this.fightingMob = null;
      if (winner == 'hero') {
        this.winner = hero;
        this.winner.additionalText = 'You won!'
      } else {
        this.winner = mob;
        this.winner.additionalText = 'You lose.'
      }
    },
    itemDropped: function ({ item, item_statistics }){
      this.droppedItem = { item, item_statistics};
      let rarity = this.convertRarityToJson(item);
      this.droppedItem.item.rarity = rarity;
    }
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