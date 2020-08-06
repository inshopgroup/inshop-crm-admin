<template>
  <is-show-template
    :fields="fields"
    entity="Address"
    :history-key="historyKey"
  />
</template>

<script>
export default {
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'clients',
          type: 'collection',
          link: {
            route: 'ClientShow'
          }
        },
        {
          property: 'companies',
          type: 'collection',
          link: {
            route: 'CompanyShow'
          }
        },
        {
          property: 'postCode'
        },
        {
          property: 'country',
          path: 'country.name',
          link: {
            route: 'CountryShow',
            param: 'country.id'
          }
        },
        {
          property: 'city'
        },
        {
          property: 'region'
        },
        {
          property: 'district'
        },
        {
          property: 'street'
        },
        {
          property: 'building'
        },
        {
          property: 'apartment'
        },
        {
          property: 'comment'
        }
      ]
    }
  }
}
</script>
