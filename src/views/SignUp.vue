<template>
    <div class="sign-up">
        <h3>Création d'un compte</h3>
        <form 
            id="create-account"
            @submit.prevent="signUp"
        >
            <input v-model="email" type="email" placeholder="Email" id="email" required><br>
            <input v-model="password" type="password" placeholder="Password" minlength=6 required><br>
            <button type="submit">Créer</button>
        </form>
        <p v-if="error" class="error">{{error}}</p>
        <p>Retourner à l'écran de <router-link to="/login">connexion</router-link></p>
        <p class="home"><router-link to="/home">Accueil</router-link></p>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'signUp',
    data() {
        return {
            email: '',
            password: '',
            error: false,
        }
    },
    methods: {
        signUp: function() {
            this.error = false;
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
            () => {
                this.$router.replace('home');
            }, 
            () => {
                this.error = "Impossible de créer un compte";
            })
        }
    }
}
</script>

<style scoped>
      .sign-up {
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