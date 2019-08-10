<template>
  <is-show-template :fields="fields" entity="Currency" />
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
            property: 'code',
            type: 'string',
          },
        ]
      }
    }
  }
</script>
