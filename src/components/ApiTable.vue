<template>
  <div>
    <v-server-table :columns="columns" :options="options()">
      <template slot="actions" slot-scope="props">
        <v-container>
          <v-layout>
            <v-btn-toggle dark rounded small>
              <v-btn
                v-if="isGranted(role_show)"
                :to="{ name: showRoute, params: { id: props.row.id } }"
                color="success"
                small
              >
                <v-icon small>remove_red_eye</v-icon>
              </v-btn>
              <v-btn
                v-if="isGranted(role_show) && isGranted(role_edit)"
                :to="{ name: updateRoute, params: { id: props.row.id } }"
                color="success"
                small
              >
                <v-icon small>edit</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-layout>
        </v-container>
      </template>

      <div
        v-for="customFilter in customFilters"
        :key="customFilter"
        :slot="'filter__' + customFilter"
      >
        <slot :name="'filter__' + customFilter" />
      </div>
    </v-server-table>
  </div>
</template>

<script>
import axios from '../interceptor'
import decamelize from '../utils/decamelize'

export default {
  name: 'ApiTable',
  props: {
    entity: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: null
    },
    route: {
      type: String,
      default: null
    },
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
  data: function() {
    return {
      orderBy: {},
      initFilters: {},
      initialPage: 1,
      dateColumns: {
        columnCreatedAt: 'createdAt',
        columnUpdatedAt: 'updatedAt',
        columnDeadline: 'deadline'
      },
      customColumns: {
        columnTranslatedName: 'translations.name',
        columnTranslatedTitle: 'translations.title',
        columnParentTranslatedName: 'parent.translations.name'
      }
    }
  },
  computed: {
    role_show() {
      return 'ROLE_' + this.path.toUpperCase() + '_SHOW'
    },
    role_edit() {
      return 'ROLE_' + this.path.toUpperCase() + '_UPDATE'
    },
    headings() {
      let headings = {}

      this.columns.forEach(key => {
        let _key = key.split('.').join('_')

        headings[key] = this.$t(_key)
      })

      return headings
    },
    showRoute() {
      return this.entity + 'Show'
    },
    updateRoute() {
      return this.entity + 'Update'
    }
  },
  created() {
    let query = this.$route.query

    this.initFilters = query

    if (query.page) {
      this.initialPage = query.page
    }

    if (query['orderBy.ascending']) {
      this.orderBy.ascending = query['orderBy.ascending']
    }

    if (query['orderBy.column']) {
      this.orderBy.column = query['orderBy.column']
    }
  },
  methods: {
    options() {
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
        initFilters: this.initFilters,
        initialPage: this.initialPage,
        orderBy: this.orderBy,
        texts: {
          filterBy: '{column}'
        },
        requestFunction: params => {
          return new Promise(resolve => {
            let queryParams = {}

            if (params.page !== 1) {
              queryParams.page = params.page
            }

            // filtering
            this.columns.forEach(key => {
              if (typeof params.query[key] !== 'undefined') {
                if (Object.keys(this.dateColumns).indexOf(key) !== -1) {
                  queryParams[this.dateColumns[key] + '[after]'] = this.$moment(
                    params.query[key].start
                  ).format('YYYY/M/D')
                  queryParams[
                    this.dateColumns[key] + '[before]'
                  ] = this.$moment(params.query[key].end)
                    .add(1, 'day')
                    .format('YYYY/M/D')
                } else if (
                  Object.keys(this.customColumns).indexOf(key) !== -1
                ) {
                  queryParams[this.customColumns[key]] = params.query[key]
                } else {
                  queryParams[key] = params.query[key].trim()
                }
              }
            })

            // custom filtering
            this.options().customFilters.forEach(key => {
              if (typeof params[key] !== 'undefined' && params[key] !== '') {
                queryParams[key] = params[key].trim()
              }
            })

            let queryParamsUrl = Object.assign({}, queryParams)

            // Sorting
            if (typeof params.orderBy !== 'undefined') {
              let key

              if (
                Object.keys(this.dateColumns).indexOf(params.orderBy) !== -1
              ) {
                key = this.dateColumns[params.orderBy]
              } else if (
                Object.keys(this.customColumns).indexOf(params.orderBy) !== -1
              ) {
                key = this.customColumns[params.orderBy]
              } else {
                key = params.orderBy
              }

              queryParams['order[' + key + ']'] =
                params.ascending === 1 ? 'ASC' : 'DESC'

              queryParamsUrl['orderBy.ascending'] = params.ascending
              queryParamsUrl['orderBy.column'] = key
            }

            // clear error
            this.$store.commit(
              this.path +
                '/' +
                decamelize(this.entity).toUpperCase() +
                '_SET_ERROR',
              null
            )

            this.$router.push({ query: queryParamsUrl })

            axios
              .get(process.env.VUE_APP_API_URL + '/' + this.route, {
                params: queryParams
              })
              .then(response => {
                let data = {
                  data: response.data['hydra:member'],
                  count: response.data['hydra:totalItems']
                }

                resolve(data)
              })
              .catch(e => {
                this.$store.commit(
                  this.path +
                    '/' +
                    decamelize(this.entity).toUpperCase() +
                    '_SET_ERROR',
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
.table-responsive {
  min-height: 0.01%;
  overflow-x: auto;
}

.table-bordered,
.table-bordered > tbody > tr > td,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > td,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > thead > tr > th {
  border: 1px solid #f4f4f4;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}
table {
  background-color: transparent;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.table-hover > tbody > tr:hover,
.table > tbody > tr.active > td,
.table > tbody > tr.active > th,
.table > tbody > tr > td.active,
.table > tbody > tr > th.active,
.table > tfoot > tr.active > td,
.table > tfoot > tr.active > th,
.table > tfoot > tr > td.active,
.table > tfoot > tr > th.active,
.table > thead > tr.active > td,
.table > thead > tr.active > th,
.table > thead > tr > td.active,
.table > thead > tr > th.active {
  background-color: #f5f5f5;
}

.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.table-bordered,
.table-bordered > tbody > tr > td,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > td,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > thead > tr > th {
  border: 1px solid #f4f4f4;
}

.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  border-top: 1px solid #f4f4f4;
}
.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
}

.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
}
.pagination > li {
  display: inline;
}

.pagination > .disabled > a,
.pagination > .disabled > a:focus,
.pagination > .disabled > a:hover,
.pagination > .disabled > span,
.pagination > .disabled > span:focus,
.pagination > .disabled > span:hover {
  color: #777;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}

.pagination > li > a {
  background: #fafafa;
  color: #666;
}
.pagination > li > a,
.pagination > li > span {
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}

.form-control {
  border-radius: 0;
  border-color: #d2d6de;
}
.form-control {
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}
.form-control,
output {
  display: block;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
}
/*button, input, select, textarea {*/
/*  font-family: inherit;*/
/*  font-size: inherit;*/
/*  line-height: inherit;*/
/*}*/

/**, :after, :before {*/
/*  -webkit-box-sizing: border-box;*/
/*  box-sizing: border-box;*/
/*}*/
/*table {*/
/*  display: table;*/
/*  border-collapse: separate;*/
/*  border-spacing: 2px;*/
/*  border-color: grey;*/
/*}*/

/*.VueTables__table th:last-child {*/
/*  width: 95px;*/
/*}*/
/*.float-right {*/
/*  float: right !important;*/
/*}*/
/*.VuePagination .text-center {*/
/*  float: right;*/
/*}*/
</style>
