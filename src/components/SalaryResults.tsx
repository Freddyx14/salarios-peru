
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
      <Card className="w-full mt-4 bg-white border-green-200 overflow-hidden rounded-xl">
        <CardContent className="p-10 flex flex-col items-center justify-center">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <Search className="h-10 w-10 text-green-600" />
          </div>
          <p className="text-center text-green-800 text-lg">No se encontraron resultados para tu búsqueda.</p>
          <p className="text-center text-green-600 mt-2">Intenta con otros términos o amplía tus criterios de búsqueda.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-800 flex items-center">
          <Badge className="mr-3 bg-green-600 text-white text-sm py-1 px-3 hover:bg-green-700">
            {results.length}
          </Badge>
          {results.length === 1 ? 'Puesto encontrado' : 'Puestos encontrados'}
        </h2>
      </div>
      
      <Card className="w-full overflow-hidden bg-white border-green-200 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="text-green-600">
              Información de salarios actualizada al 2025
            </TableCaption>
            <TableHeader className="bg-green-50">
              <TableRow className="border-b border-green-200">
                <TableHead className="font-bold text-green-800">Empresa</TableHead>
                <TableHead className="font-bold text-green-800">Puesto</TableHead>
                <TableHead className="font-bold text-green-800">Salario mensual</TableHead>
                <TableHead className="font-bold text-green-800">Universidad (Bachiller)</TableHead>
                <TableHead className="font-bold text-green-800">Universidad (Master)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((item) => (
                <TableRow key={item.id} className="hover:bg-green-50 border-b border-green-100">
                  <TableCell className="font-medium text-green-800">{item.company}</TableCell>
                  <TableCell className="text-green-700">{item.position}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900">
                      {item.salary}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-green-700">{item.bachelorsUniversity || '-'}</TableCell>
                  <TableCell className="text-green-700">{item.mastersUniversity || '-'}</TableCell>
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
