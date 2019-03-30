<template>
  <div>
    <div v-if="errors" class="errors">
      <p v-for="error in errors">{{ error }}</p>
    </div>
    <form>
      <input type="text" placeholder="Hero name" v-model="heroName" required>
      <select v-model="selected" @change="setOccupationDescription($event)" required>
        <option disabled value="">Occupation</option>
        <option v-for="occupation in occupations">{{ occupation.name | capitalize }}</option>
      </select>
      <div v-if="selected" class="description">
        {{ description }}
      </div>
      <br />
      <input type="submit" value="Create Hero" v-on:click="createHero">
    </form>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$http
      .get(`${this.$store.state.url}hero/occupation/`)
      .then(response => (this.occupations = response.data))
      .catch(error => (this.errors.push(error)));
  },

  data() {
    return {
      heroName: '',
      occupations: null,
      selected: null,
      description: null,
      errors: [],
    };
  },

  methods: {
    createHero: function () {
      console.log('Creating');
      let occupationId = this.getOccupationId();

      if ((occupationId != null) && (this.heroName != '')){
        this.$http
        .post(`${this.$store.state.url}hero/create/`, {
          name: this.heroName,
          occupation: occupationId,
        })
        .then(response => (this.$router.push('/hero/owned/')))
        // or move logic to store, and save hero details to it.
      }
    },

    getOccupationId: function () {
      let occupation = this.getSelectedOccupationObject()
      if (occupation){
        return occupation.id;
      }
    },

    setOccupationDescription: function (event) {
      let occupation = this.getSelectedOccupationObject();
      this.description = occupation.description;
    },

    getSelectedOccupationObject: function () {
      if (this.selected != null) {
        for (var i=0; i < this.occupations.length; i++) {
          if (this.occupations[i].name == this.selected.toLowerCase()) {
            return this.occupations[i];
          }
        }
      } return null;
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
.errors {
  color: red;
  font-weight: bold;
}

.description {
  margin: 20px 0 0 0;
}
</style>
