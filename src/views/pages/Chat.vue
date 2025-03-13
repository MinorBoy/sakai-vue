<template>
    <div class="flex h-[82vh] overflow-hidden">
        <!-- 左侧导航栏 - 会话列表 -->
        <div class="w-80 bg-white border-r flex flex-col">
            <!-- 标题栏 -->
            <div class="p-4">
                <h2 class="text-lg font-semibold text-gray-900">Chats</h2>
            </div>

            <!-- 可滚动的会话列表 -->
            <div class="flex-1 overflow-y-auto">
                <div class="space-y-1 p-2">
                    <div
                        v-for="chat in chats"
                        :key="chat.id"
                        @click="activeChat = chat.id"
                        class="group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                        :class="{
                            'bg-primary-100': activeChat === chat.id,
                            'hover:bg-gray-100': activeChat !== chat.id
                        }"
                    >
                        <Avatar :image="chat.avatar" shape="circle" size="large" class="shrink-0" />
                        <div class="min-w-0">
                            <p class="text-sm font-medium text-gray-900 truncate">
                                {{ chat.name }}
                            </p>
                            <p class="text-xs text-gray-500 truncate">{{ chat.members }} members</p>
                        </div>
                        <!-- 未读消息标记 -->
                        <span v-if="chat.unread" class="ml-auto bg-primary-500 text-white rounded-full px-2 py-1 text-xs">
                            {{ chat.unread }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 主聊天区域 -->
        <div class="flex-1 flex flex-col">
            <!-- 聊天头 -->
            <div class="p-4 border-b flex items-center justify-between">
                <div class="flex items-center">
                    <Avatar :image="activeChatData.avatar" shape="circle" size="large" />
                    <div class="ml-3">
                        <div class="font-bold">{{ activeChatData.name }}</div>
                        <div class="text-sm text-gray-500">{{ activeChatData.members }} members</div>
                    </div>
                </div>
                <Button icon="pi pi-cog" @click="visibleRight = true" />
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
                                    <div v-for="(file, index) in message.attachments" :key="index" class="p-2 bg-gray-100 rounded flex items-center mt-1">
                                        <i :class="getFileIcon(file.name)" class="mr-2"></i>
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
                    <!-- <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" :maxFileSize="1000000" @upload="onUpload" :auto="true" chooseLabel="Browse" /> -->
                    <Button icon="pi pi-paperclip" text rounded />
                    <InputText v-model="newMessage" placeholder="Write your message..." class="flex-1" @keyup.enter="sendMessage" />
                    <Button icon="pi pi-send" @click="sendMessage" />
                </div>
            </div>
        </div>

        <!-- 设置面板 -->
        <Drawer v-model:visible="visibleRight" position="right" :header="'Settings'" :modal="true" class="!w-full md:!w-80 lg:!w-[30rem]">
            <div class="p-fluid formgrid grid">
                <label for="model" class="font-semibold">模型</label>
                <Select id="model" v-model="settings.model.value" :options="models" optionLabel="name" placeholder="Select a model" class="ml-left mt-2" />

                <Divider />

                <label for="model" class="font-semibold">参数</label>
                <ParameterRow label="温度" v-model:value="settings.temperature" :min="0" :max="1" :step="0.1" />
                <ParameterRow label="Top P" v-model:value="settings.top_p" :min="0" :max="1" :step="0.1" />
                <ParameterRow label="频率惩罚" v-model:value="settings.frequency_penalty" :min="-2" :max="2" :step="0.1" />
                <ParameterRow label="存在惩罚" v-model:value="settings.presence_penalty" :min="-2" :max="2" :step="0.1" />
                <ParameterRow label="最大标记" v-model:value="settings.max_completion_tokens" :min="1" :max="4096" :step="1" />
            </div>
        </Drawer>
    </div>
</template>

<script setup>
import ParameterRow from '@/components/chat/ParameterRow.vue';
import { computed, ref } from 'vue';

const activeChat = ref(1);

const visibleRight = ref(false);

const settings = ref({
    model: { enabled: false, value: null },
    temperature: { enabled: false, value: 0.7 },
    top_p: { enabled: false, value: 1 },
    frequency_penalty: { enabled: false, value: 0 },
    presence_penalty: { enabled: false, value: 0 },
    max_completion_tokens: { enabled: false, value: 100 }
});

const models = ref([
    { name: 'GPT-3', value: 'gpt3' },
    { name: 'GPT-4', value: 'gpt4' }
]);

const chats = ref([
    {
        id: 1,
        name: 'PrimeTek Team',
        handle: 'primetek',
        avatar: '/team-avatar.png',
        members: 12
    }
    // 其他频道数据...
]);

const messages = ref([
    {
        id: 1,
        chatId: 1,
        sender: 'Cody Fisher',
        time: '2024-03-11T12:30:00',
        content: "Hey there! I've heard about the accessibility features...",
        avatar: '/user3.png',
        attachments: [{ name: 'logo.png' }, { name: 'guide.pdf' }, { name: 'requirements.doc' }, { name: 'mockup.xlsx' }]
    },
    {
        id: 2,
        chatId: 2,
        sender: 'PrimeTek Team',
        time: '2024-03-11T11:15:00',
        content: "Let's implement PrimeVue...",
        avatar: '/team-avatar.png',
        isUser: true,
        attachments: null
    }
]);

const newMessage = ref('');

const activeChatData = computed(() => chats.value.find((c) => c.id === activeChat.value));

const filteredMessages = computed(() => messages.value.filter((m) => m.chatId === activeChat.value));

const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const sendMessage = () => {
    if (!newMessage.value.trim()) return;

    messages.value.push({
        id: messages.value.length + 1,
        chatId: activeChat.value,
        sender: 'You',
        time: new Date().toISOString(),
        content: newMessage.value,
        isUser: true,
        avatar: ''
    });

    newMessage.value = '';
};

const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
        case 'pdf':
            return 'pi pi-file-pdf';
        case 'doc':
        case 'docx':
            return 'pi pi-file-word';
        case 'xls':
        case 'xlsx':
            return 'pi pi-file-excel';
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
            return 'pi pi-image';
        case 'apk':
            return 'pi pi-android';
        case 'ipa':
            return 'pi pi-apple';
        default:
            return 'pi pi-file';
    }
};

const onUpload = () => {};
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
