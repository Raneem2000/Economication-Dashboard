import Row from "../ui/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../ui/Spinner";
function Dashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Row type="horizontal">
      <DashboardLayout />
    </Row>
  );
}

export default Dashboard;
