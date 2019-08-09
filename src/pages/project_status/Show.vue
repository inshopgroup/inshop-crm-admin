<template>
  <is-show-template :fields="fields" entity="ProjectStatus" />
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
