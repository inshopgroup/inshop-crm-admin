<template>
  <div class="table-responsive">
    <button class="btn btn-primary" @click="create($event.target)">{{$t('company_product.add')}}</button>

    <br>
    <br>

    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th style="width: 75px;">{{$t('company_product.id')}}</th>
        <th>{{$t('company_product.company.name')}}</th>
        <th>{{$t('company_product.product.name')}}</th>
        <th>{{$t('company_product.currency.name')}}</th>
        <th>{{$t('company_product.price_buy_netto')}}</th>
        <th>{{$t('company_product.availability')}}</th>
        <th>{{$t('company_product.createdAt')}}</th>
        <th>{{$t('company_product.updatedAt')}}</th>
        <th style="width: 100px;" />
      </tr>
      </thead>
      <tbody>
      <tr v-for="companyProduct in companyProducts" :key="companyProduct['id']">
        <td>
            {{ companyProduct['id'] }}
        </td>
        <td>
          <router-link v-if="companyProduct" :to="{name: 'CompanyShow', params: { id: companyProduct['company']['id'] }}">
            {{ companyProduct['company']['name'] }}
          </router-link>
        </td>

        <td>
          <router-link v-if="companyProduct" :to="{name: 'ProductShow', params: { id: companyProduct['product']['id'] }}">
            {{ companyProduct['product']['name'] }}
          </router-link>
        </td>

        <td>
            {{ companyProduct['currency']['name'] }}
        </td>
        <td>
            {{ companyProduct['priceBuyNetto'] }}
        </td>
        <td>
            {{ companyProduct['availability'] }}
        </td>
        <td>
            {{ moment(companyProduct['createdAt']).format('DD-MM-YYYY HH:mm') }}
        </td>
        <td>
            {{ moment(companyProduct['updatedAt']).format('DD-MM-YYYY HH:mm') }}
        </td>
        <td>
          <div class="btn-group" role="group">
            <button class="btn btn-info" @click="edit(companyProduct, $event.target)">
              <span class="fa fa-pencil" aria-hidden="true" />
              <span class="sr-only">{{$t('edit')}}</span>
            </button>

            <button class="btn btn-info" @click="deleteItem(companyProduct)">
              <span class="fa fa-remove" aria-hidden="true" />
              <span class="sr-only">{{$t('delete')}}</span>
            </button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>

    <modal-company-product-form
            :modal-edit="modalEdit"
            :enable-company="!company"
            :enable-product="!product"
            @companyProductCreated="reloadCompanyProducts()"
    ></modal-company-product-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ModalCompanyProductForm from './ModalCompanyProductForm'

  export default {
    name: 'CompanyProducts',
    components: {ModalCompanyProductForm},
    props: {
      company: null,
      product: null,
      companyProducts: {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    data () {
      return {
        modalEdit: {
          title: null,
          item: {},
          url: null,
          method: null
        }
      }
    },
    methods: {
      ...mapActions({
        del: 'company_product/del/del',
      }),
      deleteItem (item) {
        if (window.confirm(this.$t('delete_are_you_sure'))) {
          this.del(item).then(() => {
            this.$toastr.s(this.$t('companyProduct.deleted', {companyProduct: item.name}), this.$t('deleted'))
            this.reloadCompanyProducts()
          })
        }
      },
      create (button) {
        this.modalEdit = {
          title: this.$t('company_product.add'),
          item: {
            company: this.company,
            product: this.product,
          },
          url: process.env.API_URL + '/company_products',
          method: 'post'
        }

        $('#modal-company-product-edit').modal('show')
      },
      edit (item, button) {
        this.modalEdit = {
          title: this.$t('company_product.edit', {companyProduct: item.name}),
          item: Object.assign({}, item),
          url: process.env.API_URL + item.id,
          method: 'put'
        }

        $('#modal-company-product-edit').modal('show')
      },
      reloadCompanyProducts () {
        this.$emit('reloadCompanyProducts')
      }
    }
  }
</script>
