<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item.title }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'text'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('tabs_general')}}</a></li>
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
                  <td>{{$t('title')}}</td>
                  <td>{{ item.title }}</td>
                </tr>
                <tr>
                  <td>{{$t('slug')}}</td>
                  <td>{{ item.slug }}</td>
                </tr>
                <tr>
                  <td>{{$t('content')}}</td>
                  <td>{{ item.content }}</td>
                </tr>
                <tr>
                  <td>{{$t('seoTitle')}}</td>
                  <td>{{ item.seoTitle }}</td>
                </tr>
                <tr>
                  <td>{{$t('seoDescription')}}</td>
                  <td>{{ item.seoDescription }}</td>
                </tr>
                <tr>
                  <td>{{$t('seoKeywords')}}</td>
                  <td>{{ item.seoKeywords }}</td>
                </tr>
                <tr>
                  <td>{{$t('createdAt')}}</td>
                  <td>{{ dateFormat(item.createdAt) }}</td>
                </tr>
                <tr>
                  <td>{{$t('updatedAt')}}</td>
                  <td>{{ dateFormat(item.updatedAt) }}</td>
                </tr>
                <tr>
                  <td>{{$t('updatedBy')}}</td>
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
