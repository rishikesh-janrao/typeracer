import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const paragraph = "This is a test sentence!";
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pText, setPText] = useState(paragraph);

  const handleInput = (e) => {
    setTypedText((prev) => (prev.length !== paragraph ? e.target.value : prev));
  };
  const computeText = () => {
    const tText = typedText.length > 0 ? typedText.split(" ") : [];
    const parText = paragraph.split(" ");
    const newtext = parText
      .map((word, index) => {
        if (word === tText[index]) {
          return `<span class="valid-word">${word}</span>`;
        } else {
          return `<span class="invalid-word">${word}</span>`;
        }
      })
      .join(" ");
    setPText(newtext);
  };

  useEffect(() => {
    if (isTyping) {
      computeText();
    }
  }, [isTyping, typedText]);

  return (
    <div className="App">
      <header className="App-header">
        <div className={`container ${isTyping ? "container--active" : ""}`}>
          <p dangerouslySetInnerHTML={{ __html: pText }}></p>
        </div>
        <textarea
          type="text"
          onChange={handleInput}
          onFocus={() => setIsTyping(true)}
          onBlur={() => {
            computeText();
            setIsTyping(false);
          }}
          autoFocus
        />
      </header>
    </div>
  );
}

export default App;
