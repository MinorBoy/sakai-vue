<template>
    <div class="flex" style="height: 82vh" overflow-hidden>
        <!-- 左侧导航栏 -->
        <!-- <div class="w-80 bg-gray-100 border-r p-4 flex flex-col">

            <Divider />
        </div> -->

        <!-- 主聊天区域 -->
        <div class="flex-1 flex flex-col">
            <iframe src="http://192.168.5.101/chatbot/pMcofhHXhWEZ6rJL" style="width: 100%; height: 100%; min-height: 700px" frameborder="0" allow="microphone"> </iframe>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
</script>

<style scoped>
.message-content {
    white-space: pre-wrap;
    word-break: break-word;
}

.p-avatar {
    flex-shrink: 0;
}
</style>
