<template>
  <is-show-template :fields="fields" entity="Address" :history-key="historyKey" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'clients',
          type: 'collection',
          link: {
            route: 'ClientShow'
          },
        },
        {
          property: 'companies',
          type: 'collection',
          link: {
            route: 'CompanyShow'
          },
        },
        {
          property: 'postCode',
        },
        {
          property: 'country',
          path: 'country.name',
          link: {
            route: 'CountryShow',
            param: 'country.id'
          },
        },
        {
          property: 'city',
          path: 'city.name',
          link: {
            route: 'CityShow',
            param: 'city.id'
          },
        },
        {
          property: 'region',
        },
        {
          property: 'district',
        },
        {
          property: 'street',
        },
        {
          property: 'building',
        },
        {
          property: 'apartment',
        },
        {
          property: 'comment',
        },
      ]
    }
  },
  computed: mapGetters({
    item: 'address/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'address/getItem',
      reset: 'address/reset'
    })
  }
}
</script>
