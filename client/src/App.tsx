import { Outlet } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

function App() {
  return (
    <div className="container mx-auto flex min-h-[95vh] flex-col items-center justify-between bg-white bg-gradient-to-tl from-stone-300 to-indigo-100 p-4 px-6 shadow-lg shadow-slate-700">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
