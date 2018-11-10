<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-show-errors :entity="'invoice_type'" :is-loading="isLoading"></item-show-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('invoice_type.tabs.general')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <div v-if="item" class="table-responsive">
              <table class="table table-striped table-hover">
                <thead>
                <tr>
                  <th width="20%">{{$t('field')}}</th>
                  <th>{{$t('value')}}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{{$t('invoice_type.name')}}</td>
                  <td>{{ item['name'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('invoice_type.createdAt')}}</td>
                  <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('invoice_type.updatedAt')}}</td>
                  <td>{{ moment(item['updateAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('invoice_type.updatedBy')}}</td>
                  <td>{{ item['updatedBy'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="history">
            <history :item="item" :entity="'InvoiceType'" :path="'invoice_type'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'InvoiceType'" :path="'invoice_type'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../layout/ItemShowActions'
import ItemShowErrors from '../layout/errors/ItemShowErrors'
import History from '../History'

export default {
  components: {History, ItemShowErrors, ItemShowActions },

  computed: mapGetters({
    isLoading: 'invoice_type/show/isLoading',
    item: 'invoice_type/show/retrieved'
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      reset: 'invoice_type/show/reset',
      retrieve: 'invoice_type/show/retrieve'
    })
  }
}
</script>
