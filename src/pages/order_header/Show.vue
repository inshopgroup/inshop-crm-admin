<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item.number }}</h1>
    </section>
    <section class="content">
      <item-errors entity="orderHeader" />
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active">
            <a
              href="#general"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_general') }}</a>
          </li>
          <li>
            <a
              href="#lines"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_lines') }}</a>
          </li>
          <li>
            <a
              href="#history"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_history') }}</a>
          </li>
        </ul>
        <div class="tab-content">
          <div
            class="tab-pane active"
            id="general"
          >
            <div
              v-if="item"
              class="table-responsive"
            >
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th width="20%">
                      {{ $t('field') }}
                    </th>
                    <th>{{ $t('value') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ $t('number') }}</td>
                    <td>{{ item.number }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('client_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.client"
                        :to="{name: 'ClientShow', params: { id: item.client.id }}"
                      >
                        {{ item.client.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('channel_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.channel"
                        :to="{name: 'ChannelShow', params: { id: item.channel.id }}"
                      >
                        {{ item.channel.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('paymentType_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.paymentType"
                        :to="{name: 'PaymentTypeShow', params: { id: item.paymentType.id }}"
                      >
                        {{ item.paymentType.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('shipmentMethod_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.shipmentMethod"
                        :to="{name: 'ShipmentMethodShow', params: { id: item.shipmentMethod.id }}"
                      >
                        {{ item.shipmentMethod.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('status_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.status"
                        :to="{name: 'OrderStatusShow', params: { id: item.status.id }}"
                      >
                        {{ item.status.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('channel_currency_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.channel && item.channel.currency"
                        :to="{name: 'CurrencyShow', params: { id: item.channel.currency.id }}"
                      >
                        {{ item.channel.currency.name }}
                      </router-link>
                    </td>
                  </tr>

                  <show-row-is-active :item="item" />
                  <show-row-created-at :item="item" />
                  <show-row-updated-at :item="item" />
                  <show-row-updated-by :item="item" />
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="tab-pane"
            id="lines"
          >
            <div
              v-if="item"
              class="table-responsive"
            >
              <lines :lines="item.lines" />
            </div>
          </div>
          <div
            class="tab-pane"
            id="history"
          >
            <history
              :id="parseInt($route.params.id)"
              entity="OrderHeader"
              path="order_header"
              :key="historyKey"
            />
          </div>
        </div>
      </div>
      <item-show-actions
        :item="item"
        entity="OrderHeader"
        path="order_header"
      />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../../components/layout/ItemShowActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'
import Lines from './Lines'
import History from '../../components/History'
import ShowRowIsActive from "../../components/Show/ShowRowIsActive";
import ShowRowCreatedAt from "../../components/Show/ShowRowCreatedAt";
import ShowRowUpdatedAt from "../../components/Show/ShowRowUpdatedAt";
import ShowRowUpdatedBy from "../../components/Show/ShowRowUpdatedBy";

export default {
  components: {
    ShowRowUpdatedBy,
    ShowRowUpdatedAt,
    ShowRowCreatedAt,
    ShowRowIsActive,
    History,
    Lines,
    ItemErrors,
    ItemShowActions
  },
  data () {
    return {
      historyKey: 1
    }
  },
  computed: mapGetters({
    item: 'orderHeader/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'orderHeader/getItem',
      reset: 'orderHeader/reset'
    })
  }
}
</script>
