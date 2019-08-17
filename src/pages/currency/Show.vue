<template>
  <is-show-template
    :fields="fields"
    entity="Currency"
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
          property: 'code',
          type: 'string'
        }
      ]
    }
  }
}
</script>
