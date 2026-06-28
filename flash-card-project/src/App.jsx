import { useState } from 'react';
import './App.css';

const App = () => {
  const cards = [
    { question: "Hello", answer: "Hola" },
    { question: "Good morning", answer: "Buenos dias" },
    { question: "Please", answer: "Porfavor" },
    { question: "Good night", answer: "Buenas noches" },
    { question: "Thank you", answer: "Gracias" },
    { question: "Friend", answer: "Amigo" },
    { question: "Goodbye", answer: "Adios" },
    { question: "Boy", answer: "Chico" },
    { question: "Girl", answer: "Chica" },
    { question: "English", answer: "Ingles" },
  ];

  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");

  const [currentCounter, setCurrentCounter] = useState(0);
  const [longestCounter, setLongestCounter] = useState(0);

  const matching = (text) => {
    return text.toLowerCase().trim();
  };

  const checkAnswer = () => {
    const userGuess = matching(guess);
    const correctAnswer = matching(cards[currentCard].answer);

    if (userGuess === correctAnswer) {
      setResult("Correct");

      const newCounter = currentCounter + 1;
      setCurrentCounter(newCounter);

      if (newCounter > longestCounter) {
        setLongestCounter(newCounter);
      }
    } else {
      setResult("Incorrect");
      setCurrentCounter(0);
    }
  };

  const nextCard = () => {
    let randomIndex = Math.floor(Math.random() * cards.length);

    while (randomIndex === currentCard) {
      randomIndex = Math.floor(Math.random() * cards.length);
    }

    setCurrentCard(randomIndex);
    setGuess("");
    setResult("");
    setIsFlipped(false);
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setGuess("");
      setResult("");
      setIsFlipped(false);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Spanish Flashcards</h1>
        <p>Practice Spanish 101</p>
        <h2>Number of cards: {cards.length}</h2>
      </div>

      <div className="card" onClick={() => setIsFlipped(!isFlipped)}>
        {isFlipped ? cards[currentCard].answer : cards[currentCard].question}
      </div>

      <input
        type="text"
        placeholder="Enter your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />

      <button onClick={checkAnswer}>
        Submit Guess
      </button>

      <h2>{result}</h2>
      <h3>Current Streak: {currentCounter}</h3>
      <h3>Longest Streak: {longestCounter}</h3>

      <button onClick={prevCard} disabled={currentCard === 0}>
        Previous
      </button>

      <button onClick={nextCard}>
        Next
      </button>
    </div>
  );
};

export default App;