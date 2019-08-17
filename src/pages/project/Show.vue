<template>
  <is-show-template
    :fields="fields"
    entity="Project"
    :history-key="historyKey"
  />
</template>

<script>
export default {
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'name',
          type: 'string'
        },
        {
          property: 'description',
          type: 'string'
        },
        {
          property: 'type',
          path: 'type.name'
        },
        {
          property: 'status',
          path: 'status.name'
        },
        {
          property: 'client',
          path: 'client.name',
          link: {
            route: 'ClientShow',
            param: 'client.id'
          }
        }
      ]
    }
  }
}
</script>
