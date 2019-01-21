<template>
	<div class="login-background">
		<form class="login-form" v-on:submit.prevent="login()">
			<h1 class="login-title">Bitte melden sie sich an:</h1>
			<message type="error" v-show="error" style="width:285px;">
				<center>Fehler bei der Anmeldung.</center>
			</message>
			<input type="text" v-model="mail" class="login-input" placeholder="E-Mail" autofocus>
			<input type="password" v-model="password" class="login-input" placeholder="Passwort">
			<input type="submit" value="Anmelden" class="login-button">
			<p class="forgot-password"><a @click="forgotLogin()">Passwort vergessen?</a></p>
		</form>
	</div>
</template>

<script>
import store from '../store'
//import login from '../services/login'
import message from './message'


export default {
	name: 'login',
	store: store,
	components: {message},
	data: function () {
		return {
			error: false,
			password: null,
			mail: null
		}
	},
	methods: {
		login: function () {
			this.error = true;
			/*login.check(this.mail, this.mail)
			.then(function (response) {
				console.log(response)
			})
			.catch(function (error) {
				console.log(error);
			})*/
			this.password = null;
			this.$store.commit("toggle_login")
		},
		forgotLogin: function () {
			alert("Pech gehabt")
		}
	}
}
</script>

<style>
.login-form {
	margin: 20px auto;
	width: 340px;
	padding: 30px 25px;
	background: white;
	border: 1px solid #c4c4c4;
	border-radius: 20px;
	overflow:hidden;
}

h1.login-title {
	margin: -30px -25px 25px;
	padding: 15px 25px;
	line-height: 30px;
	font-size: 25px;
	font-weight: 300;
	color: grey;
	text-align:center;
	background: #f7f7f7; 
}

.login-input {
	width: 285px;
	height: 50px;
	margin-bottom: 25px;
	padding-left:10px;
	font-size: 15px;
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 4px;
}
.login-input:focus {
	border-color: #888;
	outline: none;
}
.login-button {
	width: 285px;
	height: 50px;
	padding: 0;
	font-size: 20px;
	color: #fff;
	text-align: center;
	background: #f25e41;
	border: 0;
	border-radius: 5px;
	cursor: pointer; 
	outline:0;
}

.forgot-password {
	text-align:center;
	margin-bottom:0px;
}
.forgot-password a {
	color:#666;
	text-decoration:none;
	font-size:13px;
	cursor: pointer;
}
</style>