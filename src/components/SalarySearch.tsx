
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, ChevronsUpDown } from "lucide-react";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAvailablePositions, getAvailableCompanies } from '@/services/salaryService';
import { cn } from '@/lib/utils';

export interface SalarySearchProps {
  onSearch: (position: string, company: string) => void;
  isLoading?: boolean;
}

const SalarySearch: React.FC<SalarySearchProps> = ({ onSearch, isLoading = false }) => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [positionOptions, setPositionOptions] = useState<string[]>([]);
  const [companyOptions, setCompanyOptions] = useState<string[]>([]);
  const [openPosition, setOpenPosition] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);

  // Cargar opciones de posiciones
  useEffect(() => {
    const loadPositionOptions = async () => {
      const options = await getAvailablePositions(position);
      setPositionOptions(options);
    };
    loadPositionOptions();
  }, [position]);

  // Cargar opciones de empresas
  useEffect(() => {
    const loadCompanyOptions = async () => {
      const options = await getAvailableCompanies(company);
      setCompanyOptions(options);
    };
    loadCompanyOptions();
  }, [company]);

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
          <Popover open={openPosition} onOpenChange={setOpenPosition}>
            <PopoverTrigger asChild>
              <div className="flex items-center">
                <Input 
                  id="position" 
                  placeholder="Ej: Gerente, Analista, Desarrollador" 
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="border-blue-200 focus-visible:ring-blue-500 w-full pr-10"
                />
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  className="ml-[-40px] h-9"
                  onClick={() => setOpenPosition(!openPosition)}
                >
                  <ChevronsUpDown className="h-4 w-4 opacity-70" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 w-[300px] h-[300px]">
              <Command>
                <CommandInput 
                  placeholder="Buscar puesto..." 
                  value={position} 
                  onValueChange={setPosition}
                />
                <CommandList>
                  <CommandEmpty>No se encontraron resultados</CommandEmpty>
                  <CommandGroup>
                    {positionOptions.map((opt) => (
                      <CommandItem 
                        key={opt} 
                        value={opt}
                        onSelect={(currentValue) => {
                          setPosition(currentValue);
                          setOpenPosition(false);
                        }}
                      >
                        {opt}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="company" className="text-blue-800 font-medium flex items-center">
            Empresa
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded ml-2">
              Opcional
            </span>
          </label>
          <Popover open={openCompany} onOpenChange={setOpenCompany}>
            <PopoverTrigger asChild>
              <div className="flex items-center">
                <Input 
                  id="company" 
                  placeholder="Ej: BCP, IBM, Google" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="border-blue-200 focus-visible:ring-blue-500 w-full pr-10"
                />
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  className="ml-[-40px] h-9"
                  onClick={() => setOpenCompany(!openCompany)}
                >
                  <ChevronsUpDown className="h-4 w-4 opacity-70" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 w-[300px] h-[300px]">
              <Command>
                <CommandInput 
                  placeholder="Buscar empresa..." 
                  value={company} 
                  onValueChange={setCompany}
                />
                <CommandList>
                  <CommandEmpty>No se encontraron resultados</CommandEmpty>
                  <CommandGroup>
                    {companyOptions.map((opt) => (
                      <CommandItem 
                        key={opt} 
                        value={opt}
                        onSelect={(currentValue) => {
                          setCompany(currentValue);
                          setOpenCompany(false);
                        }}
                      >
                        {opt}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 h-10"
            disabled={isLoading}
          >
            {isLoading ? 'Buscando...' : 'Buscar'}
            {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SalarySearch;
