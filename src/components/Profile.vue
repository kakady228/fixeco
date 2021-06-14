<template>
    <div class="page-wrapper bg-gra-03 p-t-45 p-b-50">
        <div class="wrapper wrapper--w790">
            <div class="card card-5">
                <div class="card-heading">
                    <h2 class="title">Личный кабинет пользователя</h2>
                </div>
                <div class="card-body">
                    <form @submit.prevent>
                        <div class="form-row">
                            <div class="name">Имя</div>
                            <div class="value">
                                <div class="input-group-desc">
                                    <input class="input--style-5" v-model="user.name" type="text" name="name" placeholder="Иванов И.И.">
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="name">Email</div>
                            <div class="value">
                                <div class="input-group">
                                    <input class="input--style-5" v-model="userEmail" type="email" name="email" placeholder="sample@mail.com">
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="name">Номер телефона</div>
                            <div class="value">
                                <div class="col-12">
                                    <div class="input-group">
                                        <input class="input--style-5" v-model="userPhone" type="text" name="phone" placeholder="+7 (xxx) xxx-xx-xx">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="name">Тип учетной записи</div>
                            <div class="value">
                                <div class="input-group">
                                    <select class="form-select input--style-5 bg-white" v-model="userRole" name="role">
                                        <option disabled="disabled" selected="selected">Выберите тип учетной записи</option>
                                        <option value="Client">Клиент</option>
                                        <option value="AutoService">Автосервис</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <button class="btn btn--radius-2 btn--green">Сохранить данные</button>
                        </div>
                        <button @click="logout" class="btn btn--radius-2 btn--red">Выйти из учетной записи</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    components: {
    },
})


export default class Profile extends Vue {

    userName: string = '';
    userEmail: string = '';
    userPhone: string = '';
    userRole: string = '';

    user: any = {
        id: '',
        name: '',
    };
  

  created() {
    setTimeout(() => {
        var GETTER_USER = this.$store.getters.USER;
        
        console.log('STATE', GETTER_USER);
        
        this.userName = GETTER_USER.name;
        this.userEmail = GETTER_USER.email;
        this.userRole = GETTER_USER.role;
        

        let userName = GETTER_USER.name;
        let userId = GETTER_USER.id;

        console.log(this.$store.getters.USER);
        

        if(userId) {
            this.user = {
                id: userId,
                name: userName
            }
            
            localStorage.setItem('userId', userId);
        }   
    }, 1000);
    
      
      

  }

    
  logout() {
    let name = 'name';
    let value = this.user.name;
    let nameId = 'id';
    let id = this.user.id;

    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + "; path=/; max-age=-1";
    document.cookie = encodeURIComponent(nameId) + '=' + encodeURIComponent(id) + "; path=/; max-age=-1";

    window.location.replace('http://localhost:8080/');
  }

}

</script>

<style scoped src="../css/profile.css">

</style>