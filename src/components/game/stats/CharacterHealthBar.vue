<script setup lang="ts">
import { computed, defineProps, watch, type Ref } from 'vue';

const props = defineProps({
    characterCurrentHealth: Number,
    characterMaxHealth: Number,
    color: String
})

const characterHealthPercentage: Ref<number> = computed(() => ((props.characterCurrentHealth??0) / props.characterMaxHealth!) * 100)
const characterHealthPercentageFirstDeg: Ref<number> = computed(() => Math.min((characterHealthPercentage.value??0) * 3.6, 180))
const characterHealthPercentageLastDeg: Ref<number> = computed(() => Math.max((characterHealthPercentage.value??0) * 3.6 - 180, 0))

</script>

<template>
    <div class="progress blue">
        <span class="progress-left">
            <span class="progress-bar"></span>
        </span>
        <span class="progress-right">
            <span class="progress-bar"></span>
        </span>
        <div class="progress-value">{{ characterCurrentHealth }} PV</div>
    </div>
</template>

<style scoped>
.progress {
  width: 150px;
  height: 150px !important;
  float: left; 
  line-height: 150px;
  background: none;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  position: relative;
}
.progress:after {
  content: "";
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 12px solid var(--bs-secondary);
  position: absolute;
  top: 0;
  left: 0;
}
.progress>span {
  width: 50%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  z-index: 1;
}
.progress .progress-left {
  left: 0;
}
.progress .progress-bar {
  width: 100%;
  height: 100%;
  background: none;
  border-width: 16px;
  border-style: solid;
  position: absolute;
  top: 0;
}
.progress .progress-left .progress-bar {
  left: 100%;
  border-top-right-radius: 80px;
  border-bottom-right-radius: 80px;
  border-left: 0;
  -webkit-transform-origin: center left;
  transform-origin: center left;
}
.progress .progress-right {
  right: 0;
}
.progress .progress-right .progress-bar {
  left: -100%;
  border-top-left-radius: 80px;
  border-bottom-left-radius: 80px;
  border-right: 0;
  -webkit-transform-origin: center right;
  transform-origin: center right;
  animation: loading-first-half 1s linear forwards;
}
.progress .progress-value {
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: var(--bs-dark);
  font-size: 1.6rem;
  color: v-bind(color);
  line-height: 135px;
  text-align: center;
  position: absolute;
  top: 5%;
  left: 5%;
}
.progress.blue .progress-bar {
  border-color: v-bind(color);
}

.progress .progress-left .progress-bar {
  animation: loading-last-half 1s linear forwards 1s;
}

@keyframes loading-first-half {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(v-bind(characterHealthPercentageFirstDeg + 'deg'));
    transform: rotate(v-bind(characterHealthPercentageFirstDeg + 'deg'));
  }
}

@keyframes loading-last-half {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(v-bind(characterHealthPercentageLastDeg + 'deg'));
    transform: rotate(v-bind(characterHealthPercentageLastDeg + 'deg'));
  }
}
</style>