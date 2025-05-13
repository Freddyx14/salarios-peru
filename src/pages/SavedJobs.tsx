
import React, { useEffect, useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getSavedJobs, deleteSavedJob } from "@/services/salaryService";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, Loader2, Search, Trash2 } from "lucide-react";
import { SalaryData } from '@/types/appTypes';
import { useToast } from '@/hooks/use-toast';

const SavedJobs = () => {
  const { authState } = useAuth();
  const [savedJobs, setSavedJobs] = useState<SalaryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadSavedJobs = async () => {
      if (!authState.user) return;
      
      try {
        const data = await getSavedJobs(authState.user.id);
        setSavedJobs(data);
      } catch (error) {
        console.error("Error al cargar trabajos guardados:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los trabajos guardados. Intenta nuevamente.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadSavedJobs();
  }, [authState.user, toast]);

  const handleDeleteJob = async (jobId: string) => {
    if (!authState.user) return;
    
    setDeletingId(jobId);
    try {
      const success = await deleteSavedJob(authState.user.id, jobId);
      if (success) {
        setSavedJobs(savedJobs.filter(job => job.id !== jobId));
        toast({
          title: "Trabajo eliminado",
          description: "El trabajo ha sido eliminado de tus guardados",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error al eliminar trabajo guardado:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el trabajo. Intenta nuevamente.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-800 font-serif flex items-center">
            <Bookmark className="mr-2 h-6 w-6" />
            Trabajos Guardados
          </h1>
          
          <Button 
            variant="outline" 
            className="flex items-center border-blue-300" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Búsqueda
          </Button>
        </div>

        <Card className="bg-white bg-opacity-80 backdrop-blur-sm border-blue-200 shadow-lg">
          {loading ? (
            <CardContent className="p-10 flex flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
              <p className="text-center text-blue-800 text-lg">Cargando trabajos guardados...</p>
            </CardContent>
          ) : savedJobs.length === 0 ? (
            <CardContent className="p-10 flex flex-col items-center justify-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Bookmark className="h-10 w-10 text-blue-500" />
              </div>
              <p className="text-center text-blue-800 text-lg">No tienes trabajos guardados</p>
              <p className="text-center text-blue-600 mt-2">Guarda trabajos para verlos aquí</p>
              <Button 
                className="mt-6"
                onClick={() => navigate('/')}
              >
                Buscar trabajos
              </Button>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-xl text-blue-700">
                  <Badge className="mr-2 bg-blue-600 text-white">
                    {savedJobs.length}
                  </Badge>
                  {savedJobs.length === 1 ? 'Trabajo guardado' : 'Trabajos guardados'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>Tus oportunidades laborales guardadas</TableCaption>
                    <TableHeader className="bg-blue-50">
                      <TableRow className="border-b border-blue-200">
                        <TableHead className="font-bold text-blue-800">Empresa</TableHead>
                        <TableHead className="font-bold text-blue-800">Puesto</TableHead>
                        <TableHead className="font-bold text-blue-800">Salario mensual</TableHead>
                        <TableHead className="font-bold text-blue-800">Universidad (Bachiller)</TableHead>
                        <TableHead className="font-bold text-blue-800">Universidad (Master)</TableHead>
                        <TableHead className="font-bold text-blue-800 text-center">Acción</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {savedJobs.map((job) => (
                        <TableRow key={job.id} className="hover:bg-blue-50 border-b border-blue-100">
                          <TableCell className="font-medium text-blue-800">{job.company}</TableCell>
                          <TableCell className="text-blue-700">{job.position}</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900">
                              {job.salary}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-blue-700">{job.bachelors_university || '-'}</TableCell>
                          <TableCell className="text-blue-700">{job.masters_university || '-'}</TableCell>
                          <TableCell className="text-center">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-red-300 hover:bg-red-50 hover:text-red-700 text-red-600"
                              onClick={() => handleDeleteJob(job.id)}
                              disabled={deletingId === job.id}
                            >
                              {deletingId === job.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SavedJobs;
