<template>
  <v-app>
  <v-main>
    <v-container
        class="fill-height"
        fluid
    >
      <v-row
          align="center" justify="center"
      >
        <v-spacer></v-spacer>
        <v-col
            cols="12"
            sm="12"
            md="6"
        >
          <v-form @submit.prevent="send" ref="form" >
            <v-card class="elevation-12">
              <v-toolbar
                  color="light"

                  flat
              >
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-text-field
                    v-model="fullname"
                    :rules="rules.req"
                    label="Full name"
                    outlined
                    dense
                ></v-text-field>
                <v-autocomplete
                    v-model="conutrycode"
                    :items="countries"
                    item-text="name"
                    item-value="idd"
                    label="Country"
                    @change="countyChanged"
                    outlined
                    dense
                ></v-autocomplete>
                <v-text-field
                    v-model="phone"
                    :rules="rules.phoneRules"
                    label="Phone number"
                    outlined
                    dense

                ></v-text-field>
                <v-text-field
                    v-model="email"
                    :rules="rules.emailRules"
                    label="Email"
                    outlined
                    dense
                ></v-text-field>

              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  color="info"

                        type="submit"
                >Send</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </v-main>
  </v-app>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      url: 'http://127.0.0.1:8000/',
      fullname: '',
      conutrycode : '',
      phone: '',
      email: '',
      countries: [],
      rules: {
        name: [
          val => !!val || "Don't leave it empty!",
          val => (val && val.length <= 25) || "Adı 25 simvoldan kiçik olmalıdır!",
        ],
        emailRules: [
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        phoneRules: [
          v => /^\+(\d+){2}\ (\d){2}\ (\d){3}\-(\d){2}\-(\d){2}$/.test(v) || 'Phone must be valid ex:+994 55 555-55-55'
        ],
        req: [
          val => !!val || "Don't leave it empty!",
        ]
      },
    }
  },
  methods : {
    send(){
      if (this.$refs.form.validate()){
        axios.post(this.url+'api/sendMessage',{
          fullname:this.fullname,
          phone:this.phone,
          email:this.email
        }).then(r => {
          if (r.data.success){
            this.$toast.success("Message send successfuly!");
          }
          else
            this.$toast.error("Have any problem!");
        })
      }
      else {
        this.$toast.error("Please fill all input correctly!");
      }

    },
    countyChanged(){
      this.phone = this.conutrycode+ ' ';
    },

  },
  created() {
    axios.get(this.url+'countries.json').then(r => {
      this.countries = r.data;
    })
  },
}
</script>
