<template>
  <div>
    <div v-if="created" class="alert alert-success" role="status">{{ created['@id'] }} created.</div>
    <div v-if="updated" class="alert alert-success" role="status">{{ updated['@id'] }} updated.</div>
    <div v-if="isLoading || deleteLoading" class="alert alert-info" role="status">{{$t('loading')}}</div>
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
    name: 'ItemUpdateErrors',
    props: {
      entity: null,
      isLoading: null,
    },
    computed: {
      error () {
        return this.$store.getters[this.entity + '/update/error']
      },
      deleteError () {
        return this.$store.getters[this.entity + '/del/error']
      },
      deleteLoading () {
        return this.$store.getters[this.entity + '/del/isLoading']
      },
      created () {
        return this.$store.getters[this.entity + '/create/created']
      },
      updated () {
        return this.$store.getters[this.entity + '/update/updated']
      }
    },
  }
</script>
