<template>
  <is-show-template
    :fields="fields"
    entity="Contact"
    :history-key="historyKey"
  />
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
          property: 'value',
        },
        {
          property: 'contactType',
          path: 'contactType.name',
        },
        {
          property: 'clients',
          type: 'collection',
          link: {
            route: 'client-id-show___en',
          },
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
