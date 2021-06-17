<template>

  <div class="container-fluid intro-image">
        <div class="row d-flex justify-content-center">
            <div class="col-sm-12 col-md-7 position-absolute translate-middle text-white text-center intro">
                <h3 class="col-12 font-32">Десятки автосервисов по всему городу</h3>
                <h1 class="col-12 text-uppercase font-58">Найдите лучший сервис</h1>
                <div class="input-group mb-3 h-55px mt-3">
                    <input v-model="introInput" type="text" class="form-control" placeholder="Напишите что нужно починить..." aria-label="Recipient's username" aria-describedby="button-addon2">
                    <router-link to="selection-form" class="btn btn-secondary col-sm-4 col-md-3 lh-55px" type="button" id="button-addon2" @click="sendIntroInput">Создать заявку</router-link>
                </div>
                <button class="col-3 btn call-me__btn mt-3">Перезвоните мне</button>
            </div>
            
        </div>
    </div>

    <div class="container-fluid mt-5">
        <div class="row col-12">

            <div class="text-center">
                <h1 class="brown-header">Как работает FixEco</h1>
            </div>


            <div class="d-flex justify-content-center flex-wrap col-8 mx-auto my-5">
<!-- 1 -->
                <div class="how-works w-50 d-flex">
                    <div class="hw-left col-3 mr-5">
                        1
                    </div>
                    <div class="hw-right col-8 ps-3">
                        <h5 class="font-20">Создаёте заявку</h5>
                        <p>с кратким описанием работ и желаемой датой ремонта. Потратите не более 3 минут.</p>
                    </div>
                </div>
<!-- 2 -->
                <div class="how-works w-50 d-flex">
                    <div class="hw-left col-3">
                        2
                    </div>
                    <div class="hw-right col-8 ps-3">
                        <h5 class="font-20">Получаете предложения</h5>
                        <p>от специализированных автосервисов по SMS или в личном кабинете.</p>
                    </div>
                </div>
<!-- 3 -->
                <div class="how-works w-50 d-flex">
                    <div class="hw-left col-3">
                        3
                    </div>
                    <div class="hw-right col-8 ps-3">
                        <h5 class="font-20">Сравниваете ответы</h5>
                        <p>наиболее подходящие по стоимости, отзывам, местоположению и другим параметрам.</p>
                    </div>
                </div>
<!-- 4 -->
                <div class="how-works w-50 d-flex">
                    <div class="hw-left col-3">
                        4
                    </div>
                    <div class="hw-right col-8 ps-3">
                        <h5 class="font-20">Подтверждаете запись</h5>
                        <p>а также все условия ремонта и можно смело ехать в автосервис.</p>
                    </div>
                </div>
<!--  -->
            </div>
        </div>
    </div>


    <div class="container-fluid" id="callme">
        <div class="row my-5 why-us-background py-5">

            <div class="text-center">
                <h1 class="brown-header">Почему именно мы</h1>
            </div>

            <div class="why-us col-12 d-flex justify-content-center">
                <div class="wu-left col-4">
                    <p class="font-20">Онлайн приложение «FixEco» создана с целью облегчения поиска автосервиса, и последующего ремонта вашего автомобиля. Наш веб-сайт предоставляет удобный, дружественный для пользователя интерфейс. Так же веб-сайт является полностью адаптивным, то есть, пользователь может зайти как со стационарного компьютера, так и с мобильных устройств. </p>
                </div>

                <div class="wu-right col-4 p-2 d-flex flex-column justify-content-around text-start">
                    <div>
                        <span class="col-12 font-36">
                            <img src="../assets/clocks.png" alt="">
                            10 мин
                        </span>
                        <p class="font-18">Среднее время ответа автосервиса на заявку</p>
                    </div>
                    <div>
                        <span class="col-12 font-36">
                            <img src="../assets/headphones.png" alt="">
                            24 часа
                        </span>
                       <p class="font-18">Круглосуточная техподдержка партнеров и автовладельцев</p>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container-fluid my-5">
        <div class="row">

            <div class="text-center">
                <h1 class="brown-header mb-5">Отзывы клиентов</h1>
            </div>

            <div class="reviews d-flex flex-wrap col-12 justify-content-center">

                <div class="card review-card w-25 mx-2" :key="review.i" v-for="review in reviews">
                    <div class="card-body">
                      <h5 class="card-title">Автосервис: {{ review.service_name }}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">Стоимость ремонта: {{ review.cost }}</h6>
                      <hr>
                      <p class="card-text">{{ review.description }}</p>
                      
                      <p class="text-end">{{ review.date }}</p>
                    </div>
                </div>

                <div class="col-12 text-center my-5">
                    <router-link to="/reviews#h1" type="button" class="btn show_all_reviews">Посмотреть все отзывы</router-link>
                </div>

            </div>

        </div>
    </div>


    <div class="container-fluid application-image position-relative">
        <div class="row col-sm-12 col-md-9 d-flex position-absolute application-absolute translate-middle">
            <div class="text-white text-center">
                <h3 class="col-12 font-42 text-uppercase">Оставьте заявку и сэкономьте на ремонте</h3>
                <h1 class="col-12 font-24 text-uppercase font-60">Создание заявки абсолютно бесплатно и займет у вас не более 5 минут</h1>
                <div class="input-group mb-3 h-55px mt-5">
                    <input v-model="introInput" type="text" class="form-control" placeholder="Напишите что нужно починить..." aria-label="Recipient's username" aria-describedby="button-addon2">
                    <router-link to="selection-form" class="btn btn-secondary col-sm-5 col-md-3 lh-55px" type="button" id="button-addon2" @click="sendIntroInput">Создать заявку</router-link>
                </div>
            </div>
            
        </div>
    </div>

