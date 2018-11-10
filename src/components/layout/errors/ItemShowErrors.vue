<template>
  <div>
    <!--<div v-if="isLoading" class="alert alert-info" role="status">{{$t('loading')}}</div>-->
    <div v-if="error" class="alert alert-danger" role="alert">
      <span class="fa fa-exclamation-triangle" aria-hidden="true" /> {{ error }}
    </div>
    <div v-if="deleteError" class="alert alert-danger" role="alert">
      <span class="fa fa-exclamation-triangle" aria-hidden="true" /> {{ deleteError }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ItemShowErrors',
    props: {
      entity: null,
      isLoading: null
    },
    computed: {
      error () {
        return this.$store.getters[this.entity + '/show/error']
      },
      deleteError () {
        return this.$store.getters[this.entity + '/del/error']
      }
    }
  }
</script>
