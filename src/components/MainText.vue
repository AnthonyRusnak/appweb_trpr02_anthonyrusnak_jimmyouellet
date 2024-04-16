<script setup lang="ts">
    const props = defineProps({
        text: String,
    })
</script>
<template>
    <div>
        <h2 class="p-2 display-1 outlined text-center">{{ props.text }}</h2>
    </div>
</template>
<style scoped>
    h2{
        font-weight: 900;
    }
</style>