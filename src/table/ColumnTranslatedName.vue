<template>
  <div>
    {{ translate(data).name }}
  </div>
</template>

<script>
  export default {
    props: ['data', 'index', 'column']
  }
</script>
