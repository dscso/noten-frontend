<template>
    <div class="login-container">
        <form class="pure-form" id="login-wrapper">
            <div id="frame">
                <img src="http://plg-berlin.de/images/LOGOBT.png" width="180px" style="margin-top: 35px;" draggable="false">
                <div class="ti" id="username">
                    <i class="fas fa-user"></i>
                    <input type="text" placeholder="Benutzername">
                </div>
                <div class="ti" id="password">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Passwort">
                </div>
                <button id="lbtn" class="pure-button" @click="login()">Login <i class="fas fa-sign-in-alt"></i></button>
            </div>
        </form>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    </div>
</template>

<script>
import store from '../store'
import login from '../services/login'

export default {
    name: 'login',
    store: store,
    data: function () {
        return {}
    },
    methods: {
        login: function () {

            this.$store.commit("toggle_login")
        }
    }
}
</script>

<style scoped>
.fa-lock, .fa-user {
    color: white;
}
.login-container {
    position: absolute;
    background: #28356c;
    height: 100%;
    width: 100%;
}

#login-wrapper {
    position: absolute;
    top: 25%;
    min-width: 100% !important;
    text-align: center;
    align-content: center;
    align-items: center;
    align-self: center;
}

#frame {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    width: 290;
    border-style: solid;
    border-color: #ffffff;
    border-width: 2px;
}

#username {
    margin-top: 35px;
}

#password {
    margin-bottom: 10px;
}

#lbtn {
	background: transparent;
	margin-bottom: 25px;
	border-style: solid;
	border-color: #fff;
	border-width: 2px;
	color: white;
}

.ti {
    padding: 6px;
}
</style>