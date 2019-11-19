<template>
  <div class="insert-wrapper">
    <div class="insert">
      <div v-if="inserting" class="mask"></div>
      <h3>Verbe</h3>
      <form id="insert-verb" @submit.prevent="insert">
        <input
          v-model="bzh"
          type="text"
          placeholder="Verbe en breton"
          minlength="2"
          id="bzh"
          required
        />
        <br />
        <input
          v-model="fr"
          type="texte"
          placeholder="Traduction en français"
          id="fr"
          minlength="2"
          required
        />
        <br />
        <div class="contexts-input">
          <h3>Phrase(s) en contexte</h3>
          <span class="input-wrapper" v-for="(context, i) of contexts" v-bind:key="i">
            <input
              v-model="context.phrase"
              placeholder="Phrase en breton incluant le verbe"
              required
              minlength="6"
            />
            <div
              class="input-icon delete-input-icon"
              @click="removeContext(context)"
              v-if="contexts.length > 1"
            ></div>
            <div class="input-icon add-input-icon" @click="addContext()"></div>
          </span>
        </div>
        <button type="submit">Insérer</button>
      </form>
      <p v-if="message">{{message}}</p>
      <p v-if="errorMessage" class="error">{{errorMessage}}</p>
    </div>
    <p>
      <router-link to="/list">Liste</router-link>
      <router-link to="/home">Question</router-link>
    </p>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "insert",
  data() {
    return {
      inserting: false,
      bzh: "",
      fr: "",
      contexts: [
        {
          phrase: ""
        }
      ],
      message: "",
      errorMessage: ""
    };
  },
  methods: {
    insert() {
      this.loadInsert();
      let doc = {
        bzh: sanitizeWord(this.bzh),
        fr: sanitizeWord(this.fr),
        contexts: []
      };
      this.contexts.map(context => {
        doc.contexts.push(context.phrase);
      });

      let verbes = firebase.firestore().collection("verbes");
      let query = verbes.where("bzh", "==", doc.bzh);
      query
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size !== 0) throw new Error("verbe déjà existant");
        })
        .then(() => {
          return firebase
            .firestore()
            .collection("verbes")
            .add(doc);
        })
        .then(docRef => {
          let ref = firebase
            .firestore()
            .collection("verbesID")
            .doc("0");
          return ref.update({
            ID: firebase.firestore.FieldValue.arrayUnion(docRef.id)
          });
        })
        .then(() => {
          let ref = firebase
            .firestore()
            .collection("verbesList")
            .doc("0");
          let pair = {};
          pair[`pairs.${doc.bzh}`] = doc.fr;
          return ref.update(pair);
        })
        .then(() => {
          this.resetForm();
          this.message = "Verbe bien ajouté, merci";
          this.inserting = false;
        })
        .catch(err => {
          this.resetForm();
          this.errorMessage = err.message;
          this.inserting = false;
        });
    },

    addContext() {
      this.contexts.push({ phrase: "" });
    },
    removeContext(context) {
      this.contexts.splice(this.contexts.indexOf(context), 1);
    },
    resetForm() {
      this.bzh = "";
      this.fr = "";
      this.contexts = [{ phrase: "" }];
    },
    loadInsert() {
      this.message = "";
      this.errorMessage = "";
      this.inserting = true;
    }
  }
};
function sanitizeWord(word) {
  return word
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
}
</script>

<style scoped>
.insert {
  background: #fff;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  z-index: 1;
  cursor: wait;
}
h3 {
  margin: 25px 0px;
}

input {
  margin: 10px 0;
  padding: 15px;
  width: 70%;
}

.input-wrapper {
  position: relative;
}

button {
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 50%;
  border: none;
  color: white;
  background-color: rgb(89, 110, 95);
  display: inline-block;
  text-decoration: none;
  font-size: 14px;
}

.input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: 34px;
  height: 34px;
  display: none;
  background: #fff;
}

.delete-input-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' fill='%23596e5f' /%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  right: 10px;
}

.add-input-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z' fill='%23596e5f' /%3E%3C/svg%3E");
  right: -40px;
}
.input-wrapper:last-child .add-input-icon {
  display: block;
}

input:hover ~ .delete-input-icon,
input:focus ~ .delete-input-icon,
.delete-input-icon:hover {
  display: block;
}

.error {
  color: red;
}

p a {
  color: #2c3e50;
  margin: 0px 10px;
}
</style>