<template>
  <is-main-template title="country_add">
    <country-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CountryForm from './Form'

export default {
  components: {
    CountryForm
  },
  computed: {
    ...mapGetters({
      item: 'country/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'country/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'CountryShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
