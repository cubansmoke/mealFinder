import { useState } from "react";

function Button() {
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      setQuery((prev) => [...prev, input.trim()]);
      setInput("");
    }
  };

  const handleClear = (indexToRemove: number) => {
    setQuery((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div>
      <input
        type="search"
        className="rounded-3xl"
        placeholder="Enter here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div>
        {query.map((item, i) => (
          <div className="block">
            <p className="inline pe-5" key={i}>
              {item}
            </p>
            <button
              className="inline"
              type="button"
              onClick={() => handleClear(i)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      {input}
    </div>
  );
}

export default Button;
