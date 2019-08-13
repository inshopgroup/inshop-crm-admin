<template>
  <is-show-template :fields="fields" entity="Backup" :history-key="historyKey" />
</template>

<script>
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
          property: 'size',
          type: 'string',
        },
        {
          property: 'status',
          path: 'status.name',
          type: 'string',
        },
        {
          property: 'type',
          path: 'type.name',
          type: 'string',
        },
      ]
    }
  }
}
</script>
