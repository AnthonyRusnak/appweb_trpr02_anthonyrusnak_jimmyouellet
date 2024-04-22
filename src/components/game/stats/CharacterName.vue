<script setup lang="ts">
const props = defineProps({
    characterName: String,
    characterTitle: String,
    color: String
})
</script>

<template>
    <div class="row align-items-start pt-2">
        <div class="col">
            <div class="text-success outlined-dark display-6" >{{ characterName }}</div>
            <div class="text-title" >{{ characterTitle }}</div>
        </div>
    </div>
</template>

<style scoped>
.text-title {
    font-size: 1.5rem;
    color: v-bind(color);
}
</style>