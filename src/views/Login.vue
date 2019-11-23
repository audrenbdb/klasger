<template>
    <div class="login">
        <h3>Se connecter</h3>
        <form 
            id="create-account"
            @submit.prevent="login"
        >
        <input v-model="email" type="email" placeholder="Email" id="email" required><br>
        <input v-model="password" type="password" placeholder="Password" minlength=6 required><br>
        <button type="submit">Connexion</button>
        </form>
        <p v-if="error" class="error">{{error}}</p>
        <p>Pas de compte ? <router-link to="/sign-up">Créer un compte</router-link></p>
        <p class="home"><router-link to="/home">Accueil</router-link></p>
    </div>
</template>
<script>
import firebase from 'firebase';
export default {
    name: "login",
    data() {
        return {
            email: '',
            password: '',
            error: false,
        }
    },
    methods: {
        login: function() {
            this.error = false;
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
            () => {
                this.$router.replace('home');
            }, 
            error => {
                this.error = error;
            })
        }
    }
}
</script>

<style scoped>
    .login {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 24px;
        width: 100%;
        max-width: 370px;
        box-sizing: border-box;
    }
    h3 {
        margin: 25px 0px;
    }

    input {
        margin: 10px 0;
        padding: 15px;
        width: 70%;
    }

    button {
        padding: 10px;
        cursor: pointer;
        margin-top: 20px;
        width: 50%;
        border: none;
        color: white;
        background-color: rgb(89, 110, 95);
        display: inline-block;
        text-decoration: none;
        font-size: 14px;
    }
    p {
        margin-top: 40px;
        font-size: 13px;
    }
    .error {
        color: red;
    }
    .home a {
        text-decoration: none;
        color: inherit;
    }
</style>