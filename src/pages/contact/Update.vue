<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('edit', {entity: item && item.value}) }}</h1>
    </section>

    <ContactForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ContactForm from './Form'

  export default {
    components: {
      ContactForm
    },
    computed: {
      ...mapGetters({
        item: 'contact/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'contact/getItem',
        update: 'contact/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'ContactShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
