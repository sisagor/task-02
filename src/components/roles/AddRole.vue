<template>

  <div>
    <b-modal id="addRole" title="Create Role" aria-disabled="true" hide-footer>
    <b-form @submit.prevent="createRole" @reset="reset">
        <b-form-group id="name" label="Name:" label-for="name">
          <b-form-input
              id="name"
              label="Name:"
              v-model="name"
              type="text"
              placeholder="Enter name"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="description" label="Description:" label-for="description">
          <b-form-input
              id="description"
              v-model="description"
              placeholder="Enter description"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="level" label="Level:" label-for="level">
          <b-form-input
              id="level"
              v-model="level"
              placeholder="Enter Level"
              required
          ></b-form-input>
        </b-form-group>

        <div class="modal-footer">
          <b-button size="sm" type="submit" variant="success">
            create
          </b-button>
          <b-button size="sm" variant="danger" type="reset">
            Reset
          </b-button>
        </div>
    </b-form>
    </b-modal>
  </div>

</template>

<script>

import axios from "axios";

export default {
  name:'AddRole',

  data(){
    return {
      name : null,
      description : null,
      level : null,
    }

  },


  methods:{

    createRole(){

      axios.post(window.config.baseUrl + 'role/store',
          {
            name:this.name, description:this.description, level:this.level,
          },
          { headers: {
                'Authorization': 'Bearer ' + this.$session.get('token')
              }
          }
      )
      .then(response => {

        if (response.data.status){
          window.flash.success(this, 'Create success', 'Role created successfully.')
          window.functions.hideModal(this, 'addRole');
          window.functions.lazyReload();
        }
        else
        {
          window.flash.warning(this, 'Create failed', response.data.data.message)
        }

      })
      .catch(error => {
        window.flash.error(this, 'Failed', error.message)
      })
    },

    reset(event) {
      event.preventDefault()
      this.name = ''
      this.description = null
      this.level = null
      window.functions.hideModal(this, 'addRole');
    },

  }

}

</script>
