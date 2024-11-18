import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SetupPage from "./pages/SetupPage";
import TodoPage from "./pages/TodoPage";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <ToastProvider>
      <Router
        future={{
          // @ts-ignore
          v7_relativeSplatPath: true,
          v7_startTransition: true
        }}
      >
        <Routes>
          <Route path="/" element={<SetupPage />} />
          <Route path="/todos" element={<TodoPage />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
};

export default App;
