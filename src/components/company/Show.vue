<template>
  <div>
    <section class="content-header show-print">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'company'" :is-loading="isLoading"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs hidden-print">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('company.tabs.general')}}</a></li>
          <li><a href="#contacts" data-toggle="tab" aria-expanded="false">{{$t('company.tabs.contacts')}}</a></li>
          <li><a href="#addresses" data-toggle="tab" aria-expanded="false">{{$t('company.tabs.addresses')}}</a></li>
          <li><a href="#clients" data-toggle="tab" aria-expanded="false">{{$t('company.tabs.clients')}}</a></li>
          <li><a href="#documents" data-toggle="tab" aria-expanded="false">{{$t('company.tabs.documents')}}</a></li>
          <li><a href="#companyProducts" data-toggle="tab" aria-expanded="false">{{$t('company.tabs.companyProducts')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active show-print" id="general">
            <company-info :item="item"></company-info>
          </div>
          <div class="tab-pane show-print" id="contacts">
            <client-contacts :contacts="contacts" :company="item['@id']" @reloadContacts="loadContacts"></client-contacts>
          </div>
          <div class="tab-pane show-print" id="addresses">
            <client-addresses :addresses="addresses" :company="item['@id']" @reloadAddresses="loadAddresses"></client-addresses>
          </div>
          <div class="tab-pane" id="clients">
            <company-clients :clients="item.clients"></company-clients>
          </div>
          <div class="tab-pane" id="documents">
            <client-documents :documents="documents" :company="item['@id']" @reloadDocuments="loadDocuments" :show-projects="false"></client-documents>
          </div>
          <div class="tab-pane" id="companyProducts">
            <company-products :companyProducts="companyProducts" :company="item['@id'] " @reloadCompanyProducts="loadCompanyProducts"></company-products>
          </div>
          <div class="tab-pane" id="history">
            <history :item="item" :entity="'Company'" :path="'company'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Company'" :path="'company'"></item-show-actions>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CompanyInfo from './CompanyInfo'
import CompanyClients from './CompanyClients'
import ItemShowActions from '../layout/ItemShowActions'
import ItemErrors from '../layout/errors/ItemErrors'
import History from '../History'
import ClientAddresses from '../client/ClientAddresses'
import ClientContacts from '../client/ClientContacts'
import ClientDocuments from '../client/ClientDocuments'
import CompanyProducts from './CompanyProducts'

export default {
  components: {
    History,
    ItemErrors,
    CompanyInfo,
    CompanyClients,
    ItemShowActions,
    ClientAddresses,
    ClientContacts,
    ClientDocuments,
    CompanyProducts
  },
  computed: mapGetters({
    isLoading: 'company/show/isLoading',
    item: 'company/show/retrieved',
    contacts: 'company/show/contacts',
    addresses: 'company/show/addresses',
    documents: 'company/show/documents',
    companyProducts: 'company/show/companyProducts',
  }),

  beforeDestroy () {
    this.reset()
  },

  created () {
    this.retrieve(decodeURIComponent(this.$route.params.id))
    this.loadContacts()
    this.loadAddresses()
    this.loadDocuments()
    this.loadCompanyProducts()
  },

  methods: {
    ...mapActions({
      del: 'company/del/del',
      reset: 'company/show/reset',
      retrieve: 'company/show/retrieve',
      getContacts: 'company/show/getContacts',
      getAddresses: 'company/show/getAddresses',
      getDocuments: 'company/show/getDocuments',
      getCompanyProducts: 'company/show/getCompanyProducts',
    }),

    deleteItem (item) {
      if (window.confirm(this.$t('delete_are_you_sure'))) {
        this.del(item).then(() => this.$router.push({ name: 'CompanyList' }))
      }
    },
    loadContacts () {
      this.getContacts(decodeURIComponent(this.$route.params.id))
    },
    loadAddresses () {
      this.getAddresses(decodeURIComponent(this.$route.params.id))
    },
    loadDocuments () {
      this.getDocuments(decodeURIComponent(this.$route.params.id))
    },
    loadCompanyProducts () {
      this.getCompanyProducts(decodeURIComponent(this.$route.params.id))
    },
  }
}
</script>
