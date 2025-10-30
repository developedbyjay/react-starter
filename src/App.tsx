import { useState } from "react";

function App() {
  const [count, setCount] = useState("");

  return (
    <div className="bg-green-300 h-screen w-full">
      <input value={count} onChange={(e) => setCount(e.target.value)} />
    </div>
  );
}

export default App;
