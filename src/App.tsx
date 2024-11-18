// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetupPage from "./pages/SetupPage";
import TodoPage from "./pages/TodoPage";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SetupPage />} />
          <Route path="/todos" element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
