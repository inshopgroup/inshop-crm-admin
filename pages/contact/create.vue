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
    ContactForm,
  },
  layout: 'dashboard',
  middleware: 'authenticated',
  head() {
    return {
      title: 'Homepage title',
    }
  },
  computed: {
    ...mapGetters({
      item: 'contact/item',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'contact/create',
      reset: 'contact/reset',
    }),
    onSendForm() {
      this.create()
        .then((item) => {
          this.$router.push({
            name: 'contact-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
