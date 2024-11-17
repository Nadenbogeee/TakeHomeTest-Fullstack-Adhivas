import { Toaster } from "sonner";
import WebRoutes from "./routes/WebRoutes";
function App() {
  return (
    <>
      <Toaster position="top-left" duration={3000} theme="light" toastOptions={{ style: { background: "orange", color: "white" } }} />
      <WebRoutes />
    </>
  );
}

export default App;
