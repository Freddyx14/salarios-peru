
import React, { useEffect, useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getSearchHistory, deleteSearchHistory } from "@/services/salaryService";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History, Search, Loader2, Trash2 } from "lucide-react";
import { SearchHistoryItem } from '@/types/appTypes';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const SearchHistory = () => {
  const { authState } = useAuth();
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadHistory = async () => {
      if (!authState.user) return;
      
      try {
        const data = await getSearchHistory(authState.user.id);
        setHistory(data);
      } catch (error) {
        console.error("Error al cargar historial:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadHistory();
  }, [authState.user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-PE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDeleteHistory = async () => {
    if (!authState.user) return;
    
    setIsDeleting(true);
    try {
      await deleteSearchHistory(authState.user.id);
      setHistory([]);
      toast({
        title: "Historial eliminado",
        description: "Tu historial de búsquedas ha sido eliminado correctamente.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error al eliminar historial:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el historial de búsquedas. Intenta nuevamente.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-800 font-serif flex items-center">
            <History className="mr-2 h-6 w-6" />
            Historial de Búsquedas
          </h1>
          
          <div className="flex gap-3">
            {history.length > 0 && (
              <Button 
                variant="outline" 
                className="flex items-center border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700" 
                onClick={() => setShowDeleteDialog(true)}
                disabled={isDeleting || loading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Borrar Historial
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="flex items-center border-blue-300" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Búsqueda
            </Button>
          </div>
        </div>

        <Card className="bg-white bg-opacity-80 backdrop-blur-sm border-blue-200 shadow-lg">
          {loading ? (
            <CardContent className="p-10 flex flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
              <p className="text-center text-blue-800 text-lg">Cargando historial...</p>
            </CardContent>
          ) : history.length === 0 ? (
            <CardContent className="p-10 flex flex-col items-center justify-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Search className="h-10 w-10 text-blue-500" />
              </div>
              <p className="text-center text-blue-800 text-lg">No tienes búsquedas recientes</p>
              <p className="text-center text-blue-600 mt-2">Realiza búsquedas para verlas aquí</p>
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-xl text-blue-700">
                  <Badge className="mr-2 bg-blue-600 text-white">
                    {history.length}
                  </Badge>
                  Búsquedas realizadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>Tu historial de búsquedas de salarios</TableCaption>
                    <TableHeader className="bg-blue-50">
                      <TableRow className="border-b border-blue-200">
                        <TableHead className="font-bold text-blue-800">Fecha</TableHead>
                        <TableHead className="font-bold text-blue-800">Puesto</TableHead>
                        <TableHead className="font-bold text-blue-800">Empresa</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.map((item) => (
                        <TableRow key={item.id} className="hover:bg-blue-50 border-b border-blue-100">
                          <TableCell className="font-medium text-blue-800">
                            {formatDate(item.search_date)}
                          </TableCell>
                          <TableCell className="text-blue-700">
                            {item.position_query || <span className="text-gray-400">No especificado</span>}
                          </TableCell>
                          <TableCell className="text-blue-700">
                            {item.company_query || <span className="text-gray-400">No especificado</span>}
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

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="border-red-100">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600">¿Borrar todo el historial?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará permanentemente todo tu historial de búsquedas. 
                Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDeleteHistory}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" /> 
                    Borrar Historial
                  </>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SearchHistory;
