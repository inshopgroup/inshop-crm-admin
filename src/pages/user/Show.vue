<template>
  <is-show-template :fields="fields" entity="User" />
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
          property: 'email',
          type: 'string',
        },
        {
          property: 'groups',
          path: 'groups[0].name',
          type: 'string',
        },
        {
          property: 'language',
          path: 'language.name',
          type: 'string',
        },
      ]
    }
  }
}
</script>

