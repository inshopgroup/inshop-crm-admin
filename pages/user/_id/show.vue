<template>
  <is-show-template :fields="fields" entity="User" :history-key="historyKey" />
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'authenticated',
  data() {
    return {
      historyKey: 1,
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
      ],
    }
  },
  head() {
    return {
      title: 'Homepage title',
    }
  },
}
</script>
