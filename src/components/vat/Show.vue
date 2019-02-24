<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'vat'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('vat.tabs.general')}}</a></li>
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
                  <td>{{$t('vat.name')}}</td>
                  <td>{{ item['name'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('vat.value')}}</td>
                  <td>{{ item['value'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('vat.createdAt')}}</td>
                  <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('vat.updatedAt')}}</td>
                  <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('vat.updatedBy')}}</td>
                  <td>{{ item['updatedBy'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="history">
            <history :id="parseInt($route.params.id)" :entity="'Vat'" :path="'vat'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Vat'" :path="'vat'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../layout/ItemShowActions'
import ItemErrors from '../layout/errors/ItemErrors'
import History from '../History'

export default {
  components: {History, ItemErrors, ItemShowActions },

  computed: mapGetters({
    item: 'vat/item'
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(this.$route.params.id)
  },

  methods: {
    ...mapActions({
      reset: 'vat/reset',
      getItem: 'vat/getItem'
    })
  }
}
</script>
