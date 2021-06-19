<template>
  <div id="app">
    <v-app>
      <Header></Header>
      <div class="app-body">
        <QuestionnaireWrapper></QuestionnaireWrapper>
      </div>
    </v-app>
  </div>
</template>

<script>
import Header from "@/components/Header";
import QuestionnaireWrapper from "@/components/questionnaire/QuestionnaireWrapper";

export default {
  name: 'App',
  components: {
    QuestionnaireWrapper,
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .app-body {
    display: flex;
    margin-top: 100px;
    justify-content: center;
  }
</style>
