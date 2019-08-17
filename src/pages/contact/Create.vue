<template>
  <is-main-template title="contact_add">
    <contact-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
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
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'contact/create',
      reset: 'contact/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'ContactShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
