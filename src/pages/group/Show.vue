<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item.name }}</h1>
    </section>
    <section class="content">
      <item-errors entity="group" />
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#general" data-toggle="tab" aria-expanded="false">{{
              $t('tabs_general')
            }}</a>
          </li>
          <li>
            <a href="#roles" data-toggle="tab" aria-expanded="false">{{
              $t('tabs_roles')
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
            <div v-if="item" class="table-responsive">
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
                    <td>{{ $t('name') }}</td>
                    <td>{{ item.name }}</td>
                  </tr>

                  <show-row-is-active :item="item" />
                  <show-row-created-at :item="item" />
                  <show-row-updated-at :item="item" />
                  <show-row-updated-by :item="item" />
                </tbody>
              </table>
            </div>
          </div>
          <div id="roles" class="tab-pane">
            <div v-for="module in modules" :key="module.id" class="role">
              <h2>{{ $t(module.name.replace(/\s+/g, '_').toLowerCase()) }}</h2>
              <ul v-if="item && item.roles">
                <li v-for="role in roles(module)" :key="role.id">
                  {{ $t(role.name.toLowerCase()) }}
                </li>
              </ul>
            </div>
          </div>
          <div id="history" class="tab-pane">
            <history
              :id="parseInt($route.params.id)"
              :key="historyKey"
              entity="Group"
              path="group"
            />
          </div>
        </div>
      </div>
      <item-show-actions path="group" :item="item" entity="Group" />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../../components/layout/ItemShowActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'
import History from '../../components/History'
import ShowRowIsActive from '../../components/Show/ShowRowIsActive'
import ShowRowCreatedAt from '../../components/Show/ShowRowCreatedAt'
import ShowRowUpdatedAt from '../../components/Show/ShowRowUpdatedAt'
import ShowRowUpdatedBy from '../../components/Show/ShowRowUpdatedBy'

export default {
  components: {
    ShowRowUpdatedBy,
    ShowRowUpdatedAt,
    ShowRowCreatedAt,
    ShowRowIsActive,
    History,
    ItemErrors,
    ItemShowActions
  },
  data() {
    return {
      historyKey: 1
    }
  },
  computed: {
    ...mapGetters({
      item: 'group/item'
    }),
    modules() {
      return this.$store.getters['module/items'] || []
    }
  },
  created() {
    this.getItem(this.$route.params.id)
    this.getModules({
      itemsPerPage: 500
    })
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'group/getItem',
      reset: 'group/reset',
      getModules: 'module/getItems'
    }),
    roles(module) {
      return this.item.roles.filter(role => role.module.id === module.id)
    }
  }
}
</script>

<style>
.role {
  display: inline-block;
  margin: 15px;
  width: 22%;
  vertical-align: top;
}
.role h2 {
  font-size: 18px;
  font-weight: bold;
}
.role ul {
  padding-left: 18px;
}
</style>
