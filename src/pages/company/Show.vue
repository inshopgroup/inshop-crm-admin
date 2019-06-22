<template>
  <div>
    <section class="content-header show-print">
      <h1>{{ item && item.name }}</h1>
    </section>
    <section class="content">
      <item-errors entity="company" />
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs hidden-print">
          <li class="active">
            <a
              href="#general"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_general') }}</a>
          </li>
          <li>
            <a
              href="#contacts"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_contacts') }}</a>
          </li>
          <li>
            <a
              href="#addresses"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_addresses') }}</a>
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
            id="general"
            class="tab-pane active show-print"
          >
            <company-info :item="item" />
          </div>
          <div
            id="contacts"
            class="tab-pane"
          >
            <client-contacts
              :contacts="item.contacts"
              :parent="{companies: [this.item]}"
              @contactsChanged="loadItem"
            />
          </div>
          <div
            id="addresses"
            class="tab-pane"
          >
            <client-addresses
              :addresses="item.addresses"
              :parent="{companies: [this.item]}"
              @addressesChanged="loadItem"
            />
          </div>
          <div
            id="history"
            class="tab-pane"
          >
            <history
              :id="parseInt($route.params.id)"
              :key="historyKey"
              entity="Company"
              path="company"
            />
          </div>
        </div>
      </div>
      <item-show-actions
        :item="item"
        entity="Company"
        path="company"
      />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CompanyInfo from './CompanyInfo'
import ItemShowActions from '../../components/layout/ItemShowActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'
import History from '../../components/History'
import ClientContacts from '../client/ClientContacts'
import ClientAddresses from '../client/ClientAddresses'

export default {
  components: {
    ClientAddresses,
    ClientContacts,
    History,
    ItemErrors,
    CompanyInfo,
    ItemShowActions
  },
  data () {
    return {
      historyKey: 1
    }
  },
  computed: mapGetters({
    item: 'company/item'
  }),
  created() {
    this.loadItem()
  },
  beforeDestroy () {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'company/getItem',
      reset: 'company/reset'
    }),
    loadItem() {
      this.getItem(this.$route.params.id)
    }
  }
}
</script>
