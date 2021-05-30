<template>
	<div class="container-fluid py-5" style="background: rgba(249, 119, 47, 0.15) !important">
		<form @submit.prevent class="reg-form" method="POST">
			<div class="reg-form-header mt-3">
				Авторизация
			</div>
			<div class="reg-form-wrapper">
				<input id="email" class="reg-form-input" type="email" name="email" placeholder="sample@mail.com">
				<input id="pass" class="reg-form-input" type="password" name="pass" placeholder="******">
				<button class="btn btn-r reg-form-button" type="submit">Войти</button>
			</div>
			<p class="reg-form-subtitle">
				<router-link to="/registration">Зарегистрироваться?</router-link>
			</p>
		</form>
	</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class LoginForm extends Vue {

}
</script>

<style scoped>

.reg-form {
	margin: 100px auto;
	flex-wrap: wrap;
	display: flex;
	justify-content: center;
	width: 400px;
	min-height: 450px;
	border-radius: 10px;
	-webkit-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
	background-color: #fff;
}

.reg-form-header {
	font-size: 42px;
	max-height: 70px;
	border-bottom: 2px #ccc solid;
	margin-bottom: 20px;
}

.reg-form-wrapper {
	text-align: center;
}

.reg-form-subtitle {
	font-size: 14px;
	color: #888;
}

.reg-form-subtitle a {
	color: #888;
}

.reg-form-input {
	padding: 10px 30px;
	margin: 5px;
	border-radius: 5px;
    border: 1px #ccc solid;
    background-color: #f1f1f1;
}

.reg-form-button {
	margin: 20px;
	border-radius: 5px;
	width: 240px;
	color: #fff;
    background-color: #28a745;
    border-color: #28a745;
}

.btn-r {
	display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.reg-form-button:hover {
	background-color: rgba(0, 100, 0, 0.82);
}

</style>