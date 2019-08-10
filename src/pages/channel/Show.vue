<template>
  <is-show-template :fields="fields" entity="Channel" />
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
            property: 'currency',
            value: 'currency.name',
            type: 'string',
          },
        ]
      }
    }
  }
</script>
