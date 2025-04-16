import { v4 as uuidv4 } from 'uuid';
import { QuizQuestion } from '@/data/quizQuestions';

export interface CustomQuiz {
  id: string;
  title: string;
  createdBy: string;
  createdAt: string;
  questions: QuizQuestion[];
}

export interface CustomQuizParticipant {
  id: string;
  name: string;
  score: number;
  time: number;
}

export interface CustomQuizSession {
  quiz: CustomQuiz;
  participants: CustomQuizParticipant[];
  active: boolean;
  hostId?: string; // Browser fingerprint or device ID of the host
}

// Save a custom quiz to localStorage
export const saveCustomQuiz = (quiz: CustomQuiz): void => {
  try {
    // Get existing quizzes
    const quizzes = getCustomQuizzes();
    
    // Add new quiz
    quizzes.push(quiz);
    
    // Save back to localStorage
    localStorage.setItem('customQuizzes', JSON.stringify(quizzes));
  } catch (error) {
    console.error('Failed to save custom quiz', error);
  }
};

// Get all custom quizzes
export const getCustomQuizzes = (): CustomQuiz[] => {
  try {
    const quizzesData = localStorage.getItem('customQuizzes');
    return quizzesData ? JSON.parse(quizzesData) : [];
  } catch (error) {
    console.error('Failed to get custom quizzes', error);
    return [];
  }
};

// Get a custom quiz by ID
export const getCustomQuizById = (id: string): CustomQuiz | null => {
  try {
    const quizzes = getCustomQuizzes();
    return quizzes.find(quiz => quiz.id === id) || null;
  } catch (error) {
    console.error('Failed to get custom quiz by ID', error);
    return null;
  }
};

// Create a new quiz session
export const createQuizSession = (quiz: CustomQuiz): string => {
  try {
    // Generate a session ID
    const sessionId = uuidv4().substring(0, 8).toUpperCase();
    
    // Create a new session
    const session: CustomQuizSession = {
      quiz,
      participants: [],
      active: true,
    };
    
    // Get existing sessions
    const sessions = getQuizSessions();
    
    // Add new session
    sessions[sessionId] = session;
    
    // Save back to localStorage
    localStorage.setItem('quizSessions', JSON.stringify(sessions));
    
    return sessionId;
  } catch (error) {
    console.error('Failed to create quiz session', error);
    return '';
  }
};

// Get all quiz sessions
export const getQuizSessions = (): Record<string, CustomQuizSession> => {
  try {
    const sessionsData = localStorage.getItem('quizSessions');
    return sessionsData ? JSON.parse(sessionsData) : {};
  } catch (error) {
    console.error('Failed to get quiz sessions', error);
    return {};
  }
};

// Get a quiz session by ID
export const getQuizSessionById = (id: string): CustomQuizSession | null => {
  try {
    const sessions = getQuizSessions();
    return sessions[id] || null;
  } catch (error) {
    console.error('Failed to get quiz session by ID', error);
    return null;
  }
};

// Add a participant to a quiz session
export const addParticipantToSession = (
  sessionId: string,
  name: string
): CustomQuizParticipant | null => {
  try {
    const sessions = getQuizSessions();
    const session = sessions[sessionId];
    
    if (!session) return null;
    
    // Create a new participant
    const participant: CustomQuizParticipant = {
      id: uuidv4(),
      name,
      score: 0,
      time: 0
    };
    
    // Add to session
    session.participants.push(participant);
    
    // Save back to localStorage
    localStorage.setItem('quizSessions', JSON.stringify(sessions));
    
    return participant;
  } catch (error) {
    console.error('Failed to add participant to session', error);
    return null;
  }
};

// Update a participant's score
export const updateParticipantScore = (
  sessionId: string,
  participantId: string,
  score: number,
  time: number
): boolean => {
  try {
    const sessions = getQuizSessions();
    const session = sessions[sessionId];
    
    if (!session) return false;
    
    // Find the participant
    const participant = session.participants.find(p => p.id === participantId);
    
    if (!participant) return false;
    
    // Update score and time
    participant.score = score;
    participant.time = time;
    
    // Save back to localStorage
    localStorage.setItem('quizSessions', JSON.stringify(sessions));
    
    return true;
  } catch (error) {
    console.error('Failed to update participant score', error);
    return false;
  }
};

// End a quiz session
export const endQuizSession = (sessionId: string): boolean => {
  try {
    const sessions = getQuizSessions();
    const session = sessions[sessionId];
    
    if (!session) return false;
    
    // Mark as inactive
    session.active = false;
    
    // Save back to localStorage
    localStorage.setItem('quizSessions', JSON.stringify(sessions));
    
    return true;
  } catch (error) {
    console.error('Failed to end quiz session', error);
    return false;
  }
};

// Serialize quiz to share
export const serializeQuiz = (quiz: CustomQuiz): string => {
  try {
    // Convert to JSON and encode as base64
    const jsonString = JSON.stringify(quiz);
    return btoa(encodeURIComponent(jsonString));
  } catch (error) {
    console.error('Failed to serialize quiz', error);
    return '';
  }
};

// Deserialize quiz from shared string
export const deserializeQuiz = (serialized: string): CustomQuiz | null => {
  try {
    // Decode from base64 and parse JSON
    const jsonString = decodeURIComponent(atob(serialized));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to deserialize quiz', error);
    return null;
  }
};