<template>
  <is-main-template title="city_add">
    <city-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CityForm from './Form'

export default {
  components: {
    CityForm
  },
  computed: {
    ...mapGetters({
      item: 'city/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'city/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'CityShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
