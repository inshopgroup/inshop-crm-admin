<template>
  <is-show-template
    :fields="fields"
    entity="Contact"
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
          property: 'value'
        },
        {
          property: 'contactType',
          path: 'contactType.name'
        },
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
        }
      ]
    }
  }
}
</script>
