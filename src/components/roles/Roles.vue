<template>
  <Layout>
    <div class="container-fluid px-4">
    <h1 class="mt-4">Roles</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item">
      <!--<a href="index.html"></a>-->
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active">Roles</li>
    </ol>
    <div class="card mb-4">
      <div class="card-header">
         <div style="float: left">
           <i class="fas fa-setting me-1"></i>
           Roles
         </div>
        <div style="float: right">
          <!-- <b-button v-b-modal.create-role>Create Role</b-button>-->
         <b-button @click="$bvModal.show('addRole')">Create Role</b-button>
          <AddRole></AddRole>
          <b-modal id="editRole" title="Edit Role" aria-disabled="true" hide-footer>
            <EditRole :item="item" v-if="item"></EditRole>
          </b-modal>
         </div>

      </div>
      <div class="card-body">

        <b-row>
          <b-col md="3" offset-md="9">
            <b-form-input v-model="filter" type="search" placeholder="search here">
            </b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12">
            <b-table striped hover
                 :items="items"
                 :fields="fields"
                 :filter="filter"
                 :per-page="perPage"
                 :current-page="currentPage"
            >
              <template v-slot:cell(actions)="items">
                <b-button size="sm" @click="edit(items.item)" class="mr-1" variant="warning">
                  Edit
                </b-button>
              </template>

            </b-table>

            <b-pagination align="right" v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
          </b-col>
        </b-row>

      </div>
    </div>
  </div>

  </Layout>
</template>


<script>

import Layout from "../layouts/Layout";
import axios from "axios";
import AddRole from "./AddRole";
import EditRole from "./EditRole";

export default {
  name: 'Roles',
  components: {
    Layout,
    AddRole,
    EditRole,
  },

  data() {
    return {
      items: [],
      item:null,
      filter: null,
      fields: ['name', 'description', 'level', 'actions'],
      currentPage: 1,
      perPage: window.config.perPage,
      rows: 0
    }
  },

  created() {
    this.roles()
  },

  methods: {

     roles() {
       axios.get(window.config.baseUrl + 'roles',
        {
          headers: {
            'Authorization': 'Bearer ' + this.$session.get('token')
          }
        })
        .then(response => {
            this.rows = parseInt(response.data.data.length);
            this.items = response.data.data;
          })
        .catch(error => {
          window.flash.warning(this, 'Data fetching error', error.message)
        })
    },

    edit(data) {
      // I need to disable the button here
      this.item = data;
      this.$bvModal.show('editRole');

    }

  },





}

</script>