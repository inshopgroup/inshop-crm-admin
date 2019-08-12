<template>
  <is-show-template :fields="fields" entity="Brand" />
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
