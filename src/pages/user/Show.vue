<template>
  <is-show-template :fields="fields"  entity="User" />
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
          value: 'email',
          type: 'string',
        },
        {
          value: 'groups',
          type: 'object',
        },
        {
          value: 'language',
          type: 'object',
        },
      ]
    }
  }
}
</script>

