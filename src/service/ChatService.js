/*
 * @Descripttion:
 * @File:
 * @Author: 裁缝大大
 * @Date: 2025-03-13 23:27:26
 * @LastEditTime: 2025-03-14 00:04:49
 */
export const ChatService = {
    getChatsData() {
        return {
            chats: [
                {
                    id: 1,
                    name: 'PrimeTek Team',
                    handle: 'primetek',
                    avatar: '/team-avatar.png',
                    members: 12,
                    unread: 0
                },
                {
                    id: 2,
                    name: 'PrimeVue Team',
                    handle: 'primevue',
                    avatar: '/team-avatar.png',
                    members: 1200,
                    unread: 999
                }
            ],
            messages: [
                {
                    id: 1,
                    chatId: 1,
                    sender: 'Cody Fisher',
                    time: '2024-03-11T12:30:00',
                    content: "Hey there! I've heard about the accessibility features...",
                    avatar: '/user3.png',
                    attachments: [{ name: 'logo.png', size: 1024 * 1024 * 2 }, { name: 'guide.pdf', size: 1024 * 1024 * 5000 }, { name: 'requirements.doc' }, { name: 'mockup.xlsx' }]
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
            ]
        };
    },
    getChats() {
        return Promise.resolve(this.getChatsData());
    },
    //实现一个方法：模拟一个异步操作，模拟对方回复一条消息。
    sendMessage(message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: Math.random(),
                    chatId: message.chatId,
                    sender: 'PrimeTek Team',
                    time: new Date().toISOString(),
                    content: message.content + ' (replied)' + Math.random(),
                    avatar: '/team-avatar.png',
                    isUser: false
                });
                console.log('sendMessage', message);
                // this.getChatsData().messages.push(message);
            });
        });
    }
};
