<template>
  <form @submit.prevent="handleSubmit(item)">
    <section class="content">
      <item-errors :entity="'invoice_header'"></item-errors>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('invoice_header.tabs.general')}}</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <form-input :item="item" :errors="errors" :property="'number'" :label="'invoice_header.number'" @fieldUpdated="updateValue"></form-input>
            </div>
            <div class="col-md-6">
              <form-select :item="item" :errors="errors" :property="'status'" :option-property="'invoice_header_status'" :label="'invoice_header.status.name'" @fieldUpdated="updateValue"></form-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <form-select :item="item" :errors="errors" :property="'companyFrom'" :option-property="'company'" :label="'invoice_header.companyFrom.name'" @fieldUpdated="updateValue"></form-select>
            </div>
            <div class="col-md-6">
              <form-select :item="item" :errors="errors" :property="'companyTo'" :option-property="'company'" :label="'invoice_header.companyTo.name'" @fieldUpdated="updateValue"></form-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <form-select :item="item" :errors="errors" :property="'type'" :option-property="'invoice_header_type'" :label="'invoice_header.type.name'" @fieldUpdated="updateValue"></form-select>
            </div>
            <div class="col-md-6">
              <form-select :item="item" :errors="errors" :property="'currency'" :option-property="'currency'" :label="'invoice_header.currency.name'" @fieldUpdated="updateValue"></form-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <form-select :item="item" :errors="errors" :property="'agreement'" :option-property="'document'" :label="'invoice_header.agreement.name'" @fieldUpdated="updateValue"></form-select>
            </div>
            <div class="col-md-6">
              <form-select :item="item" :errors="errors" :property="'language'" :option-property="'language'" :label="'invoice_header.language.name'" @fieldUpdated="updateValue"></form-select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <form-date-picker :item="item" :errors="errors" :property="'dateOfInvoice'" :label="'invoice_header.dateOfInvoice'" @fieldUpdated="updateValue"></form-date-picker>
            </div>
            <div class="col-md-6">
              <form-input :item="item" :errors="errors" :property="'maturity'" :label="'invoice_header.maturity'" @fieldUpdated="updateValue"></form-input>
            </div>
          </div>

          <div class="row">
        <div class="col-md-6">
          <form-date-picker :item="item" :errors="errors" :property="'dateOfSale'" :label="'invoice_header.dateOfSale'" @fieldUpdated="updateValue"></form-date-picker>
        </div>
        <div class="col-md-6">
          <form-select :item="item" :errors="errors" :property="'orderHeader'" :option-property="'order_header'" :label="'invoice_header.orderHeader.number'" @fieldUpdated="updateValue"></form-select>
        </div>
      </div>
        </div>
      </div>

      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">{{$t('invoice_header.tabs.lines')}}</h3>
        </div>
        <div class="box-body">

          <button type="button" class="btn btn-info" @click.prevent="addLine()">
            <span class="fa fa-plus" aria-hidden="true" />
            <span>{{$t('invoice_line.add')}}</span>
          </button>

          <table class="table table-striped">
            <thead>
              <tr>
                <th>{{$t('invoice_line.product.name')}}</th>
                <th>{{$t('invoice_line.name')}}</th>
                <th>{{$t('invoice_line.vat.name')}}</th>
                <th>{{$t('invoice_line.unitPriceNetto')}}</th>
                <th>{{$t('invoice_line.unitsCount')}}</th>
                <th width="60px;"></th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="line in item.lines" :key="line.id">
              <td>
                <form-select :item="line" :errors="errors" :property="'product'" :option-property="'product'" :label="'invoice_line.product.name'" @fieldUpdated="updateValue"></form-select>
              </td>
              <td>
                <form-input :item="line" :errors="errors" :property="'name'" :label="'invoice_line.name'" @fieldUpdated="updateValue"></form-input>
              </td>
              <td>
                <form-select :item="line" :errors="errors" :property="'vat'" :option-property="'vat'" :label="'invoice_line.vat.name'" @fieldUpdated="updateValue"></form-select>
              </td>
              <td>
                <form-number :item="line" :errors="errors" :property="'unitPriceNetto'" :label="'invoice_line.unitPriceNetto'" @fieldUpdated="updateValue"></form-number>
              </td>
              <td>
                <form-number :item="line" :errors="errors" :property="'unitsCount'" :label="'invoice_line.unitsCount'" @fieldUpdated="updateValue"></form-number>
              </td>
              <td>
                <button type="button" class="btn btn-info" @click.prevent="removeLine(line)">
                  <span class="fa fa-remove" aria-hidden="true" />
                  <span class="sr-only">{{$t('delete')}}</span>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <item-edit-actions :item="item" :entity="'InvoiceHeader'" :path="'invoice_header'"></item-edit-actions>
    </section>
  </form>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import ItemEditActions from '../../components/layout/ItemEditActions'
  import FormSelect from "../../components/layout/form/FormSelect";
  import ItemErrors from "../../components/layout/errors/ItemErrors";

  export default {
    components: {
      ItemErrors,
      FormSelect,
      ItemEditActions
    },
    props: {
      handleSubmit: {
        type: Function,
        required: true
      },
      item: {
        type: Object,
        required: true
      }
    },
    beforeDestroy () {
      this.reset()
    },
    computed: {
      ...mapGetters({
        errors: 'invoice_header/errors'
      })
    },
    methods: {
      ...mapActions({
        reset: 'invoice_header/reset'
      }),
      updateValue(property, value) {
        this.$store.commit('invoice_header/INVOICE_HEADER_UPDATE_ITEM', {[property]: value})
      },
      addLine () {
        this.item.lines.push({uuid: Date.now()})
      },
      removeLine (line) {
        this.item.lines = this.item.lines.filter(function(el) {
          if (!line.id) {
            line.id = line.uuid
          }

          return line.id !== el.id;
        })
      },
      productSelected (line) {
        if (!line.name) {
          line.name = line.product.name
        }

        if (!line.vat) {
          line.vat = line.product.vat
        }

        if (!line.unitsCount) {
          line.unitsCount = 1
        }

        // TODO: add prices to product
        if (!line.unitPriceNetto) {
          // line.unitPriceNetto = line.product.price
        }
      }
    }
  }
</script>
