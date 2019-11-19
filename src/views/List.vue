<template>
  <div class="list-wrapper">
      <Loader v-if="!loaded" />
      <div class="list" v-if="loaded">
      <h3>Liste complète des verbes</h3>
      <div class="pair-wrap" v-for="(verbe, i) in verbes" v-bind:key="verbe">
          <div class="verb">{{verbe}}</div>
          <div class="verb">{{i}}</div>         
      </div>
      </div>
      <p v-if="loaded"><router-link to="/insert">Ajouter</router-link><router-link to="/home">Question</router-link></p>
  </div>
</template>
<script>
import firebase from "firebase";
import Loader from "@/components/Loader.vue";
export default {
  name: "list",
  components: {
      Loader
  },
  data() {
    return {
      verbes: {},
      loaded: false,
    };
  },
  methods: {},
  created() {
    firebase
      .firestore()
      .collection("verbesList")
      .get()
      .then(snapshot => {
        const docs = snapshot.docs;
        let verbes = [];
        docs.map(doc => {
          verbes.push(doc.data());
        });
        this.verbes = verbes[0].pairs;
        this.loaded = true;
      });
  }
};
</script>

<style scoped>

.list {
  background: #fff;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
}
h3 {
    margin-bottom: 30px;
}
.pair-wrap {
    display: flex;
    text-align: left;
    padding-left: 20px;
    margin: 12px 0px;
}
.verb {
    flex: 1 1 0px;
}
p a {
    color: #2c3e50;
    margin: 0 10px;
}
</style>