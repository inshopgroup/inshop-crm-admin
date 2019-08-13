<template>
  <is-show-template :fields="fields" entity="Task" :history-key="historyKey" />
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
          property: 'description',
        },
        {
          property: 'status',
          path: 'status.name',
        },
        {
          property: 'deadline',
          type: 'datetime',
        },
        {
          property: 'project',
          path: 'project.name',
          link: {
            route: 'ProjectShow',
            param: 'project.id'
          },
        },
        {
          property: 'assignee',
          path: 'assignee.name',
          link: {
            route: 'UserShow',
            param: 'assignee.id'
          },
        },
        {
          property: 'timeEstimated',
        },
        {
          property: 'timeSpent',
        },
      ]
    }
  },
  computed: mapGetters({
    item: 'task/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'task/getItem',
      reset: 'task/reset'
    })
  }
}
</script>
