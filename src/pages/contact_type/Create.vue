<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('contact_type_add') }}</h1>
    </section>
    <ContactTypeForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ContactTypeForm from './Form'

export default {
  components: {
    ContactTypeForm
  },
  computed: {
    ...mapGetters({
      item: 'contact_type/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'contact_type/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'ContactTypeShow', params: {id: item.id}})
      }).catch(e => {})
    }
  }
}
</script>
