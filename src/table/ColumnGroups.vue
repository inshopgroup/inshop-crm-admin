<template>
  <div>
    <div v-for="group in data.groups">
      <i class="fa fa-user" aria-hidden="true"></i>

      {{group.name}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'index', 'column']
}
</script>
