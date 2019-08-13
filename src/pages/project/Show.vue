<template>
  <is-show-template :fields="fields" entity="Project" :history-key="historyKey" />
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
          type: 'string',
        },
        {
          property: 'description',
          type: 'string',
        },
        {
          property: 'type',
          path: 'type.name',
        },
        {
          property: 'status',
          path: 'status.name',
        },
        {
          property: 'client',
          path: 'client.name',
          link: {
            route: 'ClientShow',
            param: 'client.id'
          },
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      item: 'project/item'
    })
  },
  created() {
    this.loadProject()
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'project/getItem',
      reset: 'project/reset'
    }),
    loadProject() {
      this.getItem(this.$route.params.id)
    }
  }
}
</script>
