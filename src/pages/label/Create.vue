<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('label_add') }}</h1>
    </section>
    <LabelForm :handle-submit="onSendForm" :item="item" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LabelForm from './Form'

export default {
  components: {
    LabelForm
  },
  computed: {
    ...mapGetters({
      item: 'label/item'
    })
  },
  methods: {
    ...mapActions({
      create: 'label/create'
    }),
    onSendForm() {
      this.create()
        .then(item => {
          this.$router.push({ name: 'LabelShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
