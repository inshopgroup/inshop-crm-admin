<template>
<div id="list-table">
  <v-server-table :columns="columns" :options="options">
    <template slot="actions" slot-scope="props">
    <div class="btn-group" role="group">
      <router-link v-if="isGranted(role_show)" :to="{name: showRoute, params: { id: props.row['@id'] }}" tag="button" class="btn btn-info">
        <span class="fa fa-eye" aria-hidden="true" />
        <span class="sr-only">{{$t('show')}}</span>
      </router-link>

      <router-link v-if="isGranted(role_show) && isGranted(role_edit)" :to="{name: updateRoute, params: { id: props.row['@id'] }}" style="padding-left: 10px;" tag="button" class="btn btn-info">
        <span class="fa fa-pencil" aria-hidden="true" />
        <span class="sr-only">{{$t('edit')}}</span>
      </router-link>
    </div>
    </template>

    <template v-for="customFilter in customFilters" :slot="'filter__' + customFilter"><slot :name="'filter__' + customFilter"></slot></template>
  </v-server-table>
</div>
</template>

<script>
import axios from '../interceptor'
import moment from 'moment'

export default {
  name: 'ApiTable',
  props: {
    entity: null,
    path: null,
    route: null,
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    sortable: {
      type: Array,
      default: function() {
        return []
      }
    },
    filterable: {
      type: Array,
      default: function() {
        return []
      }
    },
    customFilters: {
      type: Array,
      default: function() {
        return []
      }
    },
    templates: {
      type: Object,
      default: function() {
        return {}
      }
    },
    listColumns: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function () {
    return {
      dateColumns: {
        'columnCreatedAt': 'createdAt',
        'columnUpdatedAt': 'updatedAt',
        'columnDeadline': 'deadline'
      },
      customColumns: {
        'columnTranslatedName': 'translations.name',
        'columnParentTranslatedName': 'parent.translations.name'
      },
    }
  },
  computed: {
    role_show () {
      return 'ROLE_' + this.path.toUpperCase() + '_SHOW'
    },
    role_edit () {
      return 'ROLE_' + this.path.toUpperCase() + '_UPDATE'
    },
    headings () {
      let headings = {};

      this.columns.forEach(key => {
        headings[key] = this.$t(this.path + '.' + key)
      })

      return headings
    },
    showRoute () {
      return this.entity + 'Show'
    },
    updateRoute () {
      return this.entity + 'Update'
    },
    options () {
      return {
        dateColumns: Object.keys(this.dateColumns),
        datepickerOptions: {
          opens: 'left'
        },
        filterByColumn: true,
        filterable: this.filterable,
        customFilters: this.customFilters,
        listColumns: this.listColumns,
        sortable: this.sortable,
        perPage: 30,
        perPageValues: [],
        templates: this.templates,
        headings: this.headings,
        requestFunction: (params) => {
          return new Promise((resolve, reject) => {
            let queryParams = {
              page: params.page,
            }

            // filtering
            this.columns.forEach(key => {
              if (typeof params.query[key] !== 'undefined') {
                if (Object.keys(this.dateColumns).indexOf(key) !== -1) {
                  queryParams[this.dateColumns[key] + '[after]'] = moment(params.query[key].start).format('YYYY/M/D')
                  queryParams[this.dateColumns[key] + '[before]'] = moment(params.query[key].end).add(1, 'day').format('YYYY/M/D')
                } else if (Object.keys(this.customColumns).indexOf(key) !== -1) {
                  queryParams[this.customColumns[key]] = params.query[key]
                } else {
                  queryParams[key] = params.query[key]
                }
              }
            })

            // custom filtering
            this.options.customFilters.forEach(key => {
              if (typeof params[key] !== 'undefined' && params[key] !== '') {
                queryParams[key] = params[key]
              }
            })

            // Sorting
            if (typeof params.orderBy !== 'undefined') {
              let key

              if (Object.keys(this.dateColumns).indexOf(params.orderBy) !== -1) {
                key = this.dateColumns[params.orderBy]
              } else if (Object.keys(this.customColumns).indexOf(params.orderBy) !== -1) {
                key = this.customColumns[params.orderBy]
              } else {
                key = params.orderBy
              }

              queryParams['order[' + key + ']'] = params.ascending === 1 ? 'ASC' : 'DESC'
            }

            // clear error
            this.$store.commit(
              this.path + '/list/' + this.entity.toUpperCase() + '_LIST_SET_ERROR',
              null
            )

            axios.get(process.env.API_URL + '/' + this.route, {params: queryParams})
              .then(response => {
                let data = {
                  data: response.data['hydra:member'],
                  count: response.data['hydra:totalItems']
                }

                resolve(data)
              })
              .catch((e) => {
                this.$store.commit(
                  this.path + '/list/' + this.entity.toUpperCase() + '_LIST_SET_ERROR',
                  e.message
                )
              })
          })
        }
      }
    }
  }
}
</script>

<style>
.VueTables__table th:last-child {
  width: 95px;
}
.float-right {
  float: right!important;
}
.VuePagination .text-center {
  float: right;
}
</style>
