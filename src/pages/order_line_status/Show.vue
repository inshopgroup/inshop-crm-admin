<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'order_line_status'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('tabs_general')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs_history')}}</a></li>
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
                  <td>{{$t('name')}}</td>
                  <td>{{ item['name'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('createdAt')}}</td>
                  <td>{{ fecha.format(fecha.parse(item.createdAt, 'YYYY-MM-DDTHH:mm:ss'), 'DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('updatedAt')}}</td>
                  <td>{{ fecha.format(fecha.parse(item.updatedAt, 'YYYY-MM-DDTHH:mm:ss'), 'DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('updatedBy')}}</td>
                  <td>{{ item['updatedBy'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="tab-pane" id="history">
          <history :id="parseInt($route.params.id)" :entity="'OrderLineStatus'" :path="'order_line_status'" :key="historyKey"></history>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'OrderLineStatus'" :path="'order_line_status'"></item-show-actions>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ItemShowActions from '../../components/layout/ItemShowActions'
  import ItemErrors from '../../components/layout/errors/ItemErrors'
  import History from '../../components/History'
  import fecha from 'fecha'

  export default {
    components: {History, ItemErrors, ItemShowActions},
    data () {
      return {
        historyKey: 1,
        fecha: fecha,
      }
    },
    computed: mapGetters({
      item: 'order_line_status/item'
    }),
    created() {
      this.getItem(this.$route.params.id)
    },
    beforeDestroy() {
      this.reset()
    },
    methods: {
      ...mapActions({
        getItem: 'order_line_status/getItem',
        reset: 'order_line_status/reset'
      })
    }
  }
</script>
