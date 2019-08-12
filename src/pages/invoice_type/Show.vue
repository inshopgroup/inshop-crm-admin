<template>
  <is-show-template :fields="fields" entity="InvoiceType" />
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
      ]
    }
  }
}
</script>
