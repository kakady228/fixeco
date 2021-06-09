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


        const { coords } = useGeolocation();

        console.log("COORDS", coords);
        
        
        const currPos = computed(() => ({
            lat: coords.value.latitude,
            lng: coords.value.longitude,
        }));

        console.log('currPos: ', currPos);

        onMounted(async () => {
        
            this.mapDiv = ref(null);

            const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });

            await loader.load();

            setTimeout(() => {
                var map = new google.maps.Map(document.getElementById("map"), {
                    center: currPos.value,
                    zoom: 12
                });

                
                var coordinates = {lat: 56.8703515, lng: 53.1751202};
                var goodAutoCoords = {lat: 56.87103881526579, lng: 53.192616399510186};
                var castrolServiceCoords = {lat: 56.82480855872474, lng: 53.20691362307319};
                
                var currentMarker = '1';

                // Marker 1
                var marker1 = new google.maps.Marker({
                    position: coordinates,
                    map: map,
                    animation: google.maps.Animation.DROP ,
                    title: 'Заголовок'
                });
                marker1.addListener('click', function () {
                    marker1.info.open(map, marker1);
                    currentMarker = '0';
                    localStorage.setItem("currentMarker", currentMarker);
                });
                marker1.info = new google.maps.InfoWindow({
                    content: 'Add some info here Marker 1',
                });
                // End Marker 1

                // goodAutoMarker 
                var goodAutoMarker = new google.maps.Marker({
                    position: goodAutoCoords,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: 'Заголовок1'
                });
                goodAutoMarker.addListener('click', function () {
                    goodAutoMarker.info.open(map, goodAutoMarker);
                    currentMarker = '1';
                    localStorage.setItem("currentMarker", currentMarker);
                });
                goodAutoMarker.info = new google.maps.InfoWindow({
                    content: 'goodAutoMarker',
                });
                // End goodAutoMarker

                // Marker 3
                var castrolServiceMarker = new google.maps.Marker({
                    position: castrolServiceCoords,
                    map: map,
                    animation: google.maps.Animation.DROP ,
                    title: 'Заголовок2'
                });
                castrolServiceMarker.addListener('click', function () {
                    castrolServiceMarker.info.open(map, castrolServiceMarker);
                    currentMarker = '2';
                    localStorage.setItem("currentMarker", currentMarker);
                });
                castrolServiceMarker.info = new google.maps.InfoWindow({
                    content: 'castrolServiceMarker',
                });
                // End Marker 3

                this.currPos = coords;
                // console.log('Sadasdsadsadasdasd: ', this.currPos);
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
    }

    ConsoleLog(){
        console.log('console.log');
        
    }

    async sendData() {

        var userId = localStorage.getItem('userId');
        userId ? userId : 0;
    
        this.sendData1 = [{
            user_id: userId,
            break_description: this.crashDescription,
            mark_id: Number(this.currentMark), 
            marker_id: Number(localStorage.getItem("currentMarker")),
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