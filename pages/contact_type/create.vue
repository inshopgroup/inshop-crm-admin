<template>
  <is-main-template title="contact_type_add">
    <contact-type-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ContactTypeForm from './Form'

export default {
  components: {
    ContactTypeForm,
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
      item: 'contactType/item',
    }),
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'contactType/create',
      reset: 'contactType/reset',
    }),
    onSendForm() {
      this.create()
        .then((item) => {
          this.$router.push({
            name: 'contact_type-id-show___en',
            params: { id: item.id },
          })
        })
        .catch()
    },
  },
}
</script>
