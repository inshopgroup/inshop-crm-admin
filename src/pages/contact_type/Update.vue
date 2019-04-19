<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('edit', {entity: item && item.name}) }}</h1>
    </section>

    <ContactTypeForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ContactTypeForm from './Form'

  export default {
    components: {
      ContactTypeForm
    },
    computed: {
      ...mapGetters({
        item: 'contact_type/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'contact_type/getItem',
        update: 'contact_type/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'ContactTypeShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
