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
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs.history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active show-print" id="general">
            <company-info :item="item"></company-info>
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

  export default {
    components: {
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
