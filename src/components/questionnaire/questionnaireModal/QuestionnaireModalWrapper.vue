<template>
    <v-dialog
            v-model="isModalOpen"
            hide-overlay
            transition="dialog-bottom-transition"
            max-width="700px"
            @click:outside="$emit('close')"
    >
        <v-card width="700"
                elevation="2"
                outlined
                tile
        >
            <template>
                <div class="modal-header">
                    <v-icon @click="$emit('close')">mdi-close</v-icon>
                </div>
                <v-form ref="form"
                        class="questionnaire-form"
                >
                    <div class="divider"></div>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="2">
                                <v-subheader>ВОПРОС:</v-subheader>
                            </v-col>
                            <v-col cols="10">
                                <v-text-field
                                        v-model="question.question"
                                        label="Введите название вопроса"
                                        outlined
                                        single-line
                                        clearable
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <div class="divider"></div>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="2">
                                <v-subheader>ТИП ОТВЕТА:</v-subheader>
                            </v-col>
                            <v-col cols="10">
                                <v-select
                                        v-model="question.answerType"
                                        :items="answerTypes"
                                        item-text="name"
                                        :value="answerTypes.value"
                                        outlined
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12">
                                <v-subheader>ОТВЕТЫ:</v-subheader>
                            </v-col>
                        </v-row>
                        <v-radio-group>
                            <v-row v-for="(answer, index) in question.answers" v-bind:key="index"
                                   class="answer-wrapper">
                                <v-col cols="12">
                                    <AnswerItem v-bind:answer-index="index"
                                                v-bind:answer-type="question.answerType"
                                                v-bind:answer-item="question.answers[index]"
                                                @answerChanged="checkAndAddAnswer($event, index)"
                                                @removeAnswer="removeAnswer($event)">
                                    </AnswerItem>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="add-section">
                                    <v-btn
                                            class="mx-2"
                                            fab
                                            dark
                                            color="deep-orange"
                                            @click="addAnswer()"
                                    >
                                        <v-icon dark>
                                            mdi-plus
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-radio-group>
                        <v-row>
                            <v-col cols="12" class="add-section">
                                <v-btn
                                        class="mx-3"
                                        :dark="!isQuestionReady"
                                        :disabled="isQuestionReady"
                                        color="deep-orange"
                                        @click="save()"
                                >
                                    ГОТОВО
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </template>
        </v-card>
    </v-dialog>
</template>

<script>

    import AnswerItem from "@/components/questionnaire/questionnaireModal/AnswerItem";

    export default {
        name: "QuestionnaireModalWrapper",
        components: {AnswerItem},
        props: ['isOpen', 'question'],
        data() {
            return {
                answerTypes: [{name: "Один верный", value: "SINGLE"}, {name: "Множественный выбор", value: "MULTI"}],
                SharePoint: {}
            }
        },
        computed: {
            isModalOpen: {
                get() {
                    return this.isOpen
                },
                set(newVal) {
                    return newVal
                }
            },
            isQuestionReady() {
                return !this.question.question || !this.question.answerType || !this.question.answers.length
            }
        },
        methods: {
            addAnswer() {
                this.question.answers.push({
                    isCorrect: false,
                    text: '',
                    index: this.question.answers.length
                })
            },
            checkAndAddAnswer(answerItem) {
                if (this.question.answers.length > 0) {
                    const el = this.question.answers.filter(function (eachItem) {
                        return answerItem.index === eachItem.index;
                    });

                    if (!el.length) {
                        this.question.answers.push(answerItem)
                    }
                } else {
                    return this.SharePoint.answers.push(answerItem)
                }
            },
            removeAnswer(index) {
                this.question.answers.splice(this.question.answers.findIndex(item => item.index === index), 1);
            },
            save() {
                this.SharePoint = this.question;
                this.$emit('close');
                this.$emit('save', this.SharePoint);
            }
        }
    }
</script>

<style scoped>
    .modal-header {
        display: flex;
        justify-content: flex-end;
        padding: 20px 20px 0 20px;
    }

    .questionnaire-form {
        padding: 10px 0;
    }

    .divider {
        height: 1px;
        border-bottom: 1px dotted #818181;
    }

    .answer-wrapper {
        display: flex;
        align-items: center;
    }

    .add-section {
        padding: 12px 60px;
    }
</style>
