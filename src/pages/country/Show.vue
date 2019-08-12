<template>
  <is-show-template :fields="fields" entity="Country" />
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
