
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export interface SalaryData {
  id: string;
  company: string;
  position: string;
  salary: string;
  bachelorsUniversity: string;
  mastersUniversity: string;
}

interface SalaryResultsProps {
  results: SalaryData[];
  searchPerformed: boolean;
}

const SalaryResults: React.FC<SalaryResultsProps> = ({ results, searchPerformed }) => {
  if (!searchPerformed) {
    return null;
  }
  
  if (results.length === 0) {
    return (
      <Card className="w-full mt-4 bg-white border-blue-200 overflow-hidden rounded-xl">
        <CardContent className="p-10 flex flex-col items-center justify-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <Search className="h-10 w-10 text-blue-500" />
          </div>
          <p className="text-center text-blue-800 text-lg">No se encontraron resultados para tu búsqueda.</p>
          <p className="text-center text-blue-600 mt-2">Intenta con otros términos o amplía tus criterios de búsqueda.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-800 flex items-center font-serif">
          <Badge className="mr-3 bg-blue-600 text-white text-sm py-1 px-3 hover:bg-blue-700">
            {results.length}
          </Badge>
          {results.length === 1 ? 'Puesto encontrado' : 'Puestos encontrados'}
        </h2>
      </div>
      
      <Card className="w-full overflow-hidden bg-white border-blue-200 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="text-blue-600">
              Información de salarios actualizada al 2025
            </TableCaption>
            <TableHeader className="bg-blue-50">
              <TableRow className="border-b border-blue-200">
                <TableHead className="font-bold text-blue-800">Empresa</TableHead>
                <TableHead className="font-bold text-blue-800">Puesto</TableHead>
                <TableHead className="font-bold text-blue-800">Salario mensual</TableHead>
                <TableHead className="font-bold text-blue-800">Universidad (Bachiller)</TableHead>
                <TableHead className="font-bold text-blue-800">Universidad (Master)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((item) => (
                <TableRow key={item.id} className="hover:bg-blue-50 border-b border-blue-100">
                  <TableCell className="font-medium text-blue-800">{item.company}</TableCell>
                  <TableCell className="text-blue-700">{item.position}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900">
                      {item.salary}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-blue-700">{item.bachelorsUniversity || '-'}</TableCell>
                  <TableCell className="text-blue-700">{item.mastersUniversity || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default SalaryResults;
