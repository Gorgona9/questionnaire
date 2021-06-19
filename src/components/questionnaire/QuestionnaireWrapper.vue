<template>
    <v-container>
        <v-container fluid>
            <v-card elevation="2"
                    outlined
                    tile
            >
                <template>
                    <v-tabs color="#ac2319" height="76px" centered v-model="tab">
                        <v-tab disabled>Интерактивный опросник</v-tab>
                        <v-tab href="#questionnaire">Опрос</v-tab>
                        <v-tab disabled>Поиск по опросам</v-tab>
                    </v-tabs>
                </template>
            </v-card>
        </v-container>
        <v-container fluid>
            <v-card elevation="2"
                    outlined
                    tile>
                <v-tabs-items v-model="tab">
                    <v-tab-item value="questionnaire">
                        <v-card flat>
                            <v-row class="pa-4">
                                <v-col>
                                    <v-icon>mdi-arrow-left</v-icon>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-container fluid>
                                <v-row class="pt-14">
                                    <v-col cols="8">
                                        <v-row>
                                            <v-col cols="2">
                                                <v-subheader>НАЗВАНИЕ:</v-subheader>
                                            </v-col>
                                            <v-col cols="10">
                                                <v-text-field
                                                        v-model="name"
                                                        label="Введите название для опроса"
                                                        outlined
                                                        single-line
                                                        clearable
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="2">
                                                <v-subheader>КАТЕГОРИЯ ТЕСТА:</v-subheader>
                                            </v-col>
                                            <v-col cols="10">
                                                <v-select
                                                        disabled
                                                        outlined
                                                ></v-select>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="4" class="px-10">
                                        <v-btn
                                                class="mb-10 pa-7"
                                                dark
                                                block
                                                color="#ac2319"
                                                @click="save()"
                                        >
                                            Сохранить
                                        </v-btn>
                                        <v-btn
                                                class="mb-10 pa-7"
                                                dark
                                                block
                                                color="#cecece"
                                                @click="save()"
                                        >
                                            Сохранить черновик
                                        </v-btn>
                                    </v-col>
                                </v-row>

                            </v-container>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-container>

        <v-container fluid>
            <v-card elevation="2"
                    outlined
                    tile>
                <v-data-table v-model="selected"
                              :headers="headers"
                              :items="savedQuestions"
                              item-key="name"
                              show-select
                              class="elevation-1"
                              hide-default-footer
                >
                    <template slot="header.edit">
                        <v-btn dark
                               block
                               color="deep-orange"
                               @click="addQuestion()"
                        >
                            Добавить вопрос
                        </v-btn>
                    </template>
                    <template slot="header.delete">
                        <v-icon :disabled="!selected.length" @click="deleteSelectedQuestions()">mdi-close</v-icon>
                    </template>
                    <template v-slot:item.edit="{ item }">
                        <v-icon @click="editItem(item)">mdi-pencil</v-icon>
                    </template>
                    <template v-slot:item.delete="{ item }">
                        <v-icon @click="deleteItem(item)">mdi-close</v-icon>
                    </template>
                </v-data-table>
            </v-card>

            <QuestionnaireModalWrapper :is-open="isDialogOpen" :question="editedItem" @close="isDialogOpen = false"
                                       @save="updateQuestions($event)"></QuestionnaireModalWrapper>
        </v-container>
    </v-container>
</template>

<script>
    import QuestionnaireModalWrapper from "@/components/questionnaire/questionnaireModal/QuestionnaireModalWrapper";

    export default {
        name: "QuestionnaireWrapper",
        components: {QuestionnaireModalWrapper},
        data: () => ({
            tab: null,
            name: '',
            isDialogOpen: false,
            editedItem: {
                question: "",
                answerType: "Один верный",
                answers: [],
            },
            selected: [],
            savedQuestions: [{question: "aaaaaa", answerType: "MULTI", answers: [], edit: true, delete: true}],
            headers: [
                {
                    text: 'Вопрос',
                    align: 'start',
                    sortable: false,
                    value: 'question',
                    width: '80%'
                },
                {
                    align: 'end',
                    sortable: false,
                    value: 'edit',
                },
                {
                    align: 'start',
                    sortable: false,
                    value: 'delete',
                }
            ],
        }),
        methods: {
            save() {

            },
            addQuestion() {
                this.editedItem = {
                    question: "",
                    answerType: "Один верный",
                    answers: [],
                };
                this.isDialogOpen = true;
            },
            editItem(question) {
                this.editedItem = question;
                this.isDialogOpen = true;
            },
            deleteItem(question) {
                this.savedQuestions.splice(this.savedQuestions.indexOf(question), 1);
            },
            deleteSelectedQuestions() {
                for (let i = 0; i < this.selected.length; i++) {
                    this.savedQuestions.splice(this.savedQuestions.indexOf(this.selected), 1)
                }
            },
            updateQuestions(question) {
                if (this.savedQuestions.indexOf(question) < 0) {
                    this.savedQuestions.push(question)
                }
            }
        }
    }
</script>

<style scoped>

</style>
