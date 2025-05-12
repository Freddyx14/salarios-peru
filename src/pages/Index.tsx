
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-800 mb-3 font-serif">Salarios Profesionales en Perú 2025</h1>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-green-700 text-xl max-w-2xl mx-auto">Explora información actualizada sobre salarios según puesto y empresa en el mercado laboral peruano</p>
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
