<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['number'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'order_header'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('tabs_general')}}</a></li>
          <li><a href="#lines" data-toggle="tab" aria-expanded="false">{{$t('tabs_lines')}}</a></li>
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
                  <td>{{$t('number')}}</td>
                  <td>{{ item['number'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('client_name')}}</td>
                  <td>
                    <router-link v-if="item['client']" :to="{name: 'ClientShow', params: { id: item['client'].id }}">
                      {{ item['client']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('channel_name')}}</td>
                  <td>
                    <router-link v-if="item['channel']" :to="{name: 'ChannelShow', params: { id: item['channel'].id }}">
                      {{ item['channel']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('paymentType_name')}}</td>
                  <td>
                    <router-link v-if="item['paymentType']" :to="{name: 'PaymentTypeShow', params: { id: item['paymentType'].id }}">
                      {{ item['paymentType']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('shipmentMethod_name')}}</td>
                  <td>
                    <router-link v-if="item['shipmentMethod']" :to="{name: 'ShipmentMethodShow', params: { id: item['shipmentMethod'].id }}">
                      {{ item['shipmentMethod']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('status_name')}}</td>
                  <td>
                    <router-link v-if="item['status']" :to="{name: 'OrderStatusShow', params: { id: item['status'].id }}">
                      {{ item['status']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('channel_currency_name')}}</td>
                  <td>
                    <router-link v-if="item['channel'] && item['channel']['currency']" :to="{name: 'CurrencyShow', params: { id: item['channel']['currency'].id }}">
                      {{ item['channel']['currency']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('createdAt')}}</td>
                  <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('updatedAt')}}</td>
                  <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('updatedBy')}}</td>
                  <td>{{ item['updatedBy'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="lines">
            <div v-if="item" class="table-responsive">
              <lines :lines="item.lines"></lines>
            </div>
          </div>
          <div class="tab-pane" id="history">
            <history :id="parseInt($route.params.id)" :entity="'OrderHeader'" :path="'order_header'" :key="historyKey"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'OrderHeader'" :path="'order_header'"></item-show-actions>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ItemShowActions from '../../components/layout/ItemShowActions'
  import ItemErrors from '../../components/layout/errors/ItemErrors'
  import Lines from './Lines'
  import History from '../../components/History'

  export default {
    components: {History, Lines, ItemErrors, ItemShowActions},
    data () {
      return {
        historyKey: 1,
      }
    },
    computed: mapGetters({
      item: 'order_header/item'
    }),
    created() {
      this.getItem(this.$route.params.id)
    },
    beforeDestroy() {
      this.reset()
    },
    methods: {
      ...mapActions({
        getItem: 'order_header/getItem',
        reset: 'order_header/reset'
      })
    }
  }
</script>
