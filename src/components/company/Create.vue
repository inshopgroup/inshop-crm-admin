<template>
  <div>
    <section class="content-header">
      <h1>{{$t('company.add')}}</h1>
    </section>

    <section class="content">
      <div class="box box-primary">
        <div class="box-body">
          <item-errors :entity="'template'" :is-loading="isLoading"></item-errors>

          <CompanyForm
            :handle-submit="onSendForm"

            :item="item"
            :errors="errors"

          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import CompanyForm from './Form'
import ItemErrors from '../layout/errors/ItemErrors'

import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    ItemErrors,
    CompanyForm
  },
  beforeDestroy() {
    this.reset()
  },

  mounted () {
    this.getLast()
      .then((data) => {
        if (!this.item) {
          return 1
        }

        this.item.code = data.code + 1
      })
  },

  computed: mapGetters({
    item: 'contact/item',
    isLoading: 'general/isLoading',
    errors: 'contact/errors'
  }),

  methods: {
    ...mapActions({
      create: 'company/create',
      reset: 'company/reset'
    }),
    onSendForm () {
      this.create().then(created => {
        this.$router.push({name: 'CompanyShow', params: {id: created.id}})
      }).catch(e => {})
    }
  }
}
</script>
