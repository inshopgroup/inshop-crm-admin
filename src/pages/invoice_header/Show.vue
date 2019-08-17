<template>
  <is-show-template
    :fields="fields"
    entity="InvoiceHeader"
    :tabs="['lines']"
    :history-key="historyKey"
  >
    <template v-slot:lines="{ item }">
      <lines :lines="item.lines" />
    </template>
  </is-show-template>
</template>

<script>
import Lines from './Lines'

export default {
  components: {
    Lines
  },
  data() {
    return {
      historyKey: 1,
      fields: [
        {
          property: 'number'
        },
        {
          property: 'status',
          path: 'status.name',
          link: {
            route: 'InvoiceStatusShow',
            param: 'status.id'
          }
        },
        {
          property: 'type',
          path: 'type.name',
          link: {
            route: 'InvoiceTypeShow',
            param: 'type.id'
          }
        },
        {
          property: 'orderHeader',
          path: 'orderHeader.number',
          link: {
            route: 'OrderHeaderShow',
            param: 'orderHeader.id'
          }
        },
        {
          property: 'companyFrom',
          path: 'companyFrom.name',
          link: {
            route: 'CompanyShow',
            param: 'companyFrom.id'
          }
        },
        {
          property: 'companyTo',
          path: 'companyTo.name',
          link: {
            route: 'CompanyShow',
            param: 'companyTo.id'
          }
        },
        {
          property: 'agreement',
          path: 'agreement.name',
          link: {
            route: 'DocumentShow',
            param: 'agreement.id'
          }
        },
        {
          property: 'currency',
          path: 'currency.name',
          link: {
            route: 'CurrencyShow',
            param: 'currency.id'
          }
        },
        {
          property: 'language',
          path: 'language.name',
          link: {
            route: 'LanguageShow',
            param: 'language.id'
          }
        },
        {
          property: 'dateOfInvoice',
          type: 'datetime'
        },
        {
          property: 'dateOfSale',
          type: 'datetime'
        },
        {
          property: 'maturity'
        }
      ]
    }
  }
}
</script>
