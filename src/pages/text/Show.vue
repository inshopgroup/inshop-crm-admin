<template>
  <is-show-template :fields="fields" entity="Text" />
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          value: 'title',
          type: 'string',
        },
        {
          value: 'slug',
          type: 'string',
        },
        {
          value: 'content',
          type: 'string',
        },
        {
          value: 'seoTitle',
          type: 'string',
        },
        {
          value: 'seoDescription',
          type: 'string',
        },
        {
          value: 'seoKeywords',
          type: 'string',
        },
      ]
    }
  }
}
</script>
