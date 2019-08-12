<template>
  <is-show-template :fields="fields" entity="OrderLineStatus" />
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
