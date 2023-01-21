import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-screen grid place-content-center">
      <span className="text-3xl font-bold underline ">init config</span>
    </div>
  );
}

export default App;
