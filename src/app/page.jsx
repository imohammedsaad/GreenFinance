"use client";
import React from "react";

function MainComponent() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [climateData, setClimateData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [climateRisk, setClimateRisk] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [projectData] = useState([
    {
      id: 1,
      name: "Solar Farm Initiative",
      esgScore: 92,
      roi: 18.5,
      risk: "Low",
      impact: "High",
      budget: 2500000,
      category: "Renewable Energy",
      investors: [
        { name: "John Smith" },
        { name: "Sarah Johnson" },
        { name: "Michael Chen" },
      ],
    },
    {
      id: 2,
      name: "Sustainable Agriculture",
      esgScore: 85,
      roi: 12.2,
      risk: "Medium",
      impact: "Medium",
      budget: 1500000,
      category: "Agriculture",
      investors: [{ name: "Emma Davis" }, { name: "James Wilson" }],
    },
    {
      id: 3,
      name: "Green Building Complex",
      esgScore: 88,
      roi: 15.8,
      risk: "Medium",
      impact: "High",
      budget: 5000000,
      category: "Construction",
      investors: [
        { name: "Robert Taylor" },
        { name: "Lisa Anderson" },
        { name: "David Miller" },
        { name: "Jennifer Lee" },
      ],
    },
    {
      id: 4,
      name: "Wind Farm Project",
      esgScore: 95,
      roi: 16.2,
      risk: "Low",
      impact: "High",
      budget: 3500000,
      category: "Renewable Energy",
      investors: [
        { name: "Alex Wong" },
        { name: "Maria Garcia" },
        { name: "Thomas Brown" },
      ],
    },
    {
      id: 5,
      name: "Ocean Cleanup Initiative",
      esgScore: 98,
      roi: 10.5,
      risk: "High",
      impact: "High",
      budget: 1800000,
      category: "Environmental",
      investors: [{ name: "Patricia Moore" }, { name: "Kevin Zhang" }],
    },
    {
      id: 6,
      name: "Reforestation Program",
      esgScore: 96,
      roi: 11.8,
      risk: "Low",
      impact: "High",
      budget: 900000,
      category: "Environmental",
      investors: [
        { name: "Rachel Green" },
        { name: "Daniel Kim" },
        { name: "Sophie Martin" },
      ],
    },
  ]);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [calculatedReturns, setCalculatedReturns] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const mockClimateData = {
      temperature: 28,
      description: "Global Climate Trends",
      windSpeed: 15,
      regions: [
        {
          name: "North America",
          risk: "Medium",
          temp: 25,
          humidity: 60,
          rainfall: "Moderate",
        },
        {
          name: "South America",
          risk: "High",
          temp: 32,
          humidity: 80,
          rainfall: "Heavy",
        },
        {
          name: "Europe",
          risk: "Low",
          temp: 20,
          humidity: 55,
          rainfall: "Moderate",
        },
        {
          name: "Asia",
          risk: "High",
          temp: 35,
          humidity: 75,
          rainfall: "Variable",
        },
        {
          name: "Africa",
          risk: "High",
          temp: 38,
          humidity: 45,
          rainfall: "Low",
        },
        {
          name: "Oceania",
          risk: "Medium",
          temp: 28,
          humidity: 70,
          rainfall: "High",
        },
      ],
    };
    setClimateData(mockClimateData);
    const risk = calculateClimateRisk(mockClimateData);
    setClimateRisk(risk);
  }, []);

  useEffect(() => {
    const esgMetrics = projectData.map((project) => ({
      name: project.name,
      environmental: project.esgScore * 0.4,
      social: project.esgScore * 0.3,
      governance: project.esgScore * 0.3,
    }));
    setCategoryData(esgMetrics);
  }, [projectData]);

  const calculateClimateRisk = (data) => {
    const tempRisk =
      data.temperature > 30 ? "High" : data.temperature > 25 ? "Medium" : "Low";
    const windRisk =
      data.windSpeed > 20 ? "High" : data.windSpeed > 10 ? "Medium" : "Low";
    return { tempRisk, windRisk };
  };
  const calculateReturns = useCallback(() => {
    if (!investmentAmount || !selectedProjectId) return;
    const project = projectData.find((p) => p.id === selectedProjectId);
    if (!project) return;

    const annualReturn = (investmentAmount * project.roi) / 100;
    const potentialLoss =
      project.risk === "Low"
        ? investmentAmount * 0.05
        : project.risk === "Medium"
        ? investmentAmount * 0.15
        : investmentAmount * 0.25;

    setCalculatedReturns({
      profit: annualReturn,
      loss: potentialLoss,
    });
  }, [investmentAmount, selectedProjectId, projectData]);
  const getInvestmentSuggestions = (region) => {
    const suggestions = {
      "North America": {
        sectors: ["Solar", "Wind", "Green Buildings"],
        risk: "Low to Medium",
        potential: "High",
        climate: "Temperate",
      },
      "South America": {
        sectors: ["Hydroelectric", "Agriculture", "Biodiversity"],
        risk: "Medium to High",
        potential: "Very High",
        climate: "Tropical",
      },
      Europe: {
        sectors: ["Offshore Wind", "Energy Storage", "Smart Cities"],
        risk: "Low",
        potential: "Medium",
        climate: "Mixed",
      },
      Asia: {
        sectors: ["Solar", "Electric Vehicles", "Waste Management"],
        risk: "High",
        potential: "Very High",
        climate: "Varied",
      },
      Africa: {
        sectors: ["Solar", "Agriculture", "Water Management"],
        risk: "High",
        potential: "Very High",
        climate: "Arid",
      },
      Oceania: {
        sectors: ["Solar", "Coastal Protection", "Water Conservation"],
        risk: "Medium",
        potential: "High",
        climate: "Tropical",
      },
    };
    return suggestions[region] || null;
  };

  return (
    <div className="min-h-screen p-6 bg-[#FDF6E3]">
      <div className="max-w-7xl mx-auto relative">
        <header
          className="relative mb-8 bg-cover bg-center rounded-lg overflow-hidden"
          style={{
            backgroundImage:
              "url('https://ucarecdn.com/bbe1454a-fa9b-414a-a26b-bb4e59237f9c/-/format/auto/')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>
          <div className="relative z-10 p-8">
            <h1 className="text-4xl font-bold text-white font-roboto">
              Sustainable Investment Platform
            </h1>
            <p className="text-gray-200 mt-2 font-roboto text-lg">
              Environmental Investment Analytics
            </p>
          </div>
        </header>
        <div className="flex justify-between items-center mb-8 bg-[#FDF6E3]/50 p-4 rounded-lg shadow-sm">
          <div className="text-lg font-semibold text-[#1a3547]">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="text-lg font-semibold text-[#1a3547]">
            {currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-[#1a3547]">
              {currentTime.toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="text-3xl font-bold text-[#2563eb]">
              {currentTime.getDate()}
            </div>
          </div>
        </div>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a3547] font-roboto">
            Sustainable Investment Platform
          </h1>
          <p className="text-[#64748b] mt-2 font-roboto">
            Environmental Investment Analytics
          </p>
        </header>
        <nav className="mb-8 border-b border-[#e2e8f0]">
          <div className="flex space-x-6">
            <button
              onClick={() => setSelectedTab("dashboard")}
              className={`pb-4 px-2 ${
                selectedTab === "dashboard"
                  ? "border-b-2 border-[#2563eb] text-[#2563eb]"
                  : "text-[#64748b]"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab("projects")}
              className={`pb-4 px-2 ${
                selectedTab === "projects"
                  ? "border-b-2 border-[#2563eb] text-[#2563eb]"
                  : "text-[#64748b]"
              }`}
            >
              Investments
            </button>
            <button
              onClick={() => setSelectedTab("analysis")}
              className={`pb-4 px-2 ${
                selectedTab === "analysis"
                  ? "border-b-2 border-[#2563eb] text-[#2563eb]"
                  : "text-[#64748b]"
              }`}
            >
              Risk Assessment
            </button>
          </div>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#FDF6E3]/50 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <i className="fas fa-chart-line text-[#2563eb] text-xl mr-3"></i>
              <h3 className="font-semibold text-[#1a3547]">
                Average ESG Score
              </h3>
            </div>
            <p className="text-3xl font-bold text-[#1a3547]">88.0</p>
            <p className="text-[#64748b] text-sm">+3.2% from last month</p>
          </div>

          <div className="bg-[#FDF6E3]/50 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <i className="fas fa-coin text-[#2563eb] text-xl mr-3"></i>
              <h3 className="font-semibold text-[#1a3547]">Portfolio Value</h3>
            </div>
            <p className="text-3xl font-bold text-[#1a3547]">$15.2M</p>
            <p className="text-[#64748b] text-sm">Across 6 projects</p>
          </div>

          <div className="bg-[#FDF6E3]/50 rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <i className="fas fa-leaf text-[#2563eb] text-xl mr-3"></i>
              <h3 className="font-semibold text-[#1a3547]">Impact Rating</h3>
            </div>
            <p className="text-3xl font-bold text-[#1a3547]">High</p>
            <p className="text-[#64748b] text-sm">5 High Impact Projects</p>
          </div>
        </div>
        <div className="bg-[#FDF6E3]/50 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-6 text-[#1a3547]">
            Project Overview
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-[#e2e8f0]">
                  <th className="text-left pb-4 text-[#64748b] font-semibold">
                    Project Name
                  </th>
                  <th className="text-left pb-4 text-[#64748b] font-semibold">
                    ESG Score
                  </th>
                  <th className="text-left pb-4 text-[#64748b] font-semibold">
                    ROI
                  </th>
                  <th className="text-left pb-4 text-[#64748b] font-semibold">
                    Risk Level
                  </th>
                  <th className="text-left pb-4 text-[#64748b] font-semibold">
                    Impact
                  </th>
                  <th className="text-left pb-4 text-[#64748b] font-semibold">
                    Investors
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectData.map((project) => (
                  <tr key={project.id} className="border-b border-[#e2e8f0]">
                    <td className="py-4">{project.name}</td>
                    <td className="py-4">{project.esgScore}</td>
                    <td className="py-4">{project.roi}%</td>
                    <td className="py-4">{project.risk}</td>
                    <td className="py-4">{project.impact}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <span className="mr-2">{project.investors.length}</span>
                        <div className="text-sm text-[#64748b]">
                          {project.investors
                            .map((investor) => investor.name)
                            .join(", ")}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-[#FDF6E3]/50 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-6 text-[#1a3547]">
            Investment Risk Calculator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1a3547] mb-2">
                  Select Project
                </label>
                <select
                  className="w-full p-2 border border-[#e2e8f0] rounded-lg"
                  value={selectedProjectId || ""}
                  onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                  name="project"
                >
                  <option value="">Choose a project</option>
                  {projectData.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a3547] mb-2">
                  Investment Amount ($)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-[#e2e8f0] rounded-lg"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  name="amount"
                  min="0"
                />
              </div>
              <button
                onClick={calculateReturns}
                className="w-full bg-[#2563eb] text-white py-2 px-4 rounded-lg hover:bg-[#1d4ed8]"
                disabled={!selectedProjectId || !investmentAmount}
              >
                Calculate Returns
              </button>
            </div>
            <div className="bg-[#f8fafb] p-4 rounded-lg">
              {calculatedReturns ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-[#1a3547] mb-2">
                      Potential Annual Returns
                    </h3>
                    <p className="text-2xl font-bold text-green-600">
                      ${calculatedReturns.profit.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a3547] mb-2">
                      Maximum Risk Exposure
                    </h3>
                    <p className="text-2xl font-bold text-red-600">
                      ${calculatedReturns.loss.toLocaleString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-[#64748b]">
                  Enter investment details to see projected returns and risks
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-[#FDF6E3]/50 rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-6 text-[#1a3547]">
            ESG Metrics Comparison
          </h2>
          <div className="overflow-x-auto">
            <div className="min-w-full h-[400px] relative">
              <div className="absolute inset-0 flex">
                <div className="w-16 h-full flex flex-col justify-between text-sm text-[#64748b] pr-2">
                  {[100, 80, 60, 40, 20, 0].map((value) => (
                    <span key={value} className="text-right">
                      {value}%
                    </span>
                  ))}
                </div>
                <div className="flex-1">
                  <div className="h-full border-l border-[#e2e8f0] relative">
                    {[100, 80, 60, 40, 20, 0].map((value) => (
                      <div
                        key={value}
                        className="absolute w-full border-t border-[#e2e8f0]"
                        style={{ top: `${100 - value}%` }}
                      />
                    ))}
                    <div className="absolute inset-0">
                      {categoryData.map((project, index) => (
                        <div
                          key={project.name}
                          className="absolute h-full"
                          style={{
                            left: `${
                              (index * 100) / (categoryData.length - 1)
                            }%`,
                          }}
                        >
                          <div
                            className="relative"
                            style={{ height: `${project.environmental}%` }}
                          >
                            <div
                              className="absolute w-3 h-3 bg-[#22c55e] rounded-full -ml-1.5"
                              style={{ bottom: "0" }}
                            />
                          </div>
                          <div
                            className="relative"
                            style={{ height: `${project.social}%` }}
                          >
                            <div
                              className="absolute w-3 h-3 bg-[#3b82f6] rounded-full -ml-1.5"
                              style={{ bottom: "0" }}
                            />
                          </div>
                          <div
                            className="relative"
                            style={{ height: `${project.governance}%` }}
                          >
                            <div
                              className="absolute w-3 h-3 bg-[#f59e0b] rounded-full -ml-1.5"
                              style={{ bottom: "0" }}
                            />
                          </div>
                          <div className="absolute -bottom-6 transform -translate-x-1/2 text-sm text-[#64748b]">
                            {project.name.split(" ").map((word, i) => (
                              <div key={i} className="whitespace-nowrap">
                                {word}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      {categoryData.length > 1 && (
                        <>
                          <svg className="absolute inset-0 pointer-events-none">
                            <polyline
                              points={categoryData
                                .map(
                                  (project, index) =>
                                    `${
                                      (index * 100) / (categoryData.length - 1)
                                    }% ${100 - project.environmental}%`
                                )
                                .join(" ")}
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth="2"
                            />
                            <polyline
                              points={categoryData
                                .map(
                                  (project, index) =>
                                    `${
                                      (index * 100) / (categoryData.length - 1)
                                    }% ${100 - project.social}%`
                                )
                                .join(" ")}
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="2"
                            />
                            <polyline
                              points={categoryData
                                .map(
                                  (project, index) =>
                                    `${
                                      (index * 100) / (categoryData.length - 1)
                                    }% ${100 - project.governance}%`
                                )
                                .join(" ")}
                              fill="none"
                              stroke="#f59e0b"
                              strokeWidth="2"
                            />
                          </svg>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-16 space-x-8">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#22c55e] rounded-full mr-2" />
                  <span className="text-sm text-[#64748b]">Environmental</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#3b82f6] rounded-full mr-2" />
                  <span className="text-sm text-[#64748b]">Social</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#f59e0b] rounded-full mr-2" />
                  <span className="text-sm text-[#64748b]">Governance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#FDF6E3]/50 rounded-lg p-6 shadow-sm mt-8">
          <h2 className="text-xl font-semibold mb-6 text-[#1a3547]">
            Global Climate Analysis
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#f8fafb] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-globe-americas text-[#2563eb] mr-2"></i>
                  <h3 className="font-semibold">Global Average</h3>
                </div>
                <p className="text-2xl font-bold">28.0°C</p>
                <div className="mt-2 text-sm text-yellow-500">
                  Moderate Risk Level
                </div>
              </div>
              <div className="bg-[#f8fafb] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-temperature-high text-[#2563eb] mr-2"></i>
                  <h3 className="font-semibold">Risk Distribution</h3>
                </div>
                <p className="text-2xl font-bold">50% High Risk Regions</p>
              </div>
              <div className="bg-[#f8fafb] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-chart-line text-[#2563eb] mr-2"></i>
                  <h3 className="font-semibold">Temperature Trend</h3>
                </div>
                <p className="text-2xl font-bold">+1.5°C</p>
                <div className="mt-2 text-sm text-red-500">
                  Above Pre-industrial Levels
                </div>
              </div>
            </div>
            <div className="bg-[#f8fafb] p-4 rounded-lg">
              <h3 className="font-semibold mb-4">World Climate Map</h3>
              <div className="relative w-full h-[400px] bg-[#e5e7eb] rounded-lg overflow-hidden">
                <img
                  src="/world-map.png"
                  alt="World map showing climate risk zones"
                  className="w-full h-full object-cover"
                />
                {climateData?.regions.map((region) => (
                  <div
                    key={region.name}
                    className="absolute p-2 bg-[#FDF6E3]/50 rounded shadow-lg text-sm"
                    style={{
                      top:
                        region.name === "North America"
                          ? "30%"
                          : region.name === "South America"
                          ? "60%"
                          : region.name === "Europe"
                          ? "25%"
                          : region.name === "Asia"
                          ? "35%"
                          : region.name === "Africa"
                          ? "45%"
                          : "70%",
                      left:
                        region.name === "North America"
                          ? "20%"
                          : region.name === "South America"
                          ? "30%"
                          : region.name === "Europe"
                          ? "45%"
                          : region.name === "Asia"
                          ? "70%"
                          : region.name === "Africa"
                          ? "48%"
                          : "80%",
                    }}
                  >
                    <span
                      className={`font-bold ${
                        region.risk === "High"
                          ? "text-red-500"
                          : region.risk === "Medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {region.temp}°C
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#f8fafb] p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Related Readings</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-book text-[#2563eb] mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-medium">
                        Climate Change Impact Report 2025
                      </h4>
                      <p className="text-sm text-[#64748b]">
                        Latest analysis of global climate trends
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-file-alt text-[#2563eb] mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-medium">Regional Risk Assessment</h4>
                      <p className="text-sm text-[#64748b]">
                        Detailed breakdown by geographical zones
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-chart-bar text-[#2563eb] mt-1 mr-3"></i>
                    <div>
                      <h4 className="font-medium">
                        Investment Opportunities in Green Tech
                      </h4>
                      <p className="text-sm text-[#64748b]">
                        Market analysis and forecasts
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-[#f8fafb] p-4 rounded-lg">
                <h3 className="font-semibold mb-4">Key Findings</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-exclamation-circle text-red-500 mt-1 mr-3"></i>
                    <p className="text-sm">
                      High-risk zones concentrated in equatorial regions
                    </p>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-chart-line text-yellow-500 mt-1 mr-3"></i>
                    <p className="text-sm">
                      Accelerating temperature rise in Asia and Africa
                    </p>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                    <p className="text-sm">
                      Moderate risk levels in temperate zones
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#FDF6E3]/50 rounded-lg p-6 shadow-sm mt-8">
          <h2 className="text-xl font-semibold mb-6 text-[#1a3547]">
            Regional Investment Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {climateData?.regions.map((region) => {
              const suggestions = getInvestmentSuggestions(region.name);
              return (
                <div key={region.name} className="bg-[#f8fafb] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">{region.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        region.risk === "High"
                          ? "bg-red-100 text-red-600"
                          : region.risk === "Medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {region.risk} Risk
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="fas fa-thermometer-half text-[#2563eb] mr-2"></i>
                      <span>Climate: {suggestions?.climate}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-chart-line text-[#2563eb] mr-2"></i>
                      <span>Growth Potential: {suggestions?.potential}</span>
                    </div>
                    <div>
                      <div className="font-medium mb-2"></div>
                    </div>
                    );
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;