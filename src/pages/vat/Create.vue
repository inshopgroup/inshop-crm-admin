<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('vat_add') }}</h1>
    </section>
    <VatForm :handle-submit="onSendForm" :item="item" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VatForm from './Form'

export default {
  components: {
    VatForm
  },
  computed: {
    ...mapGetters({
      item: 'vat/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'vat/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'VatShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
