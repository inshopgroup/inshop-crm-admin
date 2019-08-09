<template>
  <is-show-template :fields="fields" entity="InvoiceStatus" />
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
        ]
      }
    }
  }
</script>
