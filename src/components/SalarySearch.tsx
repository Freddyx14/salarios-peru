
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

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
    <div>
      <h2 className="text-2xl font-serif font-bold text-blue-700 mb-4 flex items-center">
        <Search className="mr-2 h-6 w-6 text-blue-500" strokeWidth={2} />
        Buscar Salarios
      </h2>
      <p className="text-blue-600 text-sm mb-5">
        Encuentra información precisa sobre compensaciones en el mercado laboral peruano
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-4 items-end">
        <div className="space-y-2">
          <label htmlFor="position" className="text-blue-800 font-medium flex items-center">
            Puesto
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded ml-2">
              Requerido
            </span>
          </label>
          <Input 
            id="position" 
            placeholder="Ej: Gerente, Analista, Desarrollador" 
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border-blue-200 focus-visible:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-blue-800 font-medium flex items-center">
            Empresa
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded ml-2">
              Opcional
            </span>
          </label>
          <Input 
            id="company" 
            placeholder="Ej: BCP, IBM, Google" 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border-blue-200 focus-visible:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 h-10"
          >
            Buscar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SalarySearch;
