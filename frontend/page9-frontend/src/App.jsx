import Sidebar from "./components/Sidebar";
import VerifyTable from "./components/VerifyTable";

export default function App() {
  return (
    <div className="flex min-h-screen bg-[#f7f8fc]">
      <Sidebar />

      <main className="flex-1 p-10">
        <h1 className="text-5xl font-bold mb-8">
          Verify <span className="text-indigo-500">Credentials</span>
        </h1>

        <VerifyTable />
      </main>
    </div>
  );
}