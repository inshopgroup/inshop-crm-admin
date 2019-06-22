<template>
  <div>
    <section class="content-header">
      <h1>"{{ item && item.name }}"</h1>
    </section>
    <section class="content">
      <item-errors entity="project" />
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#general" data-toggle="tab" aria-expanded="false">{{
              $t('tabs_general')
            }}</a>
          </li>
          <li>
            <a href="#history" data-toggle="tab" aria-expanded="false">{{
              $t('tabs_history')
            }}</a>
          </li>
        </ul>
        <div class="tab-content">
          <div id="general" class="tab-pane active">
            <project-info :item="item" />
          </div>
          <div id="history" class="tab-pane">
            <history
              :id="parseInt($route.params.id)"
              :key="historyKey"
              entity="Project"
              path="project"
            />
          </div>
        </div>
      </div>
      <item-show-actions :item="item" entity="Project" path="project" />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../../components/layout/ItemShowActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'
import ProjectInfo from './ProjectInfo'
import History from '../../components/History'

export default {
  components: { History, ProjectInfo, ItemErrors, ItemShowActions },
  data() {
    return {
      historyKey: 1
    }
  },
  computed: {
    ...mapGetters({
      item: 'project/item'
    })
  },
  created() {
    this.loadProject()
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'project/getItem',
      reset: 'project/reset'
    }),
    loadProject() {
      this.getItem(this.$route.params.id)
    }
  }
}
</script>
