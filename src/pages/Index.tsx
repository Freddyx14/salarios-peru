
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SalarySearch from '@/components/SalarySearch';
import SalaryResults from '@/components/SalaryResults';
import { searchSalaries, saveSearchHistory } from '@/services/salaryService';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { History, LogOut, Bookmark } from 'lucide-react';
import JobAlert from '@/components/JobAlert';
import { SalaryData } from '@/types/appTypes';

const Index = () => {
  const [filteredResults, setFilteredResults] = useState<SalaryData[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async (position: string, company: string) => {
    setIsLoading(true);
    setSearchPerformed(true);
    
    try {
      // Guardar en el historial solo si al menos uno de los campos tiene valor
      if (authState.user && (position || company)) {
        await saveSearchHistory(authState.user.id, position, company);
      }
      
      const results = await searchSalaries(position, company);
      setFilteredResults(results);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
      toast({
        title: "Error en la búsqueda",
        description: "Ocurrió un problema al buscar la información. Inténtalo de nuevo.",
        variant: "destructive"
      });
      setFilteredResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/594e2d90-4bd5-4959-92c8-3bf7651bd3da.png" 
              alt="Salarios Perú Logo" 
              className="h-16 md:h-20 mr-4"
            />
            <div>
              <h1 className="text-4xl font-bold text-blue-800 font-serif">Salarios Profesionales en Perú 2025</h1>
              <p className="text-blue-600 text-lg">Explora información actualizada sobre salarios en el mercado laboral peruano</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="flex items-center border-blue-300"
              onClick={() => navigate('/trabajos-guardados')}
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Trabajos Guardados
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center border-blue-300"
              onClick={() => navigate('/historial')}
            >
              <History className="mr-2 h-4 w-4" />
              Historial
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center border-blue-300"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-200 mb-10">
          <SalarySearch onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        <SalaryResults 
          results={filteredResults}
          searchPerformed={searchPerformed}
          isLoading={isLoading}
        />
      </div>
      
      <JobAlert />
    </div>
  );
};

export default Index;
