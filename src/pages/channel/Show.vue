<template>
  <is-show-template
    :fields="fields"
    entity="Channel"
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
          property: 'currency',
          path: 'currency.name',
          type: 'string'
        }
      ]
    }
  }
}
</script>
