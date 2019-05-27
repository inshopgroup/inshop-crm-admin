<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item.number }}</h1>
    </section>
    <section class="content">
      <item-errors entity="invoiceHeader" />
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
                    <td>{{ $t('status_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.status"
                        :to="{name: 'InvoiceStatusShow', params: { id: item.status.id }}"
                      >
                        {{ item.status.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('type_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.type"
                        :to="{name: 'InvoiceTypeShow', params: { id: item.type.id }}"
                      >
                        {{ item.type.name }}
                      </router-link>
                    </td>
                  </tr>

                  <tr>
                    <td>{{ $t('orderHeader_number') }}</td>
                    <td>
                      <router-link
                        v-if="item.orderHeader"
                        :to="{name: 'OrderHeaderShow', params: { id: item.orderHeader.id }}"
                      >
                        {{ item.orderHeader.number }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('companyFrom_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.companyFrom"
                        :to="{name: 'CompanyShow', params: { id: item.companyFrom.id }}"
                      >
                        {{ item.companyFrom.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('companyTo_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.companyTo"
                        :to="{name: 'CompanyShow', params: { id: item.companyTo.id }}"
                      >
                        {{ item.companyTo.name }}
                      </router-link>
                    </td>
                  </tr>

                  <tr>
                    <td>{{ $t('agreement_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.agreement"
                        :to="{name: 'DocumentShow', params: { id: item.agreement.id }}"
                      >
                        {{ item.agreement.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('currency_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.currency"
                        :to="{name: 'CurrencyShow', params: { id: item.currency.id }}"
                      >
                        {{ item.currency.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('language_name') }}</td>
                    <td>
                      <router-link
                        v-if="item.language"
                        :to="{name: 'LanguageShow', params: { id: item.language.id }}"
                      >
                        {{ item.language.name }}
                      </router-link>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t('dateOfInvoice') }}</td>
                    <td>{{ dateFormat(item.dateOfInvoice) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('dateOfSale') }}</td>
                    <td>{{ dateFormat(item.dateOfSale) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('maturity') }}</td>
                    <td>{{ item.maturity }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('createdAt') }}</td>
                    <td>{{ dateFormat(item.createdAt) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('updatedAt') }}</td>
                    <td>{{ dateFormat(item.updatedAt) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('updatedBy') }}</td>
                    <td>{{ item.updatedBy }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="tab-pane"
            id="lines"
          >
            <div
              v-if="item.lines"
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
              entity="InvoiceHeader"
              path="invoiceHeader"
              :key="historyKey"
            />
          </div>
        </div>
      </div>
      <item-show-actions
        :item="item"
        entity="InvoiceHeader"
        path="invoiceHeader"
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

export default {
  components: { History, Lines, ItemErrors, ItemShowActions },
  data () {
    return {
      historyKey: 1
    }
  },
  computed: mapGetters({
    item: 'invoiceHeader/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'invoiceHeader/getItem',
      reset: 'invoiceHeader/reset'
    })
  }
}
</script>
