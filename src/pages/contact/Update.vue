<template>
  <is-main-template
    title="contact_edit"
    :title-params="{ entity: item && item.value }"
  >
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
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'contact/getItem',
      update: 'contact/update',
      reset: 'contact/reset'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'ContactShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
