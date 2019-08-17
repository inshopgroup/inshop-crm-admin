<template>
  <is-show-template
    :fields="fields"
    entity="Category"
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
          property: 'name',
          type: 'translate'
        },
        {
          property: 'description',
          type: 'translate'
        },
        {
          property: 'position'
        },
        {
          property: 'parent',
          path: 'parent.name',
          link: {
            route: 'CategoryShow',
            param: 'parent.id'
          }
        }
      ]
    }
  }
}
</script>
