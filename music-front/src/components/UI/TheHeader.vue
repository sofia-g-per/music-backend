<template>
    <header class="main-header">
        <search-bar></search-bar>

        <!-- v-if="auth" -->
        <profile-btn></profile-btn>
        <!-- v-else -->
        <button class="basic-btn">Войти</button>
        <button class="basic-btn">Зарегистрироватьсяч</button>
    </header>
</template>

<script>
import SearchBar from './SearchBar.vue'
import ProfileBtn from './ProfileBtn.vue'

export default {
    components: {
        SearchBar,
        ProfileBtn
    },
}
</script>

<style scoped>
    .main-header{
        display: flex;
        justify-content: space-between;
    }
</style>