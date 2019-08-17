<template>
  <is-main-template title="company_add">
    <company-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CompanyForm from './Form'

export default {
  components: {
    CompanyForm
  },
  computed: {
    ...mapGetters({
      item: 'contact/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'company/create',
      reset: 'company/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'CompanyShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
