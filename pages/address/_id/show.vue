<template>
  <is-show-template
    :fields="fields"
    entity="Address"
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
          property: 'clients',
          type: 'collection',
          link: {
            route: 'client-id-show___en',
          },
        },
        {
          property: 'postCode',
        },
        {
          property: 'country',
          path: 'country.name',
          link: {
            route: 'country-id-show___en',
            param: 'country.id',
          },
        },
        {
          property: 'city',
        },
        {
          property: 'region',
        },
        {
          property: 'district',
        },
        {
          property: 'street',
        },
        {
          property: 'building',
        },
        {
          property: 'apartment',
        },
        {
          property: 'comment',
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
