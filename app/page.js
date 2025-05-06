import TopNav from "@/app/components/TopNav";
import StatsGrid from "@/app/components/home/StatsGrid";
import TransactionSections from "@/app/components/home/TransactionSections";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 ">
      <TopNav />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-8 ">
        <StatsGrid />
        <TransactionSections />
      </main>
      <Footer />
    </div>
  );
}
