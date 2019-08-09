<template>
  <is-show-template :fields="fields" entity="Vat" />
</template>

<script>
  export default {
    data() {
      return {
        fields: [
          {
            value: 'name',
            type: 'string',
          },
          {
            value: 'value',
            type: 'string',
          },
        ]
      }
    }
  }
</script>
