<template>
    <section>
        <v-row class="answer-input-block" :class="answerIndex < 1 ? 'first-answer' : ''">
            <v-col cols="1" class="index">
                <span>{{answerIndex + 1}})</span>
            </v-col>
            <v-col cols="8" class="input">
                <v-text-field
                        v-model="answerItem.text"
                        label="Введите название вопроса"
                        hide-details
                        outlined
                        single-line
                        clearable
                ></v-text-field>
            </v-col>
            <v-col cols="2" class="radio-button">
                <p v-if="answerIndex < 1">Верный</p>
                <v-radio v-if="answerType === 'SINGLE'"
                         name="answer"
                         :value="answerIndex"
                         :model="answerItem.isCorrect"
                         color="deep-orange"
                         @change="answerItem.isCorrect = !answerItem.isCorrect"
                ></v-radio>
                <v-checkbox v-if="answerType === 'MULTI'"
                            v-model="answerItem.isCorrect"
                            color="deep-orange"
                ></v-checkbox>
            </v-col>
            <v-col cols="1" class="icon" @click="$emit('removeAnswer', answerIndex)">
                <v-icon>mdi-close</v-icon>
            </v-col>
        </v-row>
    </section>
</template>

<script>
    export default {
        name: "AnswerItem",
        props: ['answerIndex', 'answerType', 'answerItem'],
        watch: {
            answerItem: {
                handler(val) {
                    val.index = this.answerIndex;
                    this.$emit('answerChanged', val);
                },
                deep: true,
                immediate: false
            }
        }
    }
</script>

<style scoped>
    .answer-input-block {
        display: flex;
        align-items: center;
    }

    .radio-button {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .first-answer {
        height: 120px;
    }

    .first-answer > .index,
    .first-answer > .input,
    .first-answer > .icon {
        padding-top: 40px;
    }

    .first-answer > .radio-button {
        padding-top: 0;
    }
</style>
