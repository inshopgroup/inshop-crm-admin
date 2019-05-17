<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('company_edit', {entity: item && item.name}) }}</h1>
    </section>
    <CompanyForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
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
  methods: {
    ...mapActions({
      getItem: 'company/getItem',
      update: 'company/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'CompanyShow', params: {id: item.id}})
      }).catch(e => {})
    }
  }
}
</script>
