<template>
  <is-show-template :fields="fields" entity="City" :history-key="historyKey" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'name',
        },
        {
          property: 'country',
          path: 'country.name',
          link: {
            route: 'CountryShow',
            param: 'country.id'
          },
        },
      ]
    }
  },
  computed: mapGetters({
    item: 'city/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'city/getItem',
      reset: 'city/reset'
    })
  }
}
</script>
