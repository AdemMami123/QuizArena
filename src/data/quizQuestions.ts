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
  },
  {
    id: 21,
    question: "Which programming language was created by Brendan Eich in 10 days?",
    options: ["Java", "JavaScript", "Python", "Ruby"],
    answer: "JavaScript",
    category: "Technology"
  },
  {
    id: 22,
    question: "Which famous physicist developed the theory of relativity?",
    options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Stephen Hawking"],
    answer: "Albert Einstein",
    category: "Science"
  },
  {
    id: 23,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra",
    category: "Geography"
  },
  {
    id: 24,
    question: "Who wrote the Harry Potter book series?",
    options: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "Stephenie Meyer"],
    answer: "J.K. Rowling",
    category: "Entertainment"
  },
  {
    id: 25,
    question: "Which company developed the popular game Minecraft?",
    options: ["Blizzard", "Mojang", "Electronic Arts", "Ubisoft"],
    answer: "Mojang",
    category: "Gaming"
  },
  {
    id: 26,
    question: "Which vitamin is produced by the skin when exposed to sunlight?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
    answer: "Vitamin D",
    category: "Health"
  },
  {
    id: 27,
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
    answer: "Nile",
    category: "Geography"
  },
  {
    id: 28,
    question: "What is the national flower of Japan?",
    options: ["Cherry Blossom", "Lotus", "Rose", "Tulip"],
    answer: "Cherry Blossom",
    category: "Culture"
  },
  {
    id: 29,
    question: "What is the most widely spoken language in the world?",
    options: ["Mandarin Chinese", "English", "Spanish", "Hindi"],
    answer: "Mandarin Chinese",
    category: "Language"
  },
  {
    id: 30,
    question: "Which famous painting features a woman with a mysterious smile?",
    options: ["The Scream", "The Starry Night", "Mona Lisa", "Girl with a Pearl Earring"],
    answer: "Mona Lisa",
    category: "Art"
  },
  {
    id: 31,
    question: "What is the capital city of Brazil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    answer: "Brasília",
    category: "Geography"
  },
  {
    id: 32,
    question: "Who wrote 'Pride and Prejudice'?",
    options: ["Charlotte Brontë", "Jane Austen", "Emily Dickinson", "Mary Shelley"],
    answer: "Jane Austen",
    category: "Literature"
  },
  {
    id: 33,
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Mars", "Jupiter", "Saturn", "Venus"],
    answer: "Mars",
    category: "Science"
  },
  {
    id: 34,
    question: "Who painted 'The Persistence of Memory'?",
    options: ["Pablo Picasso", "Salvador Dalí", "Claude Monet", "Vincent van Gogh"],
    answer: "Salvador Dalí",
    category: "Art"
  },
  {
    id: 35,
    question: "What is the chemical symbol for silver?",
    options: ["Ag", "Au", "Si", "S"],
    answer: "Ag",
    category: "Science"
  },
  {
    id: 36,
    question: "In which year did the Berlin Wall fall?",
    options: ["1987", "1989", "1991", "1993"],
    answer: "1989",
    category: "History"
  },
  {
    id: 37,
    question: "What is the largest island in the world?",
    options: ["Greenland", "Australia", "Borneo", "Madagascar"],
    answer: "Greenland",
    category: "Geography"
  },
  {
    id: 38,
    question: "Who is known as the 'Father of Modern Physics'?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Niels Bohr"],
    answer: "Albert Einstein",
    category: "Science"
  },
  {
    id: 39,
    question: "Which mountain range is the longest in the world?",
    options: ["Rocky Mountains", "Himalayas", "Andes", "Alps"],
    answer: "Andes",
    category: "Geography"
  },
  {
    id: 40,
    question: "What is the currency of Japan?",
    options: ["Yen", "Won", "Dollar", "Euro"],
    answer: "Yen",
    category: "Economics"
  },
  {
    id: 41,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
    answer: "Harper Lee",
    category: "Literature"
  },
  {
    id: 42,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra",
    category: "Geography"
  },
  {
    id: 43,
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Oxygen", "Nitrogen"],
    answer: "Hydrogen",
    category: "Science"
  },
  {
    id: 44,
    question: "Who painted the 'Mona Lisa'?",
    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Titian"],
    answer: "Leonardo da Vinci",
    category: "Art"
  },
  {
    id: 45,
    question: "In which year did World War II end?",
    options: ["1943", "1945", "1947", "1949"],
    answer: "1945",
    category: "History"
  },
  {
    id: 46,
    question: "What is the largest desert in the world?",
    options: ["Sahara", "Gobi", "Antarctic", "Arabian"],
    answer: "Antarctic",
    category: "Geography"
  },
  {
    id: 47,
    question: "Who discovered penicillin?",
    options: ["Alexander Fleming", "Louis Pasteur", "Robert Koch", "Joseph Lister"],
    answer: "Alexander Fleming",
    category: "Science"
  },
  {
    id: 48,
    question: "Which artist is famous for 'Starry Night'?",
    options: ["Paul Cézanne", "Vincent van Gogh", "Henri Matisse", "Pierre-Auguste Renoir"],
    answer: "Vincent van Gogh",
    category: "Art"
  },
  {
    id: 49,
    question: "What was the primary language of the Roman Empire?",
    options: ["Greek", "Latin", "Aramaic", "Etruscan"],
    answer: "Latin",
    category: "History"
  },
  {
    id: 50,
    question: "What is the currency of Canada?",
    options: ["Pound", "Dollar", "Euro", "Franc"],
    answer: "Dollar",
    category: "Economics"
  },
  {
    id: 51,
    question: "Who wrote '1984'?",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
    answer: "George Orwell",
    category: "Literature"
  },
  {
    id: 52,
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Bangalore", "Kolkata"],
    answer: "Delhi",
    category: "Geography"
  },
  {
    id: 53,
    question: "What gas makes up most of Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
    answer: "Nitrogen",
    category: "Science"
  },
  {
    id: 54,
    question: "Who sculpted 'David'?",
    options: ["Donatello", "Michelangelo", "Bernini", "Cellini"],
    answer: "Michelangelo",
    category: "Art"
  },
  {
    id: 55,
    question: "In which year was the Declaration of Independence signed?",
    options: ["1774", "1776", "1778", "1780"],
    answer: "1776",
    category: "History"
  },
  {
    id: 56,
    question: "What is the smallest country by land area?",
    options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
    answer: "Vatican City",
    category: "Geography"
  },
  {
    id: 57,
    question: "Who proposed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Max Planck", "Werner Heisenberg"],
    answer: "Albert Einstein",
    category: "Science"
  },
  {
    id: 58,
    question: "Which artist created 'The Scream'?",
    options: ["Edvard Munch", "Gustav Klimt", "Egon Schiele", "Wassily Kandinsky"],
    answer: "Edvard Munch",
    category: "Art"
  },
  {
    id: 59,
    question: "What event started World War I?",
    options: ["Assassination of Archduke Franz Ferdinand", "Treaty of Versailles", "Russian Revolution", "Spanish Flu"],
    answer: "Assassination of Archduke Franz Ferdinand",
    category: "History"
  },
  {
    id: 60,
    question: "What is the currency of China?",
    options: ["Yuan", "Rupee", "Won", "Baht"],
    answer: "Yuan",
    category: "Economics"
  },
  {
    id: 61,
    question: "Who wrote 'The Great Gatsby'?",
    options: ["Ernest Hemingway", "F. Scott Fitzgerald", "John Steinbeck", "William Faulkner"],
    answer: "F. Scott Fitzgerald",
    category: "Literature"
  },
  {
    id: 62,
    question: "What is the capital of Russia?",
    options: ["St. Petersburg", "Moscow", "Novosibirsk", "Kazan"],
    answer: "Moscow",
    category: "Geography"
  },
  {
    id: 63,
    question: "What is the primary source of energy for Earth?",
    options: ["Moon", "Sun", "Wind", "Geothermal"],
    answer: "Sun",
    category: "Science"
  },
  {
    id: 64,
    question: "Who painted 'Guernica'?",
    options: ["Pablo Picasso", "Joan Miró", "Francisco Goya", "Diego Rivera"],
    answer: "Pablo Picasso",
    category: "Art"
  },
  {
    id: 65,
    question: "In which year did the first man land on the moon?",
    options: ["1965", "1967", "1969", "1971"],
    answer: "1969",
    category: "History"
  },
  {
    id: 66,
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    answer: "Nile",
    category: "Geography"
  },
  {
    id: 67,
    question: "Who developed the theory of evolution by natural selection?",
    options: ["Charles Darwin", "Gregor Mendel", "Lamarck", "Thomas Huxley"],
    answer: "Charles Darwin",
    category: "Science"
  },
  {
    id: 68,
    question: "Which artist is known for 'Water Lilies'?",
    options: ["Claude Monet", "Pierre-Auguste Renoir", "Mary Cassatt", "Edgar Degas"],
    answer: "Claude Monet",
    category: "Art"
  },
  {
    id: 69,
    question: "What year did the Titanic sink?",
    options: ["1910", "1912", "1914", "1916"],
    answer: "1912",
    category: "History"
  },
  {
    id: 70,
    question: "What is the currency of South Korea?",
    options: ["Yen", "Won", "Dollar", "Peso"],
    answer: "Won",
    category: "Economics"
  },
  {
    id: 71,
    question: "Who wrote 'Moby-Dick'?",
    options: ["Herman Melville", "Nathaniel Hawthorne", "Edgar Allan Poe", "Walt Whitman"],
    answer: "Herman Melville",
    category: "Literature"
  },
  {
    id: 72,
    question: "What is the capital of Argentina?",
    options: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
    answer: "Buenos Aires",
    category: "Geography"
  },
  {
    id: 73,
    question: "What is the hardest natural substance known?",
    options: ["Gold", "Diamond", "Quartz", "Iron"],
    answer: "Diamond",
    category: "Science"
  },
  {
    id: 74,
    question: "Who painted 'The Birth of Venus'?",
    options: ["Sandro Botticelli", "Titian", "Raphael", "Leonardo da Vinci"],
    answer: "Sandro Botticelli",
    category: "Art"
  },
  {
    id: 75,
    question: "In which year did the American Civil War end?",
    options: ["1861", "1863", "1865", "1867"],
    answer: "1865",
    category: "History"
  },
  {
    id: 76,
    question: "What is the deepest ocean in the world?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
    category: "Geography"
  },
  {
    id: 77,
    question: "Who formulated the laws of motion?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Johannes Kepler"],
    answer: "Isaac Newton",
    category: "Science"
  },
  {
    id: 78,
    question: "Which artist created 'Les Demoiselles d'Avignon'?",
    options: ["Henri Matisse", "Pablo Picasso", "Georges Braque", "Juan Gris"],
    answer: "Pablo Picasso",
    category: "Art"
  },
  {
    id: 79,
    question: "What year did the French Revolution begin?",
    options: ["1785", "1789", "1791", "1793"],
    answer: "1789",
    category: "History"
  },
  {
    id: 80,
    question: "What is the currency of Mexico?",
    options: ["Peso", "Dollar", "Euro", "Real"],
    answer: "Peso",
    category: "Economics"
  },
  {
    id: 81,
    question: "Who wrote 'The Catcher in the Rye'?",
    options: ["J.D. Salinger", "John Updike", "Philip Roth", "Saul Bellow"],
    answer: "J.D. Salinger",
    category: "Literature"
  },
  {
    id: 82,
    question: "What is the capital of Egypt?",
    options: ["Alexandria", "Giza", "Cairo", "Luxor"],
    answer: "Cairo",
    category: "Geography"
  },
  {
    id: 83,
    question: "What is the most abundant element in the universe?",
    options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
    answer: "Hydrogen",
    category: "Science"
  },
  {
    id: 84,
    question: "Who painted 'The Last Supper'?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Titian"],
    answer: "Leonardo da Vinci",
    category: "Art"
  },
  {
    id: 85,
    question: "In which year did the Cold War end?",
    options: ["1985", "1989", "1991", "1993"],
    answer: "1991",
    category: "History"
  },
  {
    id: 86,
    question: "What is the highest mountain in the world?",
    options: ["K2", "Kangchenjunga", "Everest", "Lhotse"],
    answer: "Everest",
    category: "Geography"
  },
  {
    id: 87,
    question: "Who discovered the structure of DNA?",
    options: ["James Watson and Francis Crick", "Rosalind Franklin", "Linus Pauling", "Erwin Chargaff"],
    answer: "James Watson and Francis Crick",
    category: "Science"
  },
  {
    id: 88,
    question: "Which artist is known for 'The Kiss'?",
    options: ["Gustav Klimt", "Egon Schiele", "Oskar Kokoschka", "Koloman Moser"],
    answer: "Gustav Klimt",
    category: "Art"
  },
  {
    id: 89,
    question: "What year did the United States enter World War II?",
    options: ["1939", "1940", "1941", "1942"],
    answer: "1941",
    category: "History"
  },
  {
    id: 90,
    question: "What is the currency of Brazil?",
    options: ["Peso", "Real", "Dollar", "Euro"],
    answer: "Real",
    category: "Economics"
  },
  {
    id: 91,
    question: "Who wrote 'Brave New World'?",
    options: ["Aldous Huxley", "George Orwell", "H.G. Wells", "Ray Bradbury"],
    answer: "Aldous Huxley",
    category: "Literature"
  },
  {
    id: 92,
    question: "What is the capital of South Africa?",
    options: ["Johannesburg", "Cape Town", "Pretoria", "Durban"],
    answer: "Pretoria",
    category: "Geography"
  },
  {
    id: 93,
    question: "What is the boiling point of water in Celsius?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C",
    category: "Science"
  },
  {
    id: 94,
    question: "Who painted 'The Starry Night Over the Rhône'?",
    options: ["Vincent van Gogh", "Paul Gauguin", "Émile Bernard", "Henri de Toulouse-Lautrec"],
    answer: "Vincent van Gogh",
    category: "Art"
  },
  {
    id: 95,
    question: "In which year did the Renaissance begin?",
    options: ["1200", "1300", "1400", "1500"],
    answer: "1400",
    category: "History"
  },
  {
    id: 96,
    question: "What is the largest lake in the world by surface area?",
    options: ["Lake Superior", "Lake Victoria", "Lake Tanganyika", "Caspian Sea"],
    answer: "Caspian Sea",
    category: "Geography"
  },
  {
    id: 97,
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Alexander Graham Bell", "Guglielmo Marconi", "Nikola Tesla"],
    answer: "Alexander Graham Bell",
    category: "Science"
  },
  {
    id: 98,
    question: "Which artist created 'The Thinker'?",
    options: ["Auguste Rodin", "Camille Claudel", "Aristide Maillol", "Jean-Baptiste Carpeaux"],
    answer: "Auguste Rodin",
    category: "Art"
  },
  {
    id: 99,
    question: "What year did the Great Depression begin?",
    options: ["1927", "1929", "1931", "1933"],
    answer: "1929",
    category: "History"
  },
  {
    id: 100,
    question: "What is the currency of India?",
    options: ["Rupee", "Dollar", "Pound", "Euro"],
    answer: "Rupee",
    category: "Economics"
  },
  {
    id: 101,
    question: "Who wrote 'The Odyssey'?",
    options: ["Homer", "Virgil", "Sophocles", "Euripides"],
    answer: "Homer",
    category: "Literature"
  },
  {
    id: 102,
    question: "What is the capital of Italy?",
    options: ["Venice", "Milan", "Rome", "Florence"],
    answer: "Rome",
    category: "Geography"
  },
  {
    id: 103,
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Lungs"],
    answer: "Skin",
    category: "Science"
  },
  {
    id: 104,
    question: "Who painted 'The Night Watch'?",
    options: ["Rembrandt", "Johannes Vermeer", "Frans Hals", "Pieter Bruegel the Elder"],
    answer: "Rembrandt",
    category: "Art"
  },
  {
    id: 105,
    question: "In which year did the Vietnam War end?",
    options: ["1973", "1975", "1977", "1979"],
    answer: "1975",
    category: "History"
  },
  {
    id: 106,
    question: "What is the largest continent by land area?",
    options: ["Africa", "Asia", "North America", "Europe"],
    answer: "Asia",
    category: "Geography"
  },
  {
    id: 107,
    question: "Who discovered electricity?",
    options: ["Michael Faraday", "Benjamin Franklin", "Thomas Edison", "Nikola Tesla"],
    answer: "Benjamin Franklin",
    category: "Science"
  },
  {
    id: 108,
    question: "Which artist created 'Campbell's Soup Cans'?",
    options: ["Andy Warhol", "Roy Lichtenstein", "Claes Oldenburg", "James Rosenquist"],
    answer: "Andy Warhol",
    category: "Art"
  },
  {
    id: 109,
    question: "What year did the Magna Carta get signed?",
    options: ["1212", "1215", "1218", "1220"],
    answer: "1215",
    category: "History"
  },
  {
    id: 110,
    question: "What is the currency of Russia?",
    options: ["Ruble", "Dollar", "Euro", "Pound"],
    answer: "Ruble",
    category: "Economics"
  },
  {
    id: 111,
    question: "Who wrote 'Frankenstein'?",
    options: ["Mary Shelley", "Jane Austen", "Emily Brontë", "Charlotte Brontë"],
    answer: "Mary Shelley",
    category: "Literature"
  },
  {
    id: 112,
    question: "What is the capital of Spain?",
    options: ["Barcelona", "Madrid", "Seville", "Valencia"],
    answer: "Madrid",
    category: "Geography"
  },
  {
    id: 113,
    question: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
    answer: "Nitrogen",
    category: "Science"
  },
  {
    id: 114,
    question: "Who painted 'The School of Athens'?",
    options: ["Raphael", "Michelangelo", "Leonardo da Vinci", "Titian"],
    answer: "Raphael",
    category: "Art"
  },
  {
    id: 115,
    question: "In which year did the Industrial Revolution begin?",
    options: ["1750", "1760", "1770", "1780"],
    answer: "1760",
    category: "History"
  },
  {
    id: 116,
    question: "What is the largest country by land area?",
    options: ["Canada", "China", "Russia", "United States"],
    answer: "Russia",
    category: "Geography"
  },
  {
    id: 117,
    question: "Who invented the light bulb?",
    options: ["Thomas Edison", "Nikola Tesla", "Humphry Davy", "Joseph Swan"],
    answer: "Thomas Edison",
    category: "Science"
  },
  {
    id: 118,
    question: "Which artist is known for 'Whaam!'?",
    options: ["Roy Lichtenstein", "Andy Warhol", "Jasper Johns", "Robert Rauschenberg"],
    answer: "Roy Lichtenstein",
    category: "Art"
  },
  {
    id: 119,
    question: "What year did the first email get sent?",
    options: ["1969", "1971", "1973", "1975"],
    answer: "1971",
    category: "History"
  },
  {
    id: 120,
    question: "What is the currency of Australia?",
    options: ["Dollar", "Pound", "Euro", "Franc"],
    answer: "Dollar",
    category: "Economics"
  },
  {
    id: 121,
    question: "Who wrote 'The Hobbit'?",
    options: ["J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling", "George R.R. Martin"],
    answer: "J.R.R. Tolkien",
    category: "Literature"
  },
  {
    id: 122,
    question: "What is the capital of Germany?",
    options: ["Munich", "Berlin", "Hamburg", "Frankfurt"],
    answer: "Berlin",
    category: "Geography"
  },
  {
    id: 123,
    question: "What is the primary source of energy for the human body?",
    options: ["Protein", "Fat", "Carbohydrates", "Vitamins"],
    answer: "Carbohydrates",
    category: "Science"
  },
  {
    id: 124,
    question: "Who painted 'The Arnolfini Portrait'?",
    options: ["Jan van Eyck", "Rogier van der Weyden", "Hans Memling", "Gerard David"],
    answer: "Jan van Eyck",
    category: "Art"
  },
  {
    id: 125,
    question: "In which year did the Spanish Civil War end?",
    options: ["1936", "1938", "1939", "1941"],
    answer: "1939",
    category: "History"
  },
  {
    id: 126,
    question: "What is the largest ocean by surface area?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific",
    category: "Geography"
  },
  {
    id: 127,
    question: "Who discovered the law of gravity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Johannes Kepler"],
    answer: "Isaac Newton",
    category: "Science"
  },
  {
    id: 128,
    question: "Which artist created 'Nighthawks'?",
    options: ["Edward Hopper", "Norman Rockwell", "Grant Wood", "Thomas Hart Benton"],
    answer: "Edward Hopper",
    category: "Art"
  },
  {
    id: 129,
    question: "What year did the Russian Revolution occur?",
    options: ["1915", "1917", "1919", "1921"],
    answer: "1917",
    category: "History"
  },
  {
    id: 130,
    question: "What is the currency of France?",
    options: ["Franc", "Euro", "Pound", "Dollar"],
    answer: "Euro",
    category: "Economics"
  },
  {
    id: 131,
    question: "Who wrote 'The Divine Comedy'?",
    options: ["Dante Alighieri", "Petrarch", "Boccaccio", "Ariosto"],
    answer: "Dante Alighieri",
    category: "Literature"
  },
  {
    id: 132,
    question: "What is the capital of Mexico?",
    options: ["Guadalajara", "Monterrey", "Mexico City", "Puebla"],
    answer: "Mexico City",
    category: "Geography"
  },
  {
    id: 133,
    question: "What is the freezing point of water in Celsius?",
    options: ["0°C", "10°C", "20°C", "30°C"],
    answer: "0°C",
    category: "Science"
  },
  {
    id: 134,
    question: "Who painted 'The Haywain'?",
    options: ["John Constable", "J.M.W. Turner", "Thomas Gainsborough", "William Blake"],
    answer: "John Constable",
    category: "Art"
  },
  {
    id: 135,
    question: "In which year did the Great Fire of London occur?",
    options: ["1656", "1666", "1676", "1686"],
    answer: "1666",
    category: "History"
  },
  {
    id: 136,
    question: "What is the smallest continent by land area?",
    options: ["Europe", "Australia", "Antarctica", "South America"],
    answer: "Australia",
    category: "Geography"
  },
  {
    id: 137,
    question: "Who invented the steam engine?",
    options: ["James Watt", "Thomas Savery", "George Stephenson", "Robert Fulton"],
    answer: "James Watt",
    category: "Science"
  },
  {
    id: 138,
    question: "Which artist created 'The Garden of Earthly Delights'?",
    options: ["Hieronymus Bosch", "Pieter Bruegel the Elder", "Albrecht Dürer", "Lucas Cranach the Elder"],
    answer: "Hieronymus Bosch",
    category: "Art"
  },
  {
    id: 139,
    question: "What year did the first manned space flight occur?",
    options: ["1960", "1961", "1962", "1963"],
    answer: "1961",
    category: "History"
  },
  {
    id: 140,
    question: "What is the currency of Italy?",
    options: ["Lira", "Euro", "Pound", "Franc"],
    answer: "Euro",
    category: "Economics"
  },
  {
    id: 141,
    question: "Who wrote 'Crime and Punishment'?",
    options: ["Leo Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov", "Ivan Turgenev"],
    answer: "Fyodor Dostoevsky",
    category: "Literature"
  },
  {
    id: 142,
    question: "What is the capital of Japan?",
    options: ["Osaka", "Tokyo", "Kyoto", "Hiroshima"],
    answer: "Tokyo",
    category: "Geography"
  },
  {
    id: 143,
    question: "What is the main component of the sun?",
    options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    answer: "Hydrogen",
    category: "Science"
  },
  {
    id: 144,
    question: "Who painted 'Las Meninas'?",
    options: ["Diego Velázquez", "Francisco Goya", "El Greco", "Murillo"],
    answer: "Diego Velázquez",
    category: "Art"
  },
  {
    id: 145,
    question: "In which year did the Battle of Waterloo occur?",
    options: ["1812", "1814", "1815", "1817"],
    answer: "1815",
    category: "History"
  },
  {
    id: 146,
    question: "What is the largest waterfall in the world?",
    options: ["Niagara Falls", "Victoria Falls", "Angel Falls", "Iguazu Falls"],
    answer: "Angel Falls",
    category: "Geography"
  },
  {
    id: 147,
    question: "Who developed the first successful vaccine?",
    options: ["Edward Jenner", "Louis Pasteur", "Robert Koch", "Jonas Salk"],
    answer: "Edward Jenner",
    category: "Science"
  },
  {
    id: 148,
    question: "Which artist created 'The Raft of the Medusa'?",
    options: ["Théodore Géricault", "Eugène Delacroix", "Jean-Auguste-Dominique Ingres", "Jacques-Louis David"],
    answer: "Théodore Géricault",
    category: "Art"
  },
  {
    id: 149,
    question: "What year did the first computer 'ENIAC' become operational?",
    options: ["1943", "1945", "1947", "1949"],
    answer: "1945",
    category: "History"
  },
  {
    id: 150,
    question: "What is the currency of Spain?",
    options: ["Peseta", "Euro", "Pound", "Dollar"],
    answer: "Euro",
    category: "Economics"
  },
  {
    id: 151,
    question: "Who wrote 'Wuthering Heights'?",
    options: ["Charlotte Brontë", "Emily Brontë", "Anne Brontë", "Jane Austen"],
    answer: "Emily Brontë",
    category: "Literature"
  },
  {
    id: 152,
    question: "What is the capital of Thailand?",
    options: ["Chiang Mai", "Bangkok", "Phuket", "Pattaya"],
    answer: "Bangkok",
    category: "Geography"
  },
  {
    id: 153,
    question: "What is the speed of light in a vacuum?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    answer: "300,000 km/s",
    category: "Science"
  },
  {
    id: 154,
    question: "Who painted 'The Creation of Adam'?",
    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Titian"],
    answer: "Michelangelo",
    category: "Art"
  },
  {
    id: 155,
    question: "In which year did the Chernobyl disaster occur?",
    options: ["1984", "1986", "1988", "1990"],
    answer: "1986",
    category: "History"
  },
  {
    id: 156,
    question: "What is the largest peninsula in the world?",
    options: ["Arabian", "Indian", "Scandinavian", "Malay"],
    answer: "Arabian",
    category: "Geography"
  },
  {
    id: 157,
    question: "Who invented the World Wide Web?",
    options: ["Tim Berners-Lee", "Vinton Cerf", "Robert Kahn", "Marc Andreessen"],
    answer: "Tim Berners-Lee",
    category: "Science"
  },
  {
    id: 158,
    question: "Which artist created 'The Blue Rider'?",
    options: ["Wassily Kandinsky", "Paul Klee", "Franz Marc", "August Macke"],
    answer: "Wassily Kandinsky",
    category: "Art"
  },
  {
    id: 159,
    question: "What year did the first successful airplane flight occur?",
    options: ["1900", "1903", "1905", "1907"],
    answer: "1903",
    category: "History"
  },
  {
    id: 160,
    question: "What is the currency of Germany?",
    options: ["Mark", "Euro", "Franc", "Dollar"],
    answer: "Euro",
    category: "Economics"
  },
  {
    id: 161,
    question: "Who wrote 'Don Quixote'?",
    options: ["Miguel de Cervantes", "Lope de Vega", "Pedro Calderón de la Barca", "Francisco de Quevedo"],
    answer: "Miguel de Cervantes",
    category: "Literature"
  },
  {
    id: 162,
    question: "What is the capital of Turkey?",
    options: ["Istanbul", "Ankara", "Izmir", "Antalya"],
    answer: "Ankara",
    category: "Geography"
  },
  {
    id: 163,
    question: "What is the most common blood type?",
    options: ["A", "B", "AB", "O"],
    answer: "O",
    category: "Science"
  },
  {
    id: 164,
    question: "Who painted 'The Swing'?",
    options: ["Jean-Honoré Fragonard", "François Boucher", "Thomas Gainsborough", "Joshua Reynolds"],
    answer: "Jean-Honoré Fragonard",
    category: "Art"
  },
  {
    id: 165,
    question: "In which year did the Apollo 11 mission land on the moon?",
    options: ["1967", "1969", "1971", "1973"],
    answer: "1969",
    category: "History"
  },
  {
    id: 166,
    question: "What is the largest coral reef system in the world?",
    options: ["Great Barrier Reef", "Belize Barrier Reef", "New Caledonia Barrier Reef", "Red Sea Coral Reef"],
    answer: "Great Barrier Reef",
    category: "Geography"
  },
  {
    id: 167,
    question: "Who discovered X-rays?",
    options: ["Wilhelm Röntgen", "Henri Becquerel", "Marie Curie", "Ernest Rutherford"],
    answer: "Wilhelm Röntgen",
    category: "Science"
  },
  {
    id: 168,
    question: "Which artist created 'American Gothic'?",
    options: ["Grant Wood", "Norman Rockwell", "Thomas Hart Benton", "John Steuart Curry"],
    answer: "Grant Wood",
    category: "Art"
  },
  {
    id: 169,
    question: "What year did the first successful heart transplant occur?",
    options: ["1965", "1967", "1969", "1971"],
    answer: "1967",
    category: "History"
  },
  {
    id: 170,
    question: "What is the currency of the United Kingdom?",
    options: ["Euro", "Pound", "Dollar", "Franc"],
    answer: "Pound",
    category: "Economics"
  },
  {
    id: 171,
    question: "Who wrote 'Les Misérables'?",
    options: ["Victor Hugo", "Alexandre Dumas", "Émile Zola", "Gustave Flaubert"],
    answer: "Victor Hugo",
    category: "Literature"
  },
  {
    id: 172,
    question: "What is the capital of Greece?",
    options: ["Thessaloniki", "Athens", "Patras", "Heraklion"],
    answer: "Athens",
    category: "Geography"
  },
  {
    id: 173,
    question: "What is the pH of pure water?",
    options: ["5", "6", "7", "8"],
    answer: "7",
    category: "Science"
  },
  {
    id: 174,
    question: "Who painted 'The Fighting Temeraire'?",
    options: ["J.M.W. Turner", "John Constable", "William Blake", "Thomas Gainsborough"],
    answer: "J.M.W. Turner",
    category: "Art"
  },
  {
    id: 175,
    question: "In which year did the Black Death peak in Europe?",
    options: ["1346", "1348", "1350", "1352"],
    answer: "1348",
    category: "History"
  },
  {
    id: 176,
    question: "What is the largest volcano in the world?",
    options: ["Mount Vesuvius", "Mount Etna", "Mauna Loa", "Mount Fuji"],
    answer: "Mauna Loa",
    category: "Geography"
  },
  {
    id: 177,
    question: "Who invented the printing press?",
    options: ["Johannes Gutenberg", "Aldus Manutius", "William Caxton", "John Baskerville"],
    answer: "Johannes Gutenberg",
    category: "Science"
  },
  {
    id: 178,
    question: "Which artist created 'The Treachery of Images'?",
    options: ["René Magritte", "Max Ernst", "Salvador Dalí", "Joan Miró"],
    answer: "René Magritte",
    category: "Art"
  },
  {
    id: 179,
    question: "What year did the first successful transatlantic telegraph cable operate?",
    options: ["1856", "1858", "1860", "1862"],
    answer: "1858",
    category: "History"
  },
  {
    id: 180,
    question: "What is the currency of Switzerland?",
    options: ["Euro", "Franc", "Dollar", "Pound"],
    answer: "Franc",
    category: "Economics"
  },
  {
    id: 181,
    question: "Who wrote 'One Hundred Years of Solitude'?",
    options: ["Gabriel García Márquez", "Mario Vargas Llosa", "Isabel Allende", "Jorge Luis Borges"],
    answer: "Gabriel García Márquez",
    category: "Literature"
  },
  {
    id: 182,
    question: "What is the capital of Portugal?",
    options: ["Lisbon", "Porto", "Coimbra", "Braga"],
    answer: "Lisbon",
    category: "Geography"
  },
  {
    id: 183,
    question: "What is the most reactive element?",
    options: ["Gold", "Fluorine", "Iron", "Helium"],
    answer: "Fluorine",
    category: "Science"
  },
  {
    id: 184,
    question: "Who painted 'The Entombment of Christ'?",
    options: ["Caravaggio", "Annibale Carracci", "Guido Reni", "Domenichino"],
    answer: "Caravaggio",
    category: "Art"
  },
  {
    id: 185,
    question: "In which year did the Suez Crisis occur?",
    options: ["1954", "1956", "1958", "1960"],
    answer: "1956",
    category: "History"
  },
  {
    id: 186,
    question: "What is the largest canyon in the world?",
    options: ["Grand Canyon", "Fish River Canyon", "Yarlung Tsangpo Grand Canyon", "Colca Canyon"],
    answer: "Yarlung Tsangpo Grand Canyon",
    category: "Geography"
  },
  {
    id: 187,
    question: "Who invented the thermometer?",
    options: ["Galileo Galilei", "Daniel Gabriel Fahrenheit", "Anders Celsius", "Evangelista Torricelli"],
    answer: "Galileo Galilei",
    category: "Science"
  },
  {
    id: 188,
    question: "Which artist created 'Composition VIII'?",
    options: ["Wassily Kandinsky", "Piet Mondrian", "Kazimir Malevich", "Theo van Doesburg"],
    answer: "Wassily Kandinsky",
    category: "Art"
  },
  {
    id: 189,
    question: "What year did the first nuclear bomb test occur?",
    options: ["1942", "1944", "1945", "1947"],
    answer: "1945",
    category: "History"
  },
  {
    id: 190,
    question: "What is the currency of Japan?",
    options: ["Yen", "Won", "Dollar", "Euro"],
    answer: "Yen",
    category: "Economics"
  },
  {
    id: 191,
    question: "Who wrote 'The Stranger'?",
    options: ["Albert Camus", "Jean-Paul Sartre", "Simone de Beauvoir", "André Gide"],
    answer: "Albert Camus",
    category: "Literature"
  },
  {
    id: 192,
    question: "What is the capital of Sweden?",
    options: ["Gothenburg", "Stockholm", "Malmö", "Uppsala"],
    answer: "Stockholm",
    category: "Geography"
  },
  {
    id: 193,
    question: "What is the primary source of energy for plants?",
    options: ["Water", "Soil", "Sunlight", "Air"],
    answer: "Sunlight",
    category: "Science"
  },
  {
    id: 194,
    question: "Who painted 'The Disasters of War'?",
    options: ["Francisco Goya", "Diego Velázquez", "El Greco", "Jusepe de Ribera"],
    answer: "Francisco Goya",
    category: "Art"
  },
  {
    id: 195,
    question: "In which year did the fall of the Roman Empire occur?",
    options: ["475", "476", "477", "478"],
    answer: "476",
    category: "History"
  },
  {
    id: 196,
    question: "What is the largest archipelago in the world?",
    options: ["Malay Archipelago", "Japanese Archipelago", "British Isles", "New Zealand"],
    answer: "Malay Archipelago",
    category: "Geography"
  },
  {
    id: 197,
    question: "Who invented the electric battery?",
    options: ["Alessandro Volta", "Michael Faraday", "Luigi Galvani", "André-Marie Ampère"],
    answer: "Alessandro Volta",
    category: "Science"
  },
  {
    id: 198,
    question: "Which artist created 'The Sleeping Gypsy'?",
    options: ["Henri Rousseau", "Paul Gauguin", "Georges Seurat", "Camille Pissarro"],
    answer: "Henri Rousseau",
    category: "Art"
  },
  {
    id: 199,
    question: "What year did the first successful transatlantic telegraph cable operate?",
    options: ["1856", "1858", "1860", "1862"],
    answer: "1858",
    category: "History"
  },
  {
    id: 200,
    question: "What is the currency of Saudi Arabia?",
    options: ["Riyal", "Dinar", "Dirham", "Dollar"],
    answer: "Riyal",
    category: "Economics"
  },
  {
    id: 201,
    question: "Who wrote 'The Brothers Karamazov'?",
    options: ["Fyodor Dostoevsky", "Leo Tolstoy", "Anton Chekhov", "Ivan Turgenev"],
    answer: "Fyodor Dostoevsky",
    category: "Literature"
  },
  {
    id: 202,
    question: "What is the capital of Chile?",
    options: ["Valparaíso", "Santiago", "Concepción", "Antofagasta"],
    answer: "Santiago",
    category: "Geography"
  },
  {
    id: 203,
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Hippopotamus", "Giraffe"],
    answer: "Blue Whale",
    category: "Science"
  },
  {
    id: 204,
    question: "Who painted 'The Storm on the Sea of Galilee'?",
    options: ["Rembrandt", "Johannes Vermeer", "Frans Hals", "Pieter de Hooch"],
    answer: "Rembrandt",
    category: "Art"
  },
  {
    id: 205,
    question: "In which year did the Cuban Missile Crisis occur?",
    options: ["1960", "1962", "1964", "1966"],
    answer: "1962",
    category: "History"
  },
  {
    id: 206,
    question: "What is the largest plateau in the world?",
    options: ["Deccan Plateau", "Tibetan Plateau", "Colorado Plateau", "Central Siberian Plateau"],
    answer: "Tibetan Plateau",
    category: "Geography"
  },
  {
    id: 207,
    question: "Who discovered the electron?",
    options: ["J.J. Thomson", "Ernest Rutherford", "Niels Bohr", "James Chadwick"],
    answer: "J.J. Thomson",
    category: "Science"
  },
  {
    id: 208,
    question: "Which artist created 'The Large Bathers'?",
    options: ["Paul Cézanne", "Pierre-Auguste Renoir", "Mary Cassatt", "Edgar Degas"],
    answer: "Paul Cézanne",
    category: "Art"
  },
  {
    id: 209,
    question: "What year did the first successful organ transplant occur?",
    options: ["1950", "1954", "1958", "1962"],
    answer: "1954",
    category: "History"
  },
  {
    id: 210,
    question: "What is the currency of Argentina?",
    options: ["Peso", "Real", "Dollar", "Euro"],
    answer: "Peso",
    category: "Economics"
  },
  {
    id: 211,
    question: "Who wrote 'The Canterbury Tales'?",
    options: ["Geoffrey Chaucer", "William Langland", "John Gower", "Thomas Malory"],
    answer: "Geoffrey Chaucer",
    category: "Literature"
  },
  {
    id: 212,
    question: "What is the capital of Norway?",
    options: ["Bergen", "Oslo", "Trondheim", "Stavanger"],
    answer: "Oslo",
    category: "Geography"
  },
  {
    id: 213,
    question: "What is the primary gas in the air we breathe?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
    answer: "Nitrogen",
    category: "Science"
  },
  {
    id: 214,
    question: "Who painted 'The Judgment of Paris'?",
    options: ["Peter Paul Rubens", "Anthony van Dyck", "Frans Snyders", "Jacob Jordaens"],
    answer: "Peter Paul Rubens",
    category: "Art"
  },
  {
    id: 215,
    question: "In which year did the Treaty of Versailles get signed?",
    options: ["1917", "1918", "1919", "1920"],
    answer: "1919",
    category: "History"
  },
  {
    id: 216,
    question: "What is the largest hot desert in the world?",
    options: ["Gobi Desert", "Australian Desert", "Sahara Desert", "Arabian Desert"],
    answer: "Sahara Desert",
    category: "Geography"
  },
  {
    id: 217,
    question: "Who invented the microscope?",
    options: ["Antonie van Leeuwenhoek", "Robert Hooke", "Zacharias Janssen", "Hans Lippershey"],
    answer: "Zacharias Janssen",
    category: "Science"
  },
  {
    id: 218,
    question: "Which artist created 'The Dance'?",
    options: ["Henri Matisse", "Pablo Picasso", "Georges Braque", "André Derain"],
    answer: "Henri Matisse",
    category: "Art"
  },
  {
    id: 219,
    question: "What year did the first successful cloning of a mammal occur?",
    options: ["1995", "1996", "1997", "1998"],
    answer: "1996",
    category: "History"
  },
  {
    id: 220,
    question: "What is the currency of Egypt?",
    options: ["Pound", "Dollar", "Euro", "Dinar"],
    answer: "Pound",
    category: "Economics"
  },
  {
    id: 221,
    question: "Who wrote 'A Tale of Two Cities'?",
    options: ["Charles Dickens", "Jane Austen", "Emily Brontë", "Thomas Hardy"],
    answer: "Charles Dickens",
    category: "Literature"
  },
  {
    id: 222,
    question: "What is the capital of Finland?",
    options: ["Turku", "Helsinki", "Tampere", "Oulu"],
    answer: "Helsinki",
    category: "Geography"
  },
  {
    id: 223,
    question: "What is the most abundant metal in the Earth's crust?",
    options: ["Iron", "Aluminum", "Calcium", "Sodium"],
    answer: "Aluminum",
    category: "Science"
  },
  {
    id: 224,
    question: "Who painted 'The Lady of Shalott'?",
    options: ["John William Waterhouse", "Edward Burne-Jones", "Dante Gabriel Rossetti", "William Holman Hunt"],
    answer: "John William Waterhouse",
    category: "Art"
  },
  {
    id: 225,
    question: "In which year did the first modern Olympic Games occur?",
    options: ["1894", "1896", "1898", "1900"],
    answer: "1896",
    category: "History"
  },
  {
    id: 226,
    question: "What is the largest glacier in the world?",
    options: ["Siachen Glacier", "Lambert Glacier", "Hubbard Glacier", "Fedchenko Glacier"],
    answer: "Lambert Glacier",
    category: "Geography"
  },
  {
    id: 227,
    question: "Who invented the radio?",
    options: ["Guglielmo Marconi", "Nikola Tesla", "Heinrich Hertz", "Alexander Popov"],
    answer: "Guglielmo Marconi",
    category: "Science"
  },
  {
    id: 228,
    question: "Which artist created 'The Lovers'?",
    options: ["René Magritte", "Max Ernst", "Salvador Dalí", "Joan Miró"],
    answer: "René Magritte",
    category: "Art"
  },
  {
    id: 229,
    question: "What year did the first successful kidney transplant occur?",
    options: ["1950", "1952", "1954", "1956"],
    answer: "1954",
    category: "History"
  },
  {
    id: 230,
    question: "What is the currency of South Africa?",
    options: ["Rand", "Pound", "Dollar", "Euro"],
    answer: "Rand",
    category: "Economics"
  }
];

/**
 * Returns a random set of questions from the available question pool
 * @param count Number of questions to return (defaults to 10)
 * @returns Array of randomized questions
 */
export const getRandomQuestions = (count: number = 10): QuizQuestion[] => {
  // Create a copy of the questions array to avoid modifying the original
  const shuffled = [...quizQuestions];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return the requested number of questions or all if count > available questions
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export default quizQuestions;