"use client"
import { useState } from 'react';
import { divisionsData } from '../../../../_components/Divisions';
import { ChevronDown, ChevronUp, MapPin, Search } from 'lucide-react';



const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDivisions, setExpandedDivisions] = useState(
    divisionsData.map(d => d.name)
  );

  const toggleDivision = (divisionName) => {
    setExpandedDivisions(prev =>
      prev.includes(divisionName)
        ? prev.filter(d => d !== divisionName)
        : [...prev, divisionName]
    );
  };

  const filteredDivisions = divisionsData
    .map(division => ({
      ...division,
      zillas: division.zillas.filter(
        zilla =>
          zilla.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          zilla.nameBn.includes(searchTerm) ||
          zilla.upazillas.some(u =>
            u.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    }))
    .filter(division => division.zillas.length > 0);

  const totalDistricts = divisionsData.reduce((acc, d) => acc + d.zillas.length, 0);
  const totalUpazillas = divisionsData.reduce(
    (acc, d) => acc + d.zillas.reduce((a, z) => a + z.upazillas.length, 0),
    0
  );

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2  px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Administrative Structure
          </div>
          <h1 className="text-xl md:text-4xl font-bold  mb-3">
            All of Divisions & Districts We Operate
          </h1>
          <p className=" max-w-2xl mx-auto">
            Complete list of {divisionsData.length} divisions, {totalDistricts} districts (zillas), and {totalUpazillas}+ upazillas, where we have physical Branch
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search district or upazilla..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-10">
          <div className=" rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-emerald-600">{divisionsData.length}</div>
            <div className="text-sm text-gray-500">Divisions</div>
          </div>
          <div className=" rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-teal-600">{totalDistricts}</div>
            <div className="text-sm text-gray-500">Districts</div>
          </div>
          <div className=" rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-cyan-600">{totalUpazillas}</div>
            <div className="text-sm text-gray-500">Upazillas</div>
          </div>
        </div>

        {/* Divisions List */}
        <div className="space-y-6">
          {filteredDivisions.map(division => {
            const isExpanded = expandedDivisions.includes(division.name);
            return (
              <div
                key={division.name}
                className="rounded shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Division Header */}
                <button
                  onClick={() => toggleDivision(division.name)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-base-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold">{division.name}</h2>
                    <span className="text-emerald-400 text-sm">({division.nameBn})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {division.zillas.length} districts
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Zillas Table */}
                {isExpanded && (
                  <div className="divide-y divide-gray-100">
                    {division.zillas.map(zilla => (
                      <div
                        key={zilla.name}
                        className="px-6 py-4 hover:bg-base-300 transition-colors"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start gap-2 lg:gap-6">
                          <div className="flex items-center gap-2 min-w-[180px] shrink-0">
                            <span className="font-semibold ">
                              {zilla.name}
                            </span>
                            <span className="text-gray-400 text-sm">
                              ({zilla.nameBn})
                            </span>
                          </div>
                          <span className="text-gray-300 hidden lg:block">|</span>
                          <div className="flex flex-wrap gap-1.5">
                            {zilla.upazillas.map((upazilla, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-sm hover:bg-emerald-100 hover:text-emerald-700 transition-colors cursor-default"
                              >
                                {upazilla}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredDivisions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">
              No results found for &quot;{searchTerm}&quot;
            </p>
          </div>
        )}

      
      </div>
    </div>
  );
};

export default Page;
