<template>
  <is-show-template :fields="fields" entity="Vat" :history-key="historyKey" />
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
          property: 'value',
          type: 'string'
        }
      ]
    }
  }
}
</script>
