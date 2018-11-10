<template>
  <div>
    <div v-if="isLoading" class="alert alert-info" role="status">{{$t('loading')}}</div>
    <div v-if="error" class="alert alert-danger" role="alert">
      <span class="fa fa-exclamation-triangle" aria-hidden="true" /> {{ error }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ItemCreateErrors',
    props: {
      entity: null,
      isLoading: null
    },
    computed: {
      error () {
        return this.$store.getters[this.entity + '/create/error']
      }
    },
  }
</script>
