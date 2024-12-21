import Chat from '../models/Chat.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Directly hardcoding the API key for testing purposes
const apiKey = "AIzaSyDm6me4oiQzO1ok_x6OTPtDoipb78jMSS8";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const createChat = async (req, res) => {
  try {
    const { title, prompt } = req.body;

    if (!title || !prompt) {
      return res.status(400).json({ message: 'Title and prompt are required' });
    }

    // Start a chat session with the Gemini API
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    const chat = new Chat({
      userId: req.userId, // Ensure req.userId is set by middleware
      title,
      prompt,
      response: result.response.text(),
    });

    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error('Error creating chat:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error creating chat', error: error.response ? error.response.data : error.message });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.userId });
    console.log('Fetched Chats:', chats);
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Error fetching chats', error });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat || chat.userId.toString() !== req.userId) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    res.json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ message: 'Error fetching chat', error });
  }
};