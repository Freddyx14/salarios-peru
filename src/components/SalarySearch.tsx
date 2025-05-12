
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SalarySearchProps {
  onSearch: (position: string, company: string) => void;
}

const SalarySearch: React.FC<SalarySearchProps> = ({ onSearch }) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(position, company);
  };

  return (
    <Card className="bg-white shadow-xl border-green-200 mb-10 overflow-hidden transform hover:shadow-2xl transition-all duration-300 rounded-2xl">
      <div className="bg-gradient-to-r from-green-600 to-green-500 p-5">
        <h2 className="text-white text-2xl font-bold flex items-center">
          <Search className="mr-2 h-6 w-6" strokeWidth={2} />
          Buscar Salarios
        </h2>
        <p className="text-green-50 text-sm mt-1">
          Encuentra información precisa sobre compensaciones en el mercado laboral
        </p>
      </div>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="position" className="text-green-800 font-medium flex items-center">
                Puesto
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-2">
                  Requerido
                </span>
              </label>
              <Input 
                id="position" 
                placeholder="Ej: Gerente, Analista, Desarrollador" 
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="border-green-200 focus-visible:ring-green-500"
              />
              <p className="text-xs text-green-600">Ingresa el nombre del puesto laboral</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-green-800 font-medium flex items-center">
                Empresa
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-2">
                  Opcional
                </span>
              </label>
              <Input 
                id="company" 
                placeholder="Ej: BCP, IBM, Google" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="border-green-200 focus-visible:ring-green-500"
              />
              <p className="text-xs text-green-600">Puedes filtrar por nombre de empresa</p>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button 
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-lg px-6 py-2 h-auto"
            >
              Buscar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SalarySearch;
