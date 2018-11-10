<template>
<div>
  <div v-for="label in data.labels">
    <span class="label label-primary">{{label.name}}</span>
  </div>
</div>
</template>

<script>
export default {
  props: ['data', 'index', 'column']
}
</script>
