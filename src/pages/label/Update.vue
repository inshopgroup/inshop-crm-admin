<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('label_edit', { entity: item && item.name }) }}</h1>
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
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'label/getItem',
      update: 'label/update'
    }),
    onSendForm() {
      this.update()
        .then(item => {
          this.$router.push({ name: 'LabelShow', params: { id: item.id } })
        })
        .catch()
    }
  }
}
</script>
