<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('text_edit', {entity: item && item.title}) }}</h1>
    </section>
    <TextForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TextForm from './Form'

export default {
  components: {
    TextForm
  },
  computed: {
    ...mapGetters({
      item: 'text/item'
    })
  },
  created() {
    this.getItem(this.$route.params.id)
  },
  methods: {
    ...mapActions({
      getItem: 'text/getItem',
      update: 'text/update'
    }),
    onSendForm() {
      this.update().then(item => {
        this.$router.push({name: 'TextShow', params: {id: item.id}})
      }).catch(e => {})
    }
  }
}
</script>
