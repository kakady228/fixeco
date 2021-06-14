<template>
<div class="container-fluid py-5" style="background: rgba(249, 119, 47, 0.15) !important">
    <div class="form-wrapper pt-1">
        <h1 class="text-start text-uppercase pink-header pt-0 mt-0">Заявка</h1>

        <form @submit.prevent>
            <div class="row">
                <div class="form-group col-md-6 text-start">
                    <label for="carMark">Марка автомобиля</label>
                    <select class="form-control" v-model="currentOption" @change="showOption">
                        <option selected>Выберите марку автомобиля</option>
                        <option :key="mark.id" v-for="mark in marks" :value="mark.id">{{  mark.name !== '' ? mark.name  : 'Выберите марку автомобиля'  }}</option>
                    </select>
                </div>
                <div class="form-group col-md-6 text-start">
                    <label for="carYear">Год</label>

                    <select class="form-control" v-model="currentYear">
                        <option selected>Выберите год выпуска автомобиля</option>
                        <option :key="year.id" v-for="year in years" :value="year.id">{{ year.name }}</option>
                    </select>
                </div>
            </div>

            <div class="form-group my-3 text-start">
                <label for="carModel">Модель</label>
                <select class="form-control" v-model="currentModel" >
                    <option selected>Выберите модель автомобиля</option>
                    <option :key="model.id" v-for="model in modelsList" :value="model.id">{{ model.name }}</option>
                </select>
            </div>

            <div class="form-group mb-3 text-start">
                <label for="crashDescription">Опишите поломку</label>
                <textarea v-model="crashDescription" cols="30" rows="5" class="form-control" placeholder="Например: Ремонт ходовой части..."></textarea>
            </div>
           

            
        </form>
        <form @submit.prevent>
            <div class="form-group">
                <label for="inputAddress" class="mb-3">Выберите нужный автосервис</label>
                <div id="map" class="mb-3">

                </div>
            </div>
            <button type="submit" class="btn btn-primary" @click="sendData">Отправить данные</button>
        </form>
    </div>
</div>
    

</template>

<script lang="ts">
import SelectionModel from '@/Models/SelectionModel';
import sendDataModel from '@/Models/sendDataModel';
import SelectionMap from '@/components/SelectionMap.vue';
import Year from '@/Models/Year';
import { Options, Vue } from 'vue-class-component';

