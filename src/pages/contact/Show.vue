<template>
  <is-show-template :fields="fields" entity="Contact" :history-key="historyKey" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'value',
        },
        {
          property: 'contactType',
          path: 'contactType.name'
        },
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
      ]
    }
  },
  computed: mapGetters({
    item: 'contact/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'contact/getItem',
      reset: 'contact/reset'
    })
  }
}
</script>
