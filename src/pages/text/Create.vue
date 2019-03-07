<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('text.add') }}</h1>
    </section>

    <TextForm :handle-submit="onSendForm" :item="item" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import TextForm from './Form'

  export default {
    components: {
      TextForm,
    },
    computed: {
      ...mapGetters({
        item: 'text/item',
      })
    },
    methods: {
      ...mapActions({
        create: 'text/create',
      }),
      onSendForm() {
        this.create().then(item => {
          this.$router.push({name: 'TextShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
