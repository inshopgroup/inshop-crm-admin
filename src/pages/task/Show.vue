<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item.name }}</h1>
    </section>
    <section class="content">
      <item-errors entity="task" />
      <div
        v-if="item"
        class="nav-tabs-custom"
      >
        <ul class="nav nav-tabs">
          <li class="active">
            <a
              href="#general"
              data-toggle="tab"
              aria-expanded="false"
            >{{ $t('tabs_general') }}</a>
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
            class="tab-pane active"
          >
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
                <tr>
                  <td>{{ $t('description') }}</td>
                  <td>{{ item.description }}</td>
                </tr>
                <tr>
                  <td><b>{{ $t('status_name') }}</b></td>
                  <td><b v-if="item.status">{{ item.status.name }}</b></td>
                </tr>
                <tr>
                  <td><b>{{ $t('deadline') }}</b></td>
                  <td><b>{{ crmDateFormat(item.deadline) }}</b></td>
                </tr>
                <tr>
                  <td>{{ $t('project_name') }}</td>
                  <td>
                    <router-link
                      v-if="item.project"
                      :to="{name: 'ProjectShow', params: { id: item.project.id }}"
                    >
                      {{ item.project.name }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('assignee_name') }}</td>
                  <td>
                    <router-link
                      v-if="item.assignee"
                      :to="{name: 'UserShow', params: { id: item.assignee.id }}"
                    >
                      {{ item.assignee.name }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('timeEstimated') }}</td>
                  <td>{{ item.timeEstimated }}</td>
                </tr>
                <tr>
                  <td>{{ $t('timeSpent') }}</td>
                  <td>{{ item.timeSpent }}</td>
                </tr>

                <show-row-is-active :item="item" />
                <show-row-created-at :item="item" />
                <show-row-updated-at :item="item" />
                <show-row-updated-by :item="item" />
              </tbody>
            </table>
          </div>
          <div
            id="history"
            class="tab-pane"
          >
            <history
              :id="parseInt($route.params.id)"
              :key="historyKey"
              entity="Task"
              path="task"
            />
          </div>
        </div>
      </div>
      <item-show-actions
        :item="item"
        entity="Task"
        path="task"
      />
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ItemShowActions from '../../components/layout/ItemShowActions'
import ItemErrors from '../../components/layout/errors/ItemErrors'
import History from '../../components/History'
import ShowRowIsActive from "../../components/Show/ShowRowIsActive"
import ShowRowCreatedAt from "../../components/Show/ShowRowCreatedAt"
import ShowRowUpdatedAt from "../../components/Show/ShowRowUpdatedAt"
import ShowRowUpdatedBy from "../../components/Show/ShowRowUpdatedBy"

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
  data () {
    return {
      historyKey: 1
    }
  },
  computed: mapGetters({
    item: 'task/item'
  }),
  created() {
    this.getItem(this.$route.params.id)
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    ...mapActions({
      getItem: 'task/getItem',
      reset: 'task/reset'
    })
  }
}
</script>
