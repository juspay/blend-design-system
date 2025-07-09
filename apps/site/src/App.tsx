import { Snackbar } from "blend-v1";
import SidebarDemo from "./demos/SidebarDemo";

function App() {
  return (
    <main className="w-screen min-h-screen bg-gray-100 flex items-center justify-center">
      <Snackbar />
      <SidebarDemo />
    </main>
  );
}

export default App;