import { useGeolocation } from '@/useGeolocation';
import { computed, ref, onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAZ4949DA7kyuOft-8dQ-vLRauqbAdXx-0';
//Emitter
import mitt from 'mitt';
const emitter = mitt();

@Options({
    components: {
        SelectionMap
    },
})


export default class Selection extends Vue {
    marks: SelectionModel[] = [];
    years: Year[] = [];
    models: SelectionModel[] = [];
    modelsList: SelectionModel[] = [];

    serviceList: any;

    array123: any[] = [];
    
    currentMark: number = 0;
    currentModel: number = 0;
    currentYear: number = 0;
    crashDescription: string = '';

    sendData1: sendDataModel[] = [];

    currentOption: string = 'Выберите марку автомобиля';

    currPos: any = {
        value: {
            lat: 0,
            lng: 0
        }
    };
    mapDiv: any;



    created() {

        this.crashDescription = localStorage.getItem('introInput')!.toString();

        
        fetch('http://podbor-api/model/read.php')
            .then(response => response.json())
            .then(json => {
            this.models = json.data
            
            })
            

        fetch('http://podbor-api/product/read.php')
            .then(response => response.json())
            .then(json => {
            this.marks = json.data
                
            })

        fetch('http://podbor-api/year/read.php')
            .then(response => response.json())
            .then(json => {
            this.years = json.data
            
            })

        fetch('http://podbor-api/services/read.php')
            .then(response => response.json())
            .then(json => {
            this.serviceList = json.data;
            console.log('serviceList: ', this.serviceList)
            
            })

        const { coords } = useGeolocation();

        // console.log("COORDS", coords);
        
        
        const currPos = computed(() => ({
            lat: coords.value.latitude,
            lng: coords.value.longitude,
        }));

        // console.log('currPos: ', currPos);

        onMounted(async () => {
        
            this.mapDiv = ref(null);

            const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });

            await loader.load();

            setTimeout(() => {
                var map = new google.maps.Map(document.getElementById("map"), {
                    center: currPos.value,
                    zoom: 12
                });

                

                
                var currentMarker = '1';

                var array123 = this.array123;

                // Marker 1
                for (let i = 0; i < this.serviceList.length; i++) {
                    const element = this.serviceList[i];
                    const elementName = this.serviceList[i].name;

                    var coordinates = {lat: Number(element.map_lat), lng: Number(element.map_long)};

                    array123[i] = new google.maps.Marker({
                        position: coordinates,
                        map: map,
                        animation: google.maps.Animation.DROP,
                        title: elementName
                    });
                    array123[i].addListener('click', function () {
                        array123[i].info.open(map, array123[i]);
                        currentMarker = String(i+1);
                        localStorage.setItem("currentMarker", currentMarker);
                    });
                    array123[i].info = new google.maps.InfoWindow({
                        content: element.description,
                    });
                    // End Marker 1
                }
                this.currPos = coords;
            }, 1000);
        })
    }

    getCurrentMarker() {
        let marker = localStorage.getItem("currentMarker");
        console.log(marker);        
    }

    showOption() {
        console.log('showOption worked');
        
        
        if(this.currentOption === '1') {

            this.modelsList = (this.models.filter(i => i.mark_id == 1));
            this.currentMark = 1;
            emitter.emit('modelsEvent', this.modelsList);

        } 

        else if (this.currentOption === '2') {

            this.modelsList = (this.models.filter(i => i.mark_id == 2));
            this.currentMark = 2;
            emitter.emit('modelsEvent', this.modelsList);

        }

        else if (this.currentOption === '3') {  

            this.modelsList = (this.models.filter(i => i.mark_id == 3));
            this.currentMark = 3;
            emitter.emit('modelsEvent', this.modelsList);

        }

        else if (this.currentOption === '4') {

            this.modelsList = (this.models.filter(i => i.mark_id == 4));
            this.currentMark = 4;
            emitter.emit('modelsEvent', this.modelsList);

        }

        else if (this.currentOption === '5') {

            this.modelsList = (this.models.filter(i => i.mark_id == 5));
            this.currentMark = 5;
            emitter.emit('modelsEvent', this.modelsList);

        }

        else if (this.currentOption === '6') {

            this.modelsList = (this.models.filter(i => i.mark_id == 6));
            this.currentMark = 6;
            emitter.emit('modelsEvent', this.modelsList);
            
        }

        else if (this.currentOption === '19') {

            this.modelsList = (this.models.filter(i => i.mark_id == 19));
            this.currentMark = 19;
            emitter.emit('modelsEvent', this.modelsList);

        }

        else if (this.currentOption === '20') {

            this.modelsList = (this.models.filter(i => i.mark_id == 20));
            this.currentMark = 20;
            emitter.emit('modelsEvent', this.modelsList);

        }

        else if (this.currentOption === '21') {

            this.modelsList = (this.models.filter(i => i.mark_id == 21));
            this.currentMark = 21;
            emitter.emit('modelsEvent', this.modelsList);

        }

        else if (this.currentOption === '22') {

            this.modelsList = (this.models.filter(i => i.mark_id == 22));
            this.currentMark = 22;
            emitter.emit('modelsEvent', this.modelsList);

        }

        else if (this.currentOption === '23') {

            this.modelsList = (this.models.filter(i => i.mark_id == 23));
            this.currentMark = 23;
            emitter.emit('modelsEvent', this.modelsList);

        }

        else if (this.currentOption === '24') {

            this.modelsList = (this.models.filter(i => i.mark_id == 24));
            this.currentMark = 24;
            emitter.emit('modelsEvent', this.modelsList);

        }
    }

    ConsoleLog(){
        console.log('console.log');
        
    }

    async sendData() {

        var userId = localStorage.getItem('userId');
        
        if (userId == undefined) {
            userId = 'NULL';
        }
    
        this.sendData1 = [{
            user_id: userId,
            break_description: this.crashDescription,
            mark_id: Number(this.currentMark), 
            service_id: Number(localStorage.getItem("currentMarker")),
            model_id: Number(this.currentModel),
            year_id: Number(this.currentYear)
        }];

        const url = 'http://podbor-api/users_orders/create.php';
        const data = this.sendData1;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        
        alert('Заявку отправлена');
        
        this.$router.push('/');
    }
    


}
</script>

<style lang="css" scoped>

    #map{
          height: 400px;
          width: 100%;
    }

    #app {
        background: rgba(249, 119, 47, 0.15) !important;
    }

    .form-wrapper {
        background: #fff;
        margin-left: auto;
        margin-right: auto;
        width: 70%;
        border-radius: .1em;
        padding: 2rem;
        -webkit-box-shadow: -1px 1px 8px 0px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: -1px 1px 8px 0px rgba(34, 60, 80, 0.2);
        box-shadow: -1px 1px 8px 0px rgba(34, 60, 80, 0.2);
    }

    .pink-header {
        color: rgba(249, 119, 47, 0.55);
        font-size: 96px;
        font-weight: 900;
    }

</style>