<template>
  <is-show-template :fields="fields" entity="Brand" />
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
