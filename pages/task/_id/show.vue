<template>
  <is-show-template :fields="fields" entity="Task" :history-key="historyKey" />
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'authenticated',
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
            route: 'project-id-show___en',
            param: 'project.id',
          },
        },
        {
          property: 'assignee',
          path: 'assignee.name',
          link: {
            route: 'user-id-show___en',
            param: 'assignee.id',
          },
        },
        {
          property: 'timeEstimated',
        },
        {
          property: 'timeSpent',
        },
      ],
    }
  },
  head() {
    return {
      title: 'Homepage title',
    }
  },
}
</script>
