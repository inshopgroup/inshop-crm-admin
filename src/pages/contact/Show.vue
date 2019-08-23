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
          property: 'client',
          path: 'client.name',
          link: {
            route: 'ClientShow',
            param: 'client.id'
          }
        },
        {
          property: 'company',
          path: 'company.name',
          link: {
            route: 'CompanyShow',
            param: 'company.id'
          }
        }
      ]
    }
  }
}
</script>
