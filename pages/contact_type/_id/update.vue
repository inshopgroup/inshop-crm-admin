<template>
  <is-main-template
    title="contact_type_edit"
    :title-params="{ entity: item && item.name }"
  >
    <contact-type-form :handle-submit="onSendForm" :item="item" />
  </is-main-template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ContactTypeForm from '../Form'

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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'contactType/getItem',
      update: 'contactType/update',
    }),
    onSendForm() {
      this.update()
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
