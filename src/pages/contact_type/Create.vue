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
    ContactTypeForm
  },
  computed: {
    ...mapGetters({
      item: 'contactType/item'
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      create: 'contactType/create',
      reset: 'contactType/reset'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({
            name: 'ContactTypeShow',
            params: { id: item.id }
          })
        })
        .catch()
    }
  }
}
</script>
