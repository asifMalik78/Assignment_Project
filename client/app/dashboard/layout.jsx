import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

function Dashboard({ children }) {
  return (
    <main className="grid w-full h-screen grid-cols-[0.42fr_1.5fr] max-w-[96rem] mx-auto">
      <Sidebar />
      <main className="overflow-y-auto">
        <Navbar />
        {children}
      </main>
    </main>
  );
}

export default Dashboard;
