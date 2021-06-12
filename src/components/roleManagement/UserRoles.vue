<template>
  <Layout>
    <div class="container-fluid px-4">
    <h1 class="mt-4">Role Management</h1>
    <ol class="breadcrumb mb-4">
      <li class="breadcrumb-item">
      <!--<a href="index.html"></a>-->
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
      <li class="breadcrumb-item active">Role Management</li>
    </ol>
    <div class="card mb-4">
      <div class="card-header">
         <div style="float: left">
           <i class="fas fa-setting me-1"></i>
           Role Management
         </div>
        <div style="float: right">
          <!-- <b-button v-b-modal.create-role>Create Role</b-button>-->
         <b-button @click="$bvModal.show('addRole')">Assign Role</b-button>
          <AssignRole></AssignRole>
          <b-modal id="editRole" title="Edit Role" aria-disabled="true" hide-footer>
            <EditAssign :item="item" v-if="item"></EditAssign>
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
import AssignRole from "./AssignRole";
import EditAssign from "./EditAssign";

export default {
  name: 'Users',
  components: {
    Layout,
    AssignRole,
    EditAssign,
  },

  data() {
    return {
      items: [],
      item:null,
      filter: null,
      fields: ['name', 'description', 'level', 'actions'],
      currentPage: 1,
      perPage: 5,
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
        .then(res => {
            this.rows = parseInt(res.data.data.length);
            this.items = res.data.data;
          })
        .catch(error => {
          console.log(error);
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