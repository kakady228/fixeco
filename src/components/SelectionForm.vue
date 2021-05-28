<template>
    <div class="form-wrapper">

        <form @submit.prevent>
            <div class="row">
                <div class="form-group col-md-6">
                    <label for="carMark">Марка автомобиля</label>
                    <select class="form-control" v-model="currentOption" @change="showOption">
                        <option selected>Выберите марку автомобиля</option>
                        <option :key="mark.id" v-for="mark in marks" :value="mark.id">{{  mark.name !== '' ? mark.name  : 'Выберите марку автомобиля'  }}</option>
                    </select>
                </div>
                <div class="form-group col-md-6">
                    <label for="carYear">Год</label>

                    <select class="form-control" v-model="currentYear">
                        <option selected>Выберите год выпуска автомобиля</option>
                        <option :key="year.id" v-for="year in years" :value="year.id">{{ year.name }}</option>
                    </select>
                </div>
            </div>

            <div class="form-group my-3">
                <label for="carModel">Модель</label>
                <select class="form-control" v-model="currentModel" >
                    <option selected>Выберите модель автомобиля</option>
                    <option :key="model.id" v-for="model in modelsList" :value="model.id">{{ model.name }}</option>
                </select>
            </div>

            <div class="form-group mb-3">
                <label for="crashDescription">Опишите поломку</label>
                <textarea v-model="crashDescription" cols="30" rows="10" class="form-control" placeholder="Например: Ремонт ходовой части..."></textarea>
            </div>
            <!-- <router-link to="/selection-map" type="submit" class="btn btn-primary" :modelsList="modelsList">Продолжить</router-link> -->

            <button type="submit" class="btn btn-primary" @click="sendData">Отправить данные</button>
        </form>
    </div>
    <SelectionMap :modelsList="modelsList" />

</template>

<script lang="ts">
import SelectionModel from '@/Models/SelectionModel';
import sendDataModel from '@/Models/sendDataModel';
import SelectionMap from '@/components/SelectionMap.vue';
import Year from '@/Models/Year';
import { Options, Vue } from 'vue-class-component';

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



    created() {

        
        fetch('http://podbor-api/model/read.php')
            .then(response => response.json())
            .then(json => {
            this.models = json.data
            
            })
            

        fetch('http://podbor-api/product/read.php')
            .then(response => response.json())
            .then(json => {
            this.marks = json.data
                console.log(this.marks);
                
            })

        fetch('http://podbor-api/year/read.php')
            .then(response => response.json())
            .then(json => {
            this.years = json.data
            
            })
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

        this.sendData1 = [{
            break_description: this.crashDescription, 
            marker_id: localStorage.getItem("currentMarker"),
            mark_id: this.currentMark,
            model_id: this.currentModel,
            year_id: this.currentYear,
        }];

        const url = 'http://podbor-api/users_orders/create.php';
        const data = this.sendData1;
        const response = await fetch(url, {
            method: 'POST', // или 'PUT'
            body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));

        
    }
    


}
</script>

<style lang="css">

    .form-wrapper {
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        border-radius: .5em;
        padding: 2rem;
        -webkit-box-shadow: -1px 1px 8px 0px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: -1px 1px 8px 0px rgba(34, 60, 80, 0.2);
        box-shadow: -1px 1px 8px 0px rgba(34, 60, 80, 0.2);
    }

</style>