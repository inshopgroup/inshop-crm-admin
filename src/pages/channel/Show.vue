<template>
  <is-show-template :fields="fields" entity="Channel" />
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
