'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Topbar from '../../../components/Topbar';
import ContentArea from '../../../components/ContentArea';

import type { TabType } from '../../../components/ContentArea'; // ✅ Make sure TabType includes 'addItemCategory'

export default function VendorDashboardLayout() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [storeExists, setStoreExists] = useState(false);

  useEffect(() => {
    const checkStore = () => {
      const userID = localStorage.getItem("userID");
      console.log("userID in layout after timeout:", userID);
  
      if (userID) {
        fetch(`/api/check-existing-store?userID=${userID}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("check-existing-store response:", data);
            setStoreExists(data.exists);
          })
          .catch((err) => console.error("Store check error:", err));
      }
    };
  
    setTimeout(checkStore, 200);
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab); // ✅ Fixes TS error with function type
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange} // ✅ wrap setActiveTab in custom function
        storeExists={storeExists}
      />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <ContentArea activeTab={activeTab} setActiveTab={handleTabChange} /> {/* ✅ fix TS error */}
        </main>
      </div>
    </div>
  );
}
