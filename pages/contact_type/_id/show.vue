<template>
  <is-show-template
    :fields="fields"
    entity="ContactType"
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
          property: 'name',
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
