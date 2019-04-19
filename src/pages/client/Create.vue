<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('add') }}</h1>
    </section>

    <ClientForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ClientForm from './Form'

  export default {
    components: {
      ClientForm
    },
    computed: {
      ...mapGetters({
        item: 'client/item',
      })
    },
    methods: {
      ...mapActions({
        create: 'client/create',
      }),
      onSendForm() {
        this.create().then(item => {
          this.$router.push({name: 'ClientShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
