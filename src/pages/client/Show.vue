<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'client'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('tabs_general')}}</a></li>
          <li><a href="#contacts" data-toggle="tab" aria-expanded="false">{{$t('tabs_contacts')}}</a></li>
          <li><a href="#addresses" data-toggle="tab" aria-expanded="false">{{$t('tabs_addresses')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs_history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <client-info :item="item"></client-info>
          </div>
          <div class="tab-pane" id="contacts">
            <client-contacts :contacts="item.contacts" :parent="{clients: [this.item]}" @contactsChanged="loadItem"></client-contacts>
          </div>
          <div class="tab-pane" id="addresses">
            <client-addresses :addresses="item.addresses" :parent="{clients: [this.item]}" @addressesChanged="loadItem"></client-addresses>
          </div>
          <div class="tab-pane" id="history">
            <history :id="parseInt($route.params.id)" :entity="'Client'" :path="'client'" :key="historyKey"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Client'" :path="'client'"></item-show-actions>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ClientContacts from './ClientContacts'
  import ClientAddresses from './ClientAddresses'
  import ClientInfo from './ClientInfo'
  import ItemShowActions from '../../components/layout/ItemShowActions'
  import ItemErrors from '../../components/layout/errors/ItemErrors'
  import History from '../../components/History'

  export default {
    components: {
      History,
      ItemErrors,
      ClientContacts,
      ClientAddresses,
      ClientInfo,
      ItemShowActions
    },
    data () {
      return {
        historyKey: 1,
      }
    },
    computed: {
      ... mapGetters({
        item: 'client/item',
      })
    },
    created() {
      this.loadItem()
    },
    beforeDestroy () {
      this.reset()
    },
    methods: {
      ...mapActions({
        getItem: 'client/getItem',
        reset: 'client/reset',
      }),
      loadItem() {
        this.getItem(this.$route.params.id)
      }
    }
  }
</script>
