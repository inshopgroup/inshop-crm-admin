<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'backup'" :is-loading="isLoading"></item-errors>

      <div class="nav-tabs-custom" v-if="item">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('backup.tabs.general')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <table class="table table-striped table-hover">
              <thead>
              <tr>
                <th width="20%">{{$t('field')}}</th>
                <th>{{$t('value')}}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{$t('backup.name')}}</td>
                <td>{{ item['name'] }}</td>
              </tr>
              <tr>
                <td>{{$t('backup.size')}}</td>
                <td>{{ item['size'] }}</td>
              </tr>
              <tr>
                <td>{{$t('backup.status.name')}}</td>
                <td><span v-if="item['status']">{{ item['status']['name'] }}</span></td>
              </tr>
              <tr>
                <td>{{$t('backup.type.name')}}</td>
                <td><span v-if="item['type']">{{ item['type']['name'] }}</span></td>
              </tr>
              <tr>
                <td>{{$t('backup.createdAt')}}</td>
                <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
              </tr>
              <tr>
                <td>{{$t('backup.updatedAt')}}</td>
                <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
              </tr>
              <tr>
                <td>{{$t('backup.updatedBy')}}</td>
                <td>{{ item['updatedBy'] }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane" id="history">
            <history :item="item" :entity="'Backup'" :path="'backup'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Backup'" :path="'backup'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../layout/ItemShowActions'
import ItemErrors from '../layout/errors/ItemErrors'
import History from '../History'

export default {
  components: {History, ItemErrors, ItemShowActions},
  computed: mapGetters({
    isLoading: 'general/isLoading',
    item: 'backup/item'
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      reset: 'backup/reset',
      getItem: 'backup/getItem'
    })
  }
}
</script>
