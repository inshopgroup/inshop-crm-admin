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



  mounted () {
    this.getLast()
      .then((data) => {
        if (!this.item) {
          return 1
        }

        this.item.code = data.code + 1
      })
  },

  computed: mapGetters([
    'isLoading',
    'created',
    'violations'
  ]),

  watch: {
    // eslint-disable-next-line object-shorthand,func-names
    created: function (created) {
      if (!created) {
        return
      }

      this.$router.push({ name: 'CompanyUpdate', params: { id: created['@id'] } })
    }
  },

  methods: {
    ...mapActions([
      'create',
      'getLast',
    ]),

    onSendForm () {
      this.create(this.item)
    },

    updateField (field, value) {
      Object.assign(this.item, { [field]: value })
    }
  }
}
</script>
