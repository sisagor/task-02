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
import $ from 'jquery';

export default {
  name:'SaveRole',
  props: ['item'],

  data(){
    return {
      name : null,
      description : null,
      level : null,
      url : null,
    }

  },

  mounted() {
    console.log($('#addRole').hasClass('show') );
    //check if prop value exist
    if (this.item !== null) {
        this.name = this.item.name,
        this.description = this.item.description,
        this.level = this.item.level
        this.url = 'role/store/' + this.item.id
    }
    else {
      this.url = 'role/store/'
    }

  },

  methods:{

    createRole(){

      axios.post(window.config.baseUrl + this.url,
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
          this.flashMessage.success({
            title: 'Create Success.',
            message: 'Role created successfully',
          });
          this.hideModal()
        }
        else
        {
          this.flashMessage.error({
            title: 'Create Failed.',
            message: response.data.data.message,
          });
        }

      })
      .catch(error => {
        this.flashMessage.error({
          title: 'Create Failed.',
          message: error.message,
        });
      })
    },

    reset(event) {
      event.preventDefault()
      this.name = ''
      this.description = null
      this.level = null
      this.hideModal()
    },

    hideModal(){
      this.$bvModal.hide('addRole');

    }
  }

}

</script>


<style>

  .form-group{
    padding-top: 5px;
  }

  .modal-footer {
    justify-content: center;
  }

</style>