import HeaderSection from "../components/HeaderSection";
import AttentionRequired from "../components/AttentionRequired";
import LeadFunnel from "../components/LeadFunnel";

const Dashboard = () => {
  return (
    <div className="min-h-full bg-[#F8F9FA] p-4 sm:p-6">
      <HeaderSection />

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <AttentionRequired />
        </div>
        <div className="lg:col-span-2">
          <LeadFunnel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
