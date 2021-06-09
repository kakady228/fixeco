<template>
    <div class="container ms-0 me-0">
        <div class="row col-12 py-2">
            <form @submit.prevent class="col-2 px-4 reviews-filter text-start">
                <div class="mb-3">
                    <h5 class="form-label">Марка</h5>
                    <input type="search_mark" class="form-control" placeholder="Поиск по маркам...">
                </div>
                <div :key="mark.i" v-for="mark in marks" class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input">
                    <label class="form-check-label">{{mark.name}}</label>
                </div>
            </form>
            <form @submit.prevent class="col-9 p-2 ms-5">
                <div class="d-flex">
                    <h1 class="text-start text-uppercase pink-header pt-0 mt-0">Отзывы</h1>
                    <button class="btn btn-lg review-button mt-auto mb-4 me-0 ms-auto" data-bs-toggle="modal" data-bs-target="#reviewModal" id="reviewModalButton">Оставить отзыв</button>
                </div>

                <div :key="review.id" v-for="review in reviews" class="card review-item my-3 text-start">
                    <div class="review-card-header d-flex justify-content-between">
                        <h5 class="">Автосервис: {{review.service_name}}</h5>
                        <h5 class="">Стоимость ремонта: {{review.cost}}р.</h5>
                    </div>

                    <div class="card-body d-flex mb-3">
                        <div class="col-6">
                            <h5 class="card-title"><img src="../assets/gear.svg" alt="gear">{{review.car}}</h5>
                            <p class="card-text">{{review.description}}</p>
                        </div>
                        <div class="col-6">
                            <div class="review-rating ms-auto me-0 mb-1">
                                {{review.rating}}
                            </div>
                            <div class="small text-end">
                                {{review.date}}
                            </div>
                        </div>
                    </div>

                </div>

            </form>
            
        </div>
            <!-- Модальное окно -->
            <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="reviewModalLabel">Создание отзыва</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent class="text-start">
                                <!-- <div class="mb-3 col-6">
                                    <label for="recipient-name" class="col-form-label">Автосервис:</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="mb-3 col-6">
                                    <label for="recipient-name" class="col-form-label">Стоимость ремонта:</label>
                                    <input type="text" class="form-control">
                                </div> -->
                                <div class="mb-3 row">
                                    <div class="col">
                                        <label for="recipient-name" class="col-form-label">Автосервис:</label>
                                        <input type="text" class="form-control">
                                    </div>
                                    <div class="col">
                                        <label for="recipient-name" class="col-form-label">Стоимость ремонта:</label>
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                                

                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Автомобиль:</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Текст отзыва:</label>
                                    <textarea class="form-control" id="message-text"></textarea>
                                </div>
                                <!-- <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Оценка:</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">Дата:</label>
                                    <input type="text" class="form-control">
                                </div> -->
                                <div class="mb-3 row">
                                    <div class="col">
                                        <label for="recipient-name" class="col-form-label">Оценка:</label>
                                    <input type="text" class="form-control">
                                    </div>
                                    <div class="col">
                                        <label for="recipient-name" class="col-form-label">Дата:</label>
                                    <input type="text" class="form-control">
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button type="button" class="btn review-button">Отправить отзыв</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script lang="ts">
import SelectionModel from '@/Models/SelectionModel';
import { Options, Vue } from 'vue-class-component';
var dateFormat = require("dateformat");

@Options({
  components: {
  },
})
export default class Reviews extends Vue {
    reviews: any[] = [];
    marks: SelectionModel[] = [];

    reviewDate: any;

    created() {
        fetch('http://podbor-api/reviews/read.php')
            .then(response => response.json())
            .then(json => {
            this.reviews = json.data
            
        })
        fetch('http://podbor-api/product/read.php')
            .then(response => response.json())
            .then(json => {
            this.marks = json.data
                
        })

        var reviewModal = document.getElementById('reviewModal');
        var reviewModalButton = document.getElementById('reviewModalButton');

        reviewModal?.addEventListener('shown.bs.modal', function () {
            reviewModalButton?.focus();
        })
        
    }
}
</script>
<style scoped>
    .reviews-filter {
        background: #FFFFFF;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    .pink-header {
        color: rgba(249, 119, 47, 0.55);
        font-size: 96px;
        font-weight: 900;
    }

    .review-item {
        box-shadow: -4px -4px 5px rgba(0, 0, 0, 0.11), 4px 4px 7px rgba(0, 0, 0, 0.11);
        border: none;
    }

    .review-card-header {
        padding: .5rem 1rem;
        margin-bottom: 0;
        background-color: rgba(0,0,0,.03);
        border-bottom: 1px solid rgba(0,0,0,.125);
    }

    .review-rating {
        width: 75px;
        height: 45px;
        border-radius: 5px;
        background-color: #f9772f;
        text-align: center;
        line-height: 45px;
        color: #fff;
        font-size: 30px;
        font-weight: 800;
    }

    .review-button {
        background-color: #f9772f !important;
        border: 1px #aaa solid;
        color: #fff;
    }
</style>