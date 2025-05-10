
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
      <Card className="w-full mt-4">
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">No se encontraron resultados para tu búsqueda.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{results.length} puesto(s) encontrado(s)</h2>
      </div>
      
      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Lista de salarios encontrados según tu búsqueda</TableCaption>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-medium">Empresa</TableHead>
                <TableHead className="font-medium">Puesto</TableHead>
                <TableHead className="font-medium">Salario mensual</TableHead>
                <TableHead className="font-medium">Universidad (Bachiller)</TableHead>
                <TableHead className="font-medium">Universidad (Master)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.company}</TableCell>
                  <TableCell>{item.position}</TableCell>
                  <TableCell>{item.salary}</TableCell>
                  <TableCell>{item.bachelorsUniversity || '-'}</TableCell>
                  <TableCell>{item.mastersUniversity || '-'}</TableCell>
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
