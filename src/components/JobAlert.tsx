
import React, { useEffect, useState } from 'react';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { getRandomSalary } from '@/services/salaryService';
import { SalaryData } from '@/types/appTypes';
import { Briefcase } from 'lucide-react';

const JobAlert = () => {
  const [showToast, setShowToast] = useState(false);
  const [jobData, setJobData] = useState<SalaryData | null>(null);

  // Fetch and display a random job every minute
  useEffect(() => {
    const fetchRandomJob = async () => {
      const job = await getRandomSalary();
      if (job) {
        setJobData(job);
        setShowToast(true);
        // Hide toast after 10 seconds
        setTimeout(() => setShowToast(false), 10000);
      }
    };

    // Initial fetch after 15 seconds to let the app load first
    const initialTimeout = setTimeout(fetchRandomJob, 15000);
    
    // Then fetch every minute
    const interval = setInterval(fetchRandomJob, 60000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!showToast || !jobData) {
    return null;
  }

  return (
    <ToastProvider>
      <Toast open={showToast} onOpenChange={setShowToast} className="bg-white border-blue-300">
        <div className="flex items-start gap-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <Briefcase className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <ToastTitle className="text-blue-800 font-semibold">
              ¡Oportunidad de empleo!
            </ToastTitle>
            <ToastDescription className="text-blue-700 mt-1">
              <span className="font-medium">{jobData.company}</span> está contratando {" "}
              <span className="font-medium">{jobData.position}</span> con un salario de{" "}
              <span className="font-medium">{jobData.salary}</span>
            </ToastDescription>
          </div>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport className="bottom-0 right-0" />
    </ToastProvider>
  );
};

export default JobAlert;
