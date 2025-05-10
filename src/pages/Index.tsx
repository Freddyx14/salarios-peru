
import React, { useState } from 'react';
import SalarySearch from '@/components/SalarySearch';
import SalaryResults, { SalaryData } from '@/components/SalaryResults';
import { salaryData } from '@/data/salaryData';

const Index = () => {
  const [filteredResults, setFilteredResults] = useState<SalaryData[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (position: string, company: string) => {
    setSearchPerformed(true);
    
    const results = salaryData.filter(item => {
      const matchesPosition = position === '' || 
        item.position.toLowerCase().includes(position.toLowerCase());
      const matchesCompany = company === '' || 
        item.company.toLowerCase().includes(company.toLowerCase());
      
      return matchesPosition && matchesCompany;
    });
    
    setFilteredResults(results);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Salarios de Profesionales en Perú 2025</h1>
          <p className="text-gray-600 text-lg">Encuentra información actualizada sobre salarios según puesto y empresa</p>
        </div>
        
        <SalarySearch onSearch={handleSearch} />
        
        <SalaryResults 
          results={filteredResults}
          searchPerformed={searchPerformed}
        />
      </div>
    </div>
  );
};

export default Index;
