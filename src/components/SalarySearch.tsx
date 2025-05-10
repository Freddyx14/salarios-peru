
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SalarySearchProps {
  onSearch: (position: string, company: string) => void;
}

const SalarySearch: React.FC<SalarySearchProps> = ({ onSearch }) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');

  const handleSearch = () => {
    onSearch(position, company);
  };

  return (
    <div className="w-full bg-indigo-950 rounded-xl p-8 mb-8 shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-6">Buscar Salarios</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="position" className="text-white">Puesto</label>
          <Input 
            id="position" 
            placeholder="Ej: Gerente, Analista, Desarrollador" 
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="bg-white"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-white">Empresa</label>
          <Input 
            id="company" 
            placeholder="Ej: BCP, IBM, Google" 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="bg-white"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button 
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default SalarySearch;
