
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, Check } from 'lucide-react';
import { saveJob, checkIfJobIsSaved, deleteSavedJob } from '@/services/salaryService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SaveJobButtonProps {
  jobId: string;
  company: string;
  position: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
}

const SaveJobButton: React.FC<SaveJobButtonProps> = ({ 
  jobId, 
  company, 
  position,
  variant = "outline", 
  size = "sm",
  showText = true
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { authState } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!authState.user) {
        setIsChecking(false);
        return;
      }
      
      try {
        const saved = await checkIfJobIsSaved(authState.user.id, jobId);
        setIsSaved(saved);
      } catch (error) {
        console.error("Error al verificar estado guardado:", error);
      } finally {
        setIsChecking(false);
      }
    };
    
    checkSavedStatus();
  }, [jobId, authState.user]);

  const handleToggleSave = async () => {
    if (!authState.user) {
      toast({
        title: "Inicia sesión primero",
        description: "Debes iniciar sesión para guardar trabajos",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsLoading(true);
    try {
      let success;
      
      if (isSaved) {
        // Eliminar de guardados
        success = await deleteSavedJob(authState.user.id, jobId);
        if (success) {
          setIsSaved(false);
          toast({
            title: "Trabajo eliminado",
            description: `Has eliminado la oferta de ${position} en ${company} de tus guardados`,
            duration: 3000,
          });
        }
      } else {
        // Guardar trabajo
        success = await saveJob(authState.user.id, jobId);
        if (success) {
          setIsSaved(true);
          toast({
            title: "Trabajo guardado",
            description: `Has guardado la oferta de ${position} en ${company}`,
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.error("Error al cambiar estado de guardado:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) return null;

  return (
    <Button 
      variant={isSaved ? "default" : variant} 
      size={size} 
      onClick={handleToggleSave}
      disabled={isLoading}
      className={isSaved ? "bg-green-600 hover:bg-green-700" : ""}
    >
      {isSaved ? (
        <>
          <Check className="h-4 w-4" />
          {showText && <span className="ml-1">Guardado</span>}
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" />
          {showText && <span className="ml-1">Guardar</span>}
        </>
      )}
    </Button>
  );
};

export default SaveJobButton;
