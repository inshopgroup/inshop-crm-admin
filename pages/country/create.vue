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
    CountryForm,
  },
  layout: 'dashboard',
  middleware: 'authenticated',
  head() {
    return {
      title: 'Homepage title',
    }
  },
  computed: {
    ...mapGetters({
      item: 'country/item',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'country/create',
      reset: 'country/reset',
    }),
    onSendForm() {
      this.create()
        .then((item) => {
          this.$router.push({
            name: 'country-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
