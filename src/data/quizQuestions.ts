export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  category?: string; // Added optional category field
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
    category: "Geography"
  },
  {
    id: 2,
    question: "Which planet is closest to the sun?",
    options: ["Earth", "Mercury", "Mars", "Venus"],
    answer: "Mercury",
    category: "Science"
  },
  {
    id: 3,
    question: "What is the largest mammal on Earth?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Polar Bear"],
    answer: "Blue Whale",
    category: "Science"
  },
  {
    id: 4,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    answer: "Oxygen",
    category: "Science"
  },
  {
    id: 5,
    question: "Which artist painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    answer: "Leonardo da Vinci",
    category: "Art"
  },
  {
    id: 6,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Thailand", "South Korea"],
    answer: "Japan",
    category: "Geography"
  },
  {
    id: 7,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean",
    category: "Geography"
  },
  {
    id: 8,
    question: "Which desert is the largest in the world?",
    options: ["Gobi Desert", "Kalahari Desert", "Sahara Desert", "Antarctic Desert"],
    answer: "Antarctic Desert",
    category: "Geography"
  },
  {
    id: 9,
    question: "In which year did World War II end?",
    options: ["1943", "1945", "1947", "1950"],
    answer: "1945",
    category: "History"
  },
  {
    id: 10,
    question: "Who was the first president of the United States?",
    options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
    answer: "George Washington",
    category: "History"
  },
  {
    id: 11,
    question: "Who is often called the founder of Microsoft?",
    options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
    answer: "Bill Gates",
    category: "Technology"
  },
  {
    id: 12,
    question: "What year was the first iPhone released?",
    options: ["2005", "2007", "2010", "2012"],
    answer: "2007",
    category: "Technology"
  },
  {
    id: 13,
    question: "Which country has won the most FIFA World Cup titles?",
    options: ["Germany", "Argentina", "Brazil", "France"],
    answer: "Brazil",
    category: "Sports"
  },
  {
    id: 14,
    question: "How many players are on a standard soccer team?",
    options: ["9", "10", "11", "12"],
    answer: "11",
    category: "Sports"
  },
  {
    id: 15,
    question: "Which actor played Iron Man in the Marvel Cinematic Universe?",
    options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
    answer: "Robert Downey Jr.",
    category: "Entertainment"
  },
  {
    id: 16,
    question: "Which band performed the song 'Bohemian Rhapsody'?",
    options: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"],
    answer: "Queen",
    category: "Entertainment"
  },
  {
    id: 17,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gl", "Au", "Ag"],
    answer: "Au",
    category: "Science"
  },
  {
    id: 18,
    question: "What is the hardest natural substance on Earth?",
    options: ["Diamond", "Titanium", "Platinum", "Quartz"],
    answer: "Diamond",
    category: "Science"
  },
  {
    id: 19,
    question: "Which country is credited with inventing pizza?",
    options: ["France", "Greece", "Italy", "Spain"],
    answer: "Italy",
    category: "Food"
  },
  {
    id: 20,
    question: "What is the main ingredient in guacamole?",
    options: ["Avocado", "Tomato", "Onion", "Lime"],
    answer: "Avocado",
    category: "Food"
  }
];

export default quizQuestions;