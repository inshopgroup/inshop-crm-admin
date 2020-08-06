<template>
  <v-server-table :columns="columns" :options="options()">
    <template slot="actions" slot-scope="props">
      <v-layout justify-center>
        <v-btn
          v-if="isGranted(role_show)"
          text
          x-small
          :to="{ name: showRoute, params: { id: props.row.id } }"
        >
          <v-icon color="primary">remove_red_eye</v-icon>
        </v-btn>
        <v-btn
          v-if="isGranted(role_show) && isGranted(role_edit)"
          text
          x-small
          :to="{ name: updateRoute, params: { id: props.row.id } }"
        >
          <v-icon color="primary">edit</v-icon>
        </v-btn>
      </v-layout>
    </template>

    <div
      v-for="customFilter in customFilters"
      :key="customFilter"
      :slot="'filter__' + customFilter"
    >
      <slot :name="'filter__' + customFilter" />
    </div>
  </v-server-table>
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
      default: () => []
    },
    sortable: {
      type: Array,
      default: () => []
    },
    filterable: {
      type: Array,
      default: () => []
    },
    customFilters: {
      type: Array,
      default: () => []
    },
    templates: {
      type: Object,
      default: () => ({})
    },
    listColumns: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
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
      return `ROLE_${this.path.toUpperCase()}_SHOW`
    },
    role_edit() {
      return `ROLE_${this.path.toUpperCase()}_UPDATE`
    },
    headings() {
      const headings = {}

      this.columns.forEach(key => {
        const _key = key.split('.').join('_')

        headings[key] = this.$t(_key)
      })

      return headings
    },
    showRoute() {
      return `${this.entity}Show`
    },
    updateRoute() {
      return `${this.entity}Update`
    }
  },
  created() {
    const { query } = this.$route

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
        columnsClasses: {
          id: 'column-id'
        },
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
        requestFunction: params =>
          new Promise(resolve => {
            const queryParams = {}

            if (params.page !== 1) {
              queryParams.page = params.page
            }

            // filtering
            this.columns.forEach(key => {
              if (typeof params.query[key] !== 'undefined') {
                if (Object.keys(this.dateColumns).indexOf(key) !== -1) {
                  queryParams[`${this.dateColumns[key]}[after]`] = window.moment(
                    params.query[key].start
                  ).format('YYYY/M/D')
                  queryParams[
                    `${this.dateColumns[key]}[before]`
                  ] = window.moment(params.query[key].end)
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
                queryParams[key] = params[key]
              }
            })

            const queryParamsUrl = Object.assign({}, queryParams)

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

              queryParams[`order[${key}]`] =
                params.ascending === 1 ? 'ASC' : 'DESC'

              queryParamsUrl['orderBy.ascending'] = params.ascending
              queryParamsUrl['orderBy.column'] = key
            }

            // clear error
            this.$store.commit(
              `${this.storeModule(this.entity)}/${decamelize(
                this.entity
              ).toUpperCase()}_SET_ERROR`,
              null
            )

            this.$router.push({ query: queryParamsUrl })

            axios
              .get(`${process.env.VUE_APP_API_URL}/${this.route}`, {
                params: queryParams
              })
              .then(response => {
                const data = {
                  data: response.data['hydra:member'],
                  count: response.data['hydra:totalItems']
                }

                resolve(data)
              })
              .catch(e => {
                this.$store.commit(
                  `${this.storeModule(this.entity)}/${decamelize(
                    this.entity
                  ).toUpperCase()}_SET_ERROR`,
                  e.message
                )
              })
          })
      }
    }
  }
}
</script>

<style lang="scss">
*,
::after,
::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

table {
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  thead {
    tr {
      th {
        font-size: 14px;
        &.column-id {
          max-width: 75px;
        }
      }
    }
  }
  tbody {
    tr {
      color: rgba(0, 0, 0, 0.87);
    }
  }
  tbody,
  tfoot,
  thead {
    tr {
      td,
      th {
        padding: 8px;
        vertical-align: middle;
        border-top: 1px solid #f4f4f4;
        line-height: 1.43;
      }
    }
  }
  &-responsive {
    min-height: 0.01%;
    overflow-x: auto;
  }
  &-bordered {
    tbody,
    tfoot,
    thead {
      tr {
        td,
        th {
          border: 1px solid #f4f4f4;
        }
      }
    }
  }
  &-striped {
    tbody {
      tr {
        &:nth-of-type(odd) {
          background-color: #f9f9f9;
        }
      }
    }
    .column-center {
      text-align: center;
    }
  }
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

.v-application {
  p {
    color: rgba(0, 0, 0, 0.87);
  }
  ol,
  ul {
    padding-left: 0 !important;
  }
}

.VuePagination {
  display: flex;
  justify-content: center;
  &__pagination-item {
    .active {
      background-color: #0c5c6f;
      box-shadow: none;
      color: #fff;
    }
  }
  &.row {
    margin-left: 0;
    margin-right: 0;
  }
}

.pagination {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  .disabled {
    a,
    a:focus,
    a:hover,
    span,
    span:focus,
    span:hover {
      color: #777;
      cursor: not-allowed;
      background-color: #fff;
      border-color: #ddd;
    }
  }
  li {
    display: inline;
    a,
    span {
      position: relative;
      margin: 0 0.3rem;
      padding: 6px 12px;
      line-height: 1.43;
      color: rgba(0, 0, 0, 0.87);
      text-decoration: none;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      transition: box-shadow 0.5s ease;
    }
    a:hover {
      box-shadow: none;
    }
  }
}

.form-control {
  display: block;
  width: 100%;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 1.3;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d2d6de;
  border-radius: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}

output {
  display: block;
  font-size: 12px;
  line-height: 1.3;
  color: #555;
}
</style>
