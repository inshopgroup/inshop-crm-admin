<template>
  <is-main-template
    title="company_edit"
    :title-params="{ entity: item && item.name }"
  >
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
      item: 'company/item'
    })
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'company/getItem',
      update: 'company/update',
      reset: 'company/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'CompanyShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
