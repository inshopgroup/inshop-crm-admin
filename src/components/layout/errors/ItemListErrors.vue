<template>
  <div>
    <div v-if="isLoading" class="alert alert-info">{{$t('loading')}}</div>
    <div v-if="deletedItem" class="alert alert-success">{{ deletedItem['@id'] }} deleted.</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
</template>

<script>
  export default {
    name: 'ItemListErrors',
    props: {
      entity: null,
      isLoading: null,
    },
    computed: {
      error () {
        return this.$store.getters[this.entity + '/list/error']
      },
      deletedItem () {
        return this.$store.getters[this.entity + '/del/deleted']
      },
    },
  }
</script>
