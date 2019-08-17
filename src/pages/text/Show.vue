<template>
  <is-show-template :fields="fields" entity="Text" :history-key="historyKey" />
</template>

<script>
export default {
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'title',
          type: 'translate'
        },
        {
          property: 'slug',
          type: 'translate'
        },
        {
          property: 'content',
          type: 'translate'
        },
        {
          property: 'seoTitle',
          type: 'translate'
        },
        {
          property: 'seoDescription',
          type: 'translate'
        },
        {
          property: 'seoKeywords',
          type: 'translate'
        }
      ]
    }
  }
}
</script>
