<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('contact_add') }}</h1>
    </section>
    <ContactForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ContactForm from './Form'

export default {
  components: {
    ContactForm
  },
  computed: {
    ...mapGetters({
      item: 'contact/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'contact/create'
    }),
    onSendForm() {
      this.create().then(item => {
        this.$router.push({name: 'ContactShow', params: {id: item.id}})
      }).catch(e => {})
    }
  }
}
</script>
