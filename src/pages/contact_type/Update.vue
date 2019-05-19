<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('contact_type_edit', {entity: item && item.name}) }}</h1>
    </section>
    <ContactTypeForm
      :handle-submit="onSendForm"
      :item="item"
    />
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
      item: 'contactType/item'
    })
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'contactType/getItem',
      update: 'contactType/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'ContactTypeShow', params: {id: item.id}})
      }).catch()
    }
  }
}
</script>
