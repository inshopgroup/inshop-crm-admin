<template>
  <div>
    <section class="content-header">
      <h1>{{$t('add')}}</h1>
    </section>

    <BrandForm :handle-submit="onSendForm" :item="item" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import BrandForm from './Form'

  export default {
    components: {
      BrandForm
    },
    computed: {
      ...mapGetters({
        item: 'brand/item',
      })
    },
    methods: {
      ...mapActions({
        create: 'brand/create',
      }),
      onSendForm () {
        this.create().then(item => {
          this.$router.push({name: 'BrandShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
