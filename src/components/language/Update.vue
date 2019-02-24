<template>
  <div>
    <section class="content-header">
      <h1>{{ $t('language.edit', {entity: item && item.name}) }}</h1>
    </section>

    <LanguageForm :handle-submit="onSendForm" :item="item"/>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import LanguageForm from './Form'

  export default {
    components: {
      LanguageForm
    },
    computed: {
      ...mapGetters({
        item: 'language/item',
      })
    },
    created() {
      this.getItem(this.$route.params.id)
    },
    methods: {
      ...mapActions({
        getItem: 'language/getItem',
        update: 'language/update',
      }),
      onSendForm() {
        this.update().then(item => {
          this.$router.push({name: 'LanguageShow', params: {id: item.id}})
        }).catch(e => {})
      }
    }
  }
</script>
