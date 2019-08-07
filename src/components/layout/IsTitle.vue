<template>
  <h1 class="display-3 py-5">{{ $t(title, titleParams) }}</h1>
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