</template> 

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class Home extends Vue {
    introInput: string = '';
    reviews: any[] = [];

    sendIntroInput() {
        localStorage.setItem('introInput', this.introInput);
    }

    created() {
        localStorage.removeItem('introInput');

        fetch('https://fixeco.tk/api/reviews/readTwo.php')
            .then(response => response.json())
            .then(json => {
            this.reviews = json.data
            
        })
    }
}
</script>

<style scoped>

    html, body {
        font-family: 'Archivo', sans-serif;
    }
    
    body {
        background-color: #fff !important;
    }

    .intro-image {
        background-blend-mode: multiply;
        background-image: url('../assets/intro.jpg');
        background-color: rgba(250, 170, 120, 1);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 80vh;
    }

    .h-55px {
        height: 55px;
    }

    .font-58 {
        font-size: 50px;
        font-weight: 700;
    }

    .font-42 {
        font-size: 42px;
        font-weight: 700;
    }

    .font-36 {
        font-size: 36px;
        font-weight: 700;
    }

    .font-32 {
        font-size: 32px;
        font-weight: 400;
    }

    .font-24 {
        font-size: 24px;
        font-weight: 400;
    }

    .font-20 {
        font-size: 20px;
        font-weight: 600;
    }

    .font-18 {
        font-size: 18px;
        font-weight: 400;
    }

    .brown-header {
        color: #B64708;
        font-size: 48px;
        font-weight: 700;
    }

    .why-us-background {
        background: rgba(249, 119, 47, 0.15);
    }

    .wu-left p {
        font-size: 20px;
        font-weight: 400;
        text-indent: 30px;
        text-align: left;
    }

    .review-item {
        background: #FFFFFF;
        box-shadow: -4px -4px 5px rgba(0, 0, 0, 0.11), 4px 4px 7px rgba(0, 0, 0, 0.11);
        border-radius: 10px;
    }

    .application-image {
        background-blend-mode: multiply;
        background-image: url('../assets/application-image.jpg');
        background-color: rgba(250, 170, 120, 1);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 50vh;
    }

    .call-me__btn {
        background: rgba(255, 254, 254, 0.81);
        border-radius: 7px;
        color: #B64708;
    }

    .hw-left {
        font-family: 'Montserrat Alternates', sans-serif;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(249, 119, 47, 0.55);
        color: #fff;
        text-align: center;
        font-size: 72px;
        font-weight: 900 !important;
        line-height: 80px;
    }

    .show_all_reviews {
        border: 1px solid #B64708;
        background: #fff;
        box-sizing: border-box;
        border-radius: 7px;
        color: #B64708;
        font-size: 18px;
    }

    .show_all_reviews:hover {
        border: 1px solid #000;
        background: #B64708;
        color: #fff;
    }

    .lh-55px {
        line-height: 40px;
    }

    .intro {
        top: 50%;
        left: 50%;
    }

    .application-absolute {
        top: 50%;
        left: 50%;
    }

    @media (max-width: 320px) {
        .intro {
            top: 40%;
        }

        .call-me__btn {
            margin-top: 2rem !important;
            width: 60%;
        }

        .how-works {
            width: 100% !important;
        }
        
        .hw-left {
            display: none;
        }
        .hw-right {
            width: 100%;
        }
        .wu-left {
            display: none;
        }
        .wu-right {
            width: 100%;
            text-align: center;
        }
        
        .review-card {
            width: 100% !important;
            margin: .7rem auto;
        }

        .application-image {
            height: 80vh;
        }

        .application-absolute {
            left: 53vw;
        }
    }

</style>
