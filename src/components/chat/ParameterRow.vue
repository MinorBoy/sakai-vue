<template>
    <div class="field col-12 flex align-items-center justify-content-between mt-3">
        <ToggleSwitch class="mt-2" v-model="localValue.enabled" />
        <label class="w-24 ml-2 mt-3">{{ label }}</label>
        <Slider v-model="localValue.value" :min="min" :max="max" :step="step" class="w-32 ml-2 mt-5 mr-4" :disabled="!localValue.enabled" />
        <InputNumber v-model="localValue.value" mode="decimal" :showButtons="localValue.enabled" :min="min" :max="max" :step="step" :inputStyle="{ width: '100%' }" class="w-20" :disabled="!localValue.enabled" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    label: String,
    value: Object,
    min: Number,
    max: Number,
    step: Number
});

const emit = defineEmits(['update:value']);

const localValue = ref(props.value);

watch(
    localValue,
    (newValue) => {
        emit('update:value', newValue);
    },
    { deep: true }
);
</script>
