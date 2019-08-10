<template>
  <is-show-template :fields="fields" entity="Vat" />
</template>

<script>
  export default {
    data() {
      return {
        fields: [
          {
            property: 'name',
            type: 'string',
          },
          {
            property: 'value',
            type: 'string',
          },
        ]
      }
    }
  }
</script>
