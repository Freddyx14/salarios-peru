
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <img 
            src="/lovable-uploads/594e2d90-4bd5-4959-92c8-3bf7651bd3da.png" 
            alt="Salarios Perú Logo" 
            className="h-16 md:h-20 mr-4"
          />
          <div>
            <h1 className="text-4xl font-bold text-blue-800 font-serif">Salarios Profesionales en Perú 2025</h1>
            <p className="text-blue-600 text-lg">Explora información actualizada sobre salarios en el mercado laboral peruano</p>
          </div>
        </div>
        
        <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-200 mb-10">
          <SalarySearch onSearch={handleSearch} />
        </div>
        
        <SalaryResults 
          results={filteredResults}
          searchPerformed={searchPerformed}
        />
      </div>
    </div>
  );
};

export default Index;
