<template>
  <div>
    <section class="content-header show-print">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'company'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs hidden-print">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('company.tabs.general')}}</a></li>
          <li><a href="#contacts" data-toggle="tab" aria-expanded="false">{{$t('company.tabs.contacts')}}</a></li>
          <li><a href="#addresses" data-toggle="tab" aria-expanded="false">{{$t('company.tabs.addresses')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active show-print" id="general">
            <company-info :item="item"></company-info>
          </div>
          <div class="tab-pane" id="contacts">
            <client-contacts :contacts="item.contacts" :parent="{companies: [this.item]}" @contactsChanged="loadItem"></client-contacts>
          </div>
          <div class="tab-pane" id="addresses">
            <client-addresses :addresses="item.addresses" :parent="{companies: [this.item]}" @addressesChanged="loadItem"></client-addresses>
          </div>
          <div class="tab-pane" id="history">
            <history :id="parseInt($route.params.id)" :entity="'Company'" :path="'company'"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Company'" :path="'company'"></item-show-actions>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import CompanyInfo from './CompanyInfo'
  import ItemShowActions from '../layout/ItemShowActions'
  import ItemErrors from '../layout/errors/ItemErrors'
  import History from '../History'
  import ClientContacts from "../client/ClientContacts";
  import ClientAddresses from "../client/ClientAddresses";

  export default {
    components: {
      ClientAddresses,
      ClientContacts,
      History,
      ItemErrors,
      CompanyInfo,
      ItemShowActions,
    },
    computed: mapGetters({
      item: 'company/item',
    }),
    created() {
      this.loadItem()
    },
    methods: {
      ...mapActions({
        getItem: 'company/getItem',
      }),
      loadItem() {
        this.getItem(this.$route.params.id)
      },
    }
  }
</script>
