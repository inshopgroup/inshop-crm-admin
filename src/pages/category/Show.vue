<template>
  <is-show-template :fields="fields" entity="Category" :history-key="historyKey" />
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
          type: 'translate'
        },
        {
          property: 'description',
          type: 'translate'
        },
        {
          property: 'position',
        },
        {
          property: 'parent',
          path: 'parent.name',
          link: {
            route: 'CategoryShow',
            param: 'parent.id'
          },
        },
      ]
    }
  },
  computed: mapGetters({
    item: 'category/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'category/getItem',
      reset: 'category/reset'
    })
  }
}
</script>
