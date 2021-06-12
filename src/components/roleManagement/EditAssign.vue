<template>
  <div>
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

  </div>

</template>

<script>

import axios from "axios";

export default {
  name:'EditRole',
  props: ['item'],

  data(){
    return {
      name : this.item.name,
      description : this.item.description,
      level : this.item.level,
    }

  },


  methods:{

    createRole(){

      axios.post(window.config.baseUrl + 'role/update/' + this.item.id,
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
            title: 'Update Success.',
            message: 'Role updated successfully',
          });
          this.hideModal();
          window.functions.lazyReload()
        }
        else
        {
          this.flashMessage.error({
            title: 'Update Failed.',
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
      this.$bvModal.hide('editRole');

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