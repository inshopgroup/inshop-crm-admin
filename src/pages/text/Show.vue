<template>
  <is-show-template :fields="fields" entity="Text" />
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          property: 'translations',
          path: 'translations[0].title',
          type: 'string',
        },
        {
          property: 'slug',
          type: 'string',
        },
        {
          property: 'translations',
          path: 'translations[0].content',
          type: 'string',
        },
        {
          property: 'translations',
          path: 'translations[0].seoTitle',
          type: 'string',
        },
        {
          property: 'translations',
          path: 'translations[0].seoDescription',
          type: 'string',
        },
        {
          property: 'translations',
          path: 'translations[0].seoKeywords',
          type: 'string',
        },
      ]
    }
  }
}
</script>
