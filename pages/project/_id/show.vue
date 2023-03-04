<template>
  <is-show-template
    :fields="fields"
    entity="Project"
    :history-key="historyKey"
  ></is-show-template>
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
            route: 'client-id-show___en',
            param: 'client.id',
          },
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
