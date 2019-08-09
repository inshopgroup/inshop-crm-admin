<template>
  <is-show-template :fields="fields" entity="Language" />
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
            value: 'code',
            type: 'string',
          },
        ]
      }
    }
  }
</script>
