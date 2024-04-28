<script setup lang="ts">
import { Modal } from 'bootstrap';
import { onMounted, watch,type Ref, ref } from 'vue';
import { EventType } from '../../scripts/enums';
import { type PopUpText } from '../../scripts/interfaces';

const props = defineProps({
  isShowing: Boolean,
  eventType: String,
  popUpText: Object as () => PopUpText
})
let popUpModal: Modal = {} as Modal
const modalRef = ref()

watch(() => props.isShowing, (value) => {
  if (value) {
    popUpModal.show()
  } else{
    popUpModal.hide()
  }
})

const emit = defineEmits<{
    (event: EventType, value: boolean): void
}>();

function emitEvent(eventType: EventType, value: boolean) {
    emit(eventType, value)
}

onMounted(() => {
  popUpModal = new Modal(modalRef.value)
})
</script>

<template>
  <div ref="modalRef" class="modal fade" data-bs-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="popUpModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border border-success border-5 bg-dark" style="--bs-bg-opacity: .90;">
            <div class="modal-header border-bottom border-success">
                <h5 class="modal-title text-success display-6 outlined-dark" id="popUpModalTitle">{{ popUpText?.title }}</h5>
            </div>
            <div class="modal-body text-light">
                {{ popUpText?.description}}
            </div>
            <div class="modal-footer d-flex justify-content-between border-top border-success">
              <button type="button" class="btn btn-dark btn-lg border border-success border-4" @click="emitEvent(eventType as EventType, false)">{{ popUpText?.buttonFalseText }}</button>
              <button type="button" class="btn btn-dark btn-lg border border-success border-4" @click="emitEvent(eventType as EventType, true)">{{ popUpText?.buttonTrueText}}</button>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
</style>