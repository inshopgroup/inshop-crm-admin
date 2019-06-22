<template>
  <div>
    <section class="content-header">
      <h1>{{ item && item.title }}</h1>
    </section>
    <section class="content">
      <item-errors entity="text" />
      <div class="nav-tabs-custom">
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
            <div
              v-if="item"
              class="table-responsive"
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
                    <td>{{ $t('title') }}</td>
                    <td>{{ item.title }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('slug') }}</td>
                    <td>{{ item.slug }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('content') }}</td>
                    <td>{{ item.content }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('seoTitle') }}</td>
                    <td>{{ item.seoTitle }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('seoDescription') }}</td>
                    <td>{{ item.seoDescription }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t('seoKeywords') }}</td>
                    <td>{{ item.seoKeywords }}</td>
                  </tr>

                  <show-row-is-active :item="item" />
                  <show-row-created-at :item="item" />
                  <show-row-updated-at :item="item" />
                  <show-row-updated-by :item="item" />
                </tbody>
              </table>
            </div>
          </div>
          <div
            id="history"
            class="tab-pane"
          >
            <history
              :id="parseInt($route.params.id)"
              :key="historyKey"
              entity="Text"
              path="text"
            />
          </div>
        </div>
      </div>
      <item-show-actions
        :item="item"
        entity="Text"
        path="text"
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
