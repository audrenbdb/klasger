<template>
  <div class="home">
    <Loader v-if="step===0" />
    <Question
      v-if="step===1"
      :bzh="questionData.bzh"
      :contexts="questionData.contexts"
      :proximity="questionData.proximity"
      v-on:check-answer="checkAnswer($event)"
    />
    <Result
      v-if="step===2"
      :answer="questionData.fr"
      :success="successAnswer"
      v-on:answer-seen="answerSeen()"
    />
  </div>
</template>

<script>
import firebase from "firebase";
// @ is an alias to /src
import Question from "@/components/Question.vue";
import Loader from "@/components/Loader.vue";
import Result from "@/components/Result.vue";

export default {
  name: "home",
  components: {
    Question,
    Loader,
    Result
  },
  data() {
    return {
      verbes: false,
      verbesID: false,
      questionData: false,
      nextQuestionData: false,
      questionAnswer: "",
      successAnswer: false,
      step: 0,
      currentIndex: -1
    };
  },
  methods: {
    answerSeen: function() {
      if (this.nextQuestionData.bzh === this.questionData.bzh) {
        this.step = 0;
      } else {
        this.questionData = this.nextQuestionData;
        this.step = 1;
      }
    },
    checkAnswer: function(answer) {
      this.successAnswer =
        sanitizeWord(answer) === sanitizeWord(this.questionData.fr);
      if (!this.successAnswer) {
        insertAt(this.verbesID, this.currentIndex, 3);
      }
      this.step = 2;
      this.fetchQuestion();
    },
    fetchQuestion: function() {
      ++this.currentIndex;
      firebase
        .firestore()
        .collection("verbes")
        .doc(this.verbesID[this.currentIndex % this.verbesID.length])
        .get()
        .then(doc => {
          if (doc.exists) {
            this.nextQuestionData = doc.data();
            if (this.step === 0) {
              this.questionData = doc.data();
              this.step = 1;
            }
          } else {
            console.log("doc?");
          }
        });
    }
  },
  created: function() {
    firebase
      .firestore()
      .collection("verbesID")
      .get()
      .then(snapshot => {
        const docs = snapshot.docs;
        let verbesID = [];
        docs.map(doc => {
          verbesID.push(doc.data());
        });
        this.verbesID = [...verbesID[0].ID];
        shuffle(this.verbesID);
        this.fetchQuestion();
      });
  }
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function sanitizeWord(word) {
  return word
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
}

function insertAt(array, index, min) {
  array.splice(
    (index + min) % array.length,
    0,
    array[index]
  );
}
</script>

<style scoped>
button {
  position: fixed;
  left: 10px;
  top: 10px;
  padding: 10px;
  cursor: pointer;
  border: none;
  background-color: #fff;
  display: inline-block;
  text-decoration: none;
  font-size: 14px;
}
</style>
