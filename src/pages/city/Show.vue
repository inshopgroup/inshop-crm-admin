<template>
  <is-show-template :fields="fields" entity="City" :history-key="historyKey" />
</template>

<script>
export default {
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'name'
        },
        {
          property: 'country',
          path: 'country.name',
          link: {
            route: 'CountryShow',
            param: 'country.id'
          }
        }
      ]
    }
  }
}
</script>
