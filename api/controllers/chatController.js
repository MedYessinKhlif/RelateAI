import Chat from "../models/Chat.js";
import { GoogleGenerativeAI } from "@google/generative-ai";


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

const verifyPromptRelevance = (prompt) => {
  const keywords = [
    'problem', 'difficulty', 'challenge', 'issue', 'struggle', 'hardship',
    'suffering', 'bullying', 'abuse', 'pain', 'tough', 'misery', 'adversity',
    'obstacle', 'trauma', 'setback', 'failure', 'loss', 'stress', 'hurt',
    'oppression', 'grief', 'torment', 'persecution', 'conflict', 'worry',
    'sorrow', 'discomfort', 'distress', 'unfair', 'frustration', 'disappointment',
    'misfortune', 'anguish', 'sadness', 'hopelessness', 'despair', 'exploitation'
  ];
  const promptLower = prompt.toLowerCase();
  return keywords.some((keyword) => promptLower.includes(keyword));
};

export const createChat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    if (!verifyPromptRelevance(prompt)) {
      return res.status(400).json({
        message: "Please provide a life story or problem",
      });
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const titleResult = await chatSession.sendMessage(
      `Generate a short and creative title (1 to 5 words) for the following text: "${prompt}". Only provide the title, no explanation.`
    );

    const successStoryPrompt = `Provide a success story of a celebrity who had the same problem or pain as described in the following text: "${prompt}". Explain how they overcame it.`;
    const successStoryResult = await chatSession.sendMessage(successStoryPrompt);

    const chat = new Chat({
      userId: req.userId,
      title: titleResult.response.text().trim(),
      prompt,
      response: result.response.text(),
      successStory: successStoryResult.response.text(),  // Add the success story to the chat data
    });

    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Error creating chat", error: error.message });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.userId });
    res.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Error fetching chats", error: error.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat || chat.userId.toString() !== req.userId) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.json(chat);
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ message: "Error fetching chat", error: error.message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat || chat.userId.toString() !== req.userId) {
      return res.status(404).json({ message: "Chat not found" });
    }

    await Chat.findByIdAndDelete(req.params.id);
    res.json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ message: "Error deleting chat", error: error.message });
  }
};