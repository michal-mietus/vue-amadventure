<template>
  <div>
    <div v-if="locations" class="locations">
      <div v-for="location in locations" class="location">
        <p @click="moveToFightView($event)" :id="location.id">{{ location.name }}</p>
        <p>{{ location.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  data () {
    return {
      locations: [],
    };
  },

  mounted () {
    this.locations = this.getLocations();
  },

  methods: {
    getLocations: function() {
      this.$http
        .get(`${this.$store.state.url}artifical/location/`)
        .then(response => (this.locations = response.data))
        .catch(error => (console.error(error)));
    },
    moveToFightView: function(event ) {
      const location = this.findLocation(parseInt(event.originalTarget.id));
      const parameters = {
        locationId: location.id
      };
      this.$router.push({ name: 'fight', params: parameters });
    },
    findLocation: function(location_id) {
      for(let location=0; location<this.locations.length; location++){
        if(this.locations[location].id == location_id){
          return this.locations[location];
        };
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.locations {
  display: flex;
  flex-direction: column;
}
.location {
  border: 1px solid;
  margin: 15px;
}
.location p:first-child {
  border: 1px solid;
  text-decoration: none;
  background-color: #CFD1FE;
  padding: 5px;
}
</style>
