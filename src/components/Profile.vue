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
                        <div class="form-row border-bottom pb-3">
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
                    <form v-show="realUserRole == 'AutoService'" @submit.prevent class="border p-3 pb-0 mb-2">
                        <div class="form-row">
                            <div class="name">Добавьте свой автосервис</div>
                            <div class="value">
                                <div class="col-12">
                                    <div class="input-group">
                                        <input class="input--style-5" v-model="serviceName" type="text" name="serviceName" placeholder="Название автосервиса">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="name">Описание автосервиса</div>
                            <div class="value">
                                <div class="col-12">
                                    <div class="input-group">
                                        <input class="input--style-5" v-model="serviceDescription" type="text" name="serviceDescription" placeholder="Описание">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="name">Адрес</div>
                            <div class="value">
                                <div class="col-12">
                                    <div class="input-group">
                                        <input class="input--style-5" v-model="serviceAddress" type="text" name="serviceAddress" placeholder="Адрес автосервиса">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row mb-3">
                            <label for="inputAddress" class="mb-3 mx-auto name w-100">Установите метку на карте</label>
                            <div id="map" class="mb-3 map">

                            </div>
                            <button class="btn btn--radius-2 btn--green mx-auto" @click="sendService">Добавить автосервис</button>
                        </div>
                    </form>
                        <div class="mb-3">
                            <button class="btn btn--radius-2 btn--green" @click="sendProfile">Сохранить данные</button>
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
import { Loader } from '@googlemaps/js-api-loader';
import serviceMarker from '@/Models/serviceMarker'
import { computed, ref, onMounted } from 'vue';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAZ4949DA7kyuOft-8dQ-vLRauqbAdXx-0';

@Options({
    components: {
    },
})


export default class Profile extends Vue {

    userName: string = '';
    userEmail: string = '';
    userPhone: string = '';
    userRole: string = '';

    realUserRole: string = '';

    serviceMarker: serviceMarker[] = [];
    serviceDescription: string = '';
    serviceAddress: string = '';
    serviceName: string = '';

    user: any = {
        id: '',
        name: '',
    };
    mapDiv: any;
  

    created() {
            var GETTER_USER = this.$store.getters.USER;
            
            console.log('STATE', GETTER_USER);
            
            this.userName = GETTER_USER.name;
            this.userEmail = GETTER_USER.email;
            this.userRole = GETTER_USER.role;
            this.realUserRole = GETTER_USER.role;
            this.userPhone = GETTER_USER.phone;
            

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
    }

    async sendProfile() {

        var isConfirm = confirm('Вы уверены, что хотите изменить данные учетной записи?');
        if(isConfirm){
            var sendData1 = [{
                id: this.user.id,
                name: String(this.userName),
                email: String(this.userEmail),
                accountType: String(this.userRole),
                phone: String(this.userPhone)
            }];

            const url = 'http://podbor-api/users/update.php';
            const data = sendData1;
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
        }
    }

    async sendService() {

        var lat = window.localStorage.getItem('markerLat');
        var lng = window.localStorage.getItem('markerLng');

        var sendData1 = [{
            name: String(this.serviceName),
            description: String(this.serviceDescription),
            address: String(this.serviceAddress), 
            map_lat: Number(lat),
            map_lng: Number(lng)
        }];

        const url = 'http://podbor-api/services/create.php';
        const data = sendData1;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
    }


    async mounted() {


        this.mapDiv = ref(null);

        const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });

        await loader.load();


        var coordinates = {
            lat: 56.8670957,
            long: 53.1537628
        };

        var map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(coordinates.lat, coordinates.long),
            zoom: 12
        });

        var markerLat, markerLng;
        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', function(e: any) {            
            // placeMarker(e.latLng, map);
            clearOverlays();
            var marker = new google.maps.Marker({
                position: e.latLng,
                map: map
            });  

            markersArray.push(marker);
            markerLat = marker.getPosition().lat();
            markerLng = marker.getPosition().lng();
            window.localStorage.setItem('markerLat', markerLat);          
            window.localStorage.setItem('markerLng', markerLng);          
        });



        // ////////

        var markersArray:any[] = [];

        function clearOverlays() {
            for (var i = 0; i < markersArray.length; i++ ) {
                markersArray[i].setMap(null);
            }
            markersArray.length = 0;
        }
            
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