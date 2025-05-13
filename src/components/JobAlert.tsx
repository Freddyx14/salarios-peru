
import React, { useEffect, useState } from 'react';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { getRandomSalary, saveJob } from '@/services/salaryService';
import { SalaryData } from '@/types/appTypes';
import { Briefcase, Bookmark, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const JobAlert = () => {
  const [showToast, setShowToast] = useState(false);
  const [jobData, setJobData] = useState<SalaryData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { authState } = useAuth();
  const { toast } = useToast();

  // Fetch and display a random job every minute
  useEffect(() => {
    const fetchRandomJob = async () => {
      const job = await getRandomSalary();
      if (job) {
        setJobData(job);
        setIsSaved(false); // Reset saved state for new job
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

  const handleSaveJob = async () => {
    if (!authState.user || !jobData) return;
    
    setIsSaving(true);
    try {
      const success = await saveJob(authState.user.id, jobData.id);
      if (success) {
        setIsSaved(true);
        toast({
          title: "Trabajo guardado",
          description: `Has guardado la oferta de ${jobData.position} en ${jobData.company}`,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error al guardar trabajo:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el trabajo. Intenta nuevamente.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!showToast || !jobData) {
    return null;
  }

  return (
    <ToastProvider>
      <Toast open={showToast} onOpenChange={setShowToast} className="bg-white border-blue-300 w-auto max-w-md">
        <div className="flex items-start gap-3 w-full">
          <div className="bg-blue-100 p-2 rounded-full shrink-0">
            <Briefcase className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <ToastTitle className="text-blue-800 font-semibold">
              ¡Oportunidad de empleo!
            </ToastTitle>
            <ToastDescription className="text-blue-700 mt-1">
              <span className="font-medium">{jobData.company}</span> está contratando {" "}
              <span className="font-medium">{jobData.position}</span> con un salario de{" "}
              <span className="font-medium">{jobData.salary}</span>
            </ToastDescription>
            <div className="mt-3">
              <Button 
                size="sm" 
                variant={isSaved ? "default" : "outline"} 
                className={`flex items-center ${isSaved ? 'bg-green-600 hover:bg-green-700' : 'border-blue-300'}`}
                onClick={handleSaveJob}
                disabled={isSaving || isSaved}
              >
                {isSaved ? (
                  <>
                    <Check className="mr-1 h-4 w-4" /> 
                    Guardado
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-1 h-4 w-4" /> 
                    Guardar puesto
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport className="bottom-0 right-0" />
    </ToastProvider>
  );
};

export default JobAlert;
