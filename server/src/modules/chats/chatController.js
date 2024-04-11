const Chat = require('./chatModel');

const getChats = async (req, res) => {
    try {
        const chats = await Chat.find();
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createChat = async (req, res) => {
    const chat = new Chat({
        ...req.body
    });

    try {
        const newChat = await chat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        Object.assign(chat, req.body);
        await chat.save();
        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getChatsByUser = async (req, res) => {
    try {
        const chats = await Chat.find({ user: req.params.id });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createChatByUser = async (req, res) => {
    const chat = new Chat({
        ...req.body,
        user: req.params.id
    });

    try {
        const newChat = await chat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        await chat.remove();
        res.json({ message: 'Chat deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getChats,
    createChat,
    getChat,
    updateChat,
    getChatsByUser,
    createChatByUser,
    deleteChat
};
