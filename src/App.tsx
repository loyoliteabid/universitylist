import "./App.css";
import AppRoutes from "./routes/Route";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-bright-blue-10">
      <div className="max-w-screen-xl">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
