<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('company_add') }}</h1>
    </section>
    <CompanyForm :handle-submit="onSendForm" :item="item"/>
  </div>
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
  methods: {
    ...mapActions({
      create: 'company/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'CompanyShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
