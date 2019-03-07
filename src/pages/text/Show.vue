<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item.title }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'text'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('text.tabs.general')}}</a></li>
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
                  <td>{{$t('text.title')}}</td>
                  <td>{{ item.title }}</td>
                </tr>
                <tr>
                  <td>{{$t('text.slug')}}</td>
                  <td>{{ item.slug }}</td>
                </tr>
                <tr>
                  <td>{{$t('text.content')}}</td>
                  <td>{{ item.content }}</td>
                </tr>
                <tr>
                  <td>{{$t('text.seoTitle')}}</td>
                  <td>{{ item.seoTitle }}</td>
                </tr>
                <tr>
                  <td>{{$t('text.seoDescription')}}</td>
                  <td>{{ item.seoDescription }}</td>
                </tr>
                <tr>
                  <td>{{$t('text.seoKeywords')}}</td>
                  <td>{{ item.seoKeywords }}</td>
                </tr>
                <tr>
                  <td>{{$t('text.createdAt')}}</td>
                  <td>{{ moment(item['createdAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('text.updatedAt')}}</td>
                  <td>{{ moment(item['updatedAt']).format('DD-MM-YYYY HH:mm') }}</td>
                </tr>
                <tr>
                  <td>{{$t('text.updatedBy')}}</td>
                  <td>{{ item['updatedBy'] }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane" id="history">
            <history :id="parseInt($route.params.id)" :entity="'Text'" :path="'text'" :key="historyKey"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Text'" :path="'text'"></item-show-actions>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ItemShowActions from '../../components/layout/ItemShowActions'
  import ItemErrors from '../../components/layout/errors/ItemErrors'
  import History from '../../components/History'

  export default {
    components: {History, ItemErrors, ItemShowActions},
    data () {
      return {
        historyKey: 1,
      }
    },
    computed: mapGetters({
      item: 'text/item'
    }),
    created() {
      this.getItem(this.$route.params.id)
    },
    beforeDestroy() {
      this.reset()
    },
    methods: {
      ...mapActions({
        getItem: 'text/getItem',
        reset: 'text/reset'
      })
    }
  }
</script>
