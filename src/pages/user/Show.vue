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
          path: 'groups',
          type: 'collection',
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
