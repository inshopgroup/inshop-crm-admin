<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item['name'] }}</h1>
    </section>

    <section class="content">
      <item-errors :entity="'template'"></item-errors>

      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#general" data-toggle="tab" aria-expanded="false">{{$t('tabs_general')}}</a></li>
          <li><a href="#files" data-toggle="tab" aria-expanded="false">{{$t('tabs_files')}}</a></li>
          <li><a href="#history" data-toggle="tab" aria-expanded="false">{{$t('tabs_history')}}</a></li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="general">
            <template-info :item="item"></template-info>
          </div>
          <div class="tab-pane" id="files">
            <files-table :files="item.files"></files-table>
          </div>
          <div class="tab-pane" id="history">
            <history :id="parseInt($route.params.id)" :entity="'Template'" :path="'template'" :key="historyKey"></history>
          </div>
        </div>
      </div>

      <item-show-actions :item="item" :entity="'Template'" :path="'template'"></item-show-actions>
    </section>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import ItemShowActions from '../../components/layout/ItemShowActions'
  import ItemErrors from '../../components/layout/errors/ItemErrors'
  import FilesTable from './FilesTable'
  import TemplateInfo from './TemplateInfo'
  import History from '../../components/History'

  export default {
    components: {History, ItemErrors, ItemShowActions, TemplateInfo, FilesTable},
    data () {
      return {
        historyKey: 1,
      }
    },
    computed: mapGetters({
      item: 'template/item'
    }),
    created() {
      this.getItem(this.$route.params.id)
    },
    beforeDestroy() {
      this.reset()
    },
    methods: {
      ...mapActions({
        getItem: 'template/getItem',
        reset: 'template/reset'
      })
    }
  }
</script>
