<template>
  <h1 class="display-1 ml-lg-5 py-2 py-lg-4">{{ $t(title, titleParams) }}</h1>
</template>

<script>
export default {
  name: 'IsTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    titleParams: {
      type: Object,
      default: null
    }
  }
}
</script>
