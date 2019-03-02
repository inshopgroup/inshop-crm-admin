<template>
<div>
  <section class="content-header">
    <h1>{{$t('company.list')}}</h1>
  </section>

  <section class="content">
    <div class="box box-primary">
      <div class="box-header with-border">
        <router-link :to="{ name: 'CompanyCreate' }" class="btn btn-primary pull-right">{{$t('company.add')}}</router-link>
      </div>
      <div class="box-body">
        <item-errors :entity="'company'"></item-errors>

        <api-table
                :entity="'Company'"
                :route="'companies'"
                :path="'company'"
                :filterable="filterable"
                :customFilters="customFilters"
                :sortable="sortable"
                :columns="columns"
                :templates="templates"
        >
          <template slot="filter__labels.id">
            <labels-filter></labels-filter>
          </template>
        </api-table>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import ItemErrors from '../../components/layout/errors/ItemErrors'
import ApiTable from '../../components/ApiTable'
import columnContacts from './../../table/ColumnContacts'
import columnCode from './../../table/ColumnCode'
import columnLabels from './../../table/ColumnLabels'
import columnAddressCountry from './../../table/ColumnAddressCountry'
import columnAddressCity from './../../table/ColumnAddressCity'
import columnAddressPostCode from './../../table/ColumnAddressPostCode'
import LabelsFilter from '../../components/filters/LabelsFilter'

export default {
  components: {LabelsFilter, ItemErrors, ApiTable},
  data: function () {
    return {
      columns: ['id', 'code', 'name', 'contacts.value', 'contactPerson', 'addresses.country.name', 'addresses.city.name', 'addresses.postCode', 'labels.id'],
      filterable: ['id', 'code', 'name', 'contacts.value', 'contactPerson', 'addresses.country.name', 'addresses.city.name', 'addresses.postCode'],
      customFilters: ['labels.id'],
      sortable: ['id', 'code', 'name', 'contactPerson'],
      templates: {
        'contacts.value': columnContacts,
        'addresses.country.name': columnAddressCountry,
        'addresses.city.name': columnAddressCity,
        'addresses.postCode': columnAddressPostCode,
        'labels.id': columnLabels,
        'code': columnCode,
      }
    }
  },
}
</script>
