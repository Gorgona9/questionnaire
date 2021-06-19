<template>
    <v-card class="overflow-hidden">
        <v-app-bar
                absolute
                color="#ac2319"
                dark
        >
            <template v-slot:extension>
                <v-tabs fixed-tabs>
                    <v-tab disabled>НОВОСТИ</v-tab>
                    <v-tab>ОПРОСЫ</v-tab>
                    <v-tab disabled>МАТЕРИАЛЫ</v-tab>
                    <v-tab disabled>СЦЕНАРИЙ</v-tab>
                    <v-tab disabled>НАЗНАЧЕНИЕ</v-tab>
                </v-tabs>
            </template>
        </v-app-bar>
        <v-sheet
                id="scrolling-techniques-3"
                class="overflow-y-auto"
                max-height="112"
        >
            <v-container style="height: 200px;"></v-container>
        </v-sheet>
    </v-card>
</template>
