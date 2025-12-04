import { useState } from "react";
import { generate } from "./api";

function App() {
  const [input, setInput] = useState("");

  const handleAdd = async () => {
    if (!input.trim()) return;

    const result = await generate(input);

    // Copy to clipboard
    navigator.clipboard.writeText(result);

    alert("Output copied to clipboard:\n\n" + result);
  };

  return (
    <div>

      <input
        type="text"
        placeholder="Enter text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default App;
