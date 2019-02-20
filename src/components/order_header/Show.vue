<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['number'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'order_header'" :is-loading="isLoading"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('order_header.tabs.general')}}</a></li>
          <li><a href="#lines" data-toggle="tab" aria-expanded="false">{{$t('order_header.tabs.lines')}}</a></li>
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
                  <td>{{$t('order_header.number')}}</td>
                  <td>{{ item['number'] }}</td>
                </tr>
                <tr>
                  <td>{{$t('order_header.client.name')}}</td>
                  <td>
                    <router-link v-if="item['client']" :to="{name: 'ClientShow', params: { id: item['client'].id }}">
                      {{ item['client']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('order_header.channel.name')}}</td>
                  <td>
                    <router-link v-if="item['channel']" :to="{name: 'ChannelShow', params: { id: item['channel'].id }}">
                      {{ item['channel']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('order_header.paymentType.name')}}</td>
                  <td>
                    <router-link v-if="item['paymentType']" :to="{name: 'PaymentTypeShow', params: { id: item['paymentType'].id }}">
                      {{ item['paymentType']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('order_header.shipmentMethod.name')}}</td>
                  <td>
                    <router-link v-if="item['shipmentMethod']" :to="{name: 'ShipmentMethodShow', params: { id: item['shipmentMethod'].id }}">
                      {{ item['shipmentMethod']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('order_header.status.name')}}</td>
                  <td>
                    <router-link v-if="item['status']" :to="{name: 'OrderStatusShow', params: { id: item['status'].id }}">
                      {{ item['status']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('order_header.channel.currency.name')}}</td>
                  <td>
                    <router-link v-if="item['channel'] && item['channel']['currency']" :to="{name: 'CurrencyShow', params: { id: item['channel']['currency'].id }}">
                      {{ item['channel']['currency']['name'] }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('order_header.createdAt')}}</td>
                  <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('order_header.updatedAt')}}</td>
                  <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('order_header.updatedBy')}}</td>
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
            <history :id="parseInt($route.params.id)" :entity="'OrderHeader'" :path="'order_header'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'OrderHeader'" :path="'order_header'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../layout/ItemShowActions'
import ItemErrors from '../layout/errors/ItemErrors'
import Lines from './Lines'
import History from '../History'

export default {
  components: {History, Lines, ItemErrors, ItemShowActions },

  computed: mapGetters({
    isLoading: 'general/isLoading',
    item: 'order_header/item'
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.getItem(decodeURIComponent(this.$route.params.id))
  },

  methods: {
    ...mapActions({
      reset: 'order_header/reset',
      getItem: 'order_header/getItem',
      getLines: 'invoice_header/show/getLines'
    })
  }
}
</script>
