<template>
    <div class="flex h-screen">
        <!-- 左侧导航栏 -->
        <div class="w-80 bg-gray-100 border-r p-4 flex flex-col">
            <div class="mb-6">
                <h2 class="text-xl font-bold mb-4">Chats</h2>
                <div class="space-y-2">
                    <div v-for="channel in channels" :key="channel.id" class="p-2 hover:bg-gray-200 rounded cursor-pointer" :class="{ 'bg-gray-200': activeChannel === channel.id }" @click="activeChannel = channel.id">
                        <div class="flex items-center">
                            <Avatar :image="channel.avatar" shape="circle" size="large" />
                            <div class="ml-3">
                                <div class="font-medium">{{ channel.name }}</div>
                                <div class="text-sm text-gray-500">@{{ channel.handle }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            <div class="mt-4 flex-1">
                <h3 class="font-semibold mb-3">Members</h3>
                <div class="space-y-2">
                    <div v-for="member in members" :key="member.id" class="flex items-center">
                        <Avatar :image="member.avatar" shape="circle" />
                        <span class="ml-2">{{ member.name }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 主聊天区域 -->
        <div class="flex-1 flex flex-col">
            <!-- 聊天头 -->
            <div class="p-4 border-b flex items-center">
                <Avatar :image="activeChannelData.avatar" shape="circle" size="large" />
                <div class="ml-3">
                    <div class="font-bold">{{ activeChannelData.name }}</div>
                    <div class="text-sm text-gray-500">{{ activeChannelData.members }} members</div>
                </div>
            </div>

            <!-- 消息区域 -->
            <div class="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div v-for="message in filteredMessages" :key="message.id" class="mb-4 flex" :class="{ 'justify-end': message.isUser }">
                    <div class="max-w-[70%]">
                        <div class="flex items-end gap-2" :class="{ 'flex-row-reverse': message.isUser }">
                            <Avatar v-if="!message.isUser" :image="message.avatar" shape="circle" />
                            <div :class="['p-3 rounded-lg', message.isUser ? 'bg-primary-500 text-white' : 'bg-white border']">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="font-medium">{{ message.sender }}</span>
                                    <span class="text-xs text-gray-500">{{ formatTime(message.time) }}</span>
                                </div>
                                <div class="message-content">
                                    {{ message.content }}
                                </div>
                                <div v-if="message.attachments" class="mt-2">
                                    <div v-for="(file, index) in message.attachments" :key="index" class="p-2 bg-gray-100 rounded flex items-center">
                                        <i class="pi pi-file mr-2"></i>
                                        <span>{{ file.name }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 输入区域 -->
            <div class="p-4 border-t bg-white">
                <div class="flex items-center gap-2">
                    <Button icon="pi pi-paperclip" text rounded />
                    <InputText v-model="newMessage" placeholder="Write your message..." class="flex-1" @keyup.enter="sendMessage" />
                    <Button icon="pi pi-send" @click="sendMessage" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import { computed, ref } from 'vue';

const activeChannel = ref(1);

const channels = ref([
    {
        id: 1,
        name: 'PrimeTek Team',
        handle: 'primetek',
        avatar: '/team-avatar.png',
        members: 12
    }
    // 其他频道数据...
]);

const members = ref([
    { id: 1, name: 'Esther Howard', avatar: '/user1.png' },
    { id: 2, name: 'Jerome Bell', avatar: '/user2.png' }
    // 其他成员数据...
]);

const messages = ref([
    {
        id: 1,
        sender: 'Cody Fisher',
        time: '2024-03-11T12:30:00',
        content: "Hey there! I've heard about the accessibility features...",
        avatar: '/user3.png',
        attachments: null
    },
    {
        id: 2,
        sender: 'PrimeTek Team',
        time: '2024-03-11T11:15:00',
        content: "Let's implement PrimeVue...",
        avatar: '/team-avatar.png',
        isUser: true
    }
    // 其他消息数据...
]);

const newMessage = ref('');

const activeChannelData = computed(() => channels.value.find((c) => c.id === activeChannel.value));

const filteredMessages = computed(() => messages.value.filter((m) => m.channelId === activeChannel.value));

const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const sendMessage = () => {
    if (!newMessage.value.trim()) return;

    messages.value.push({
        id: messages.value.length + 1,
        sender: 'You',
        time: new Date().toISOString(),
        content: newMessage.value,
        isUser: true
    });

    newMessage.value = '';
};
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
