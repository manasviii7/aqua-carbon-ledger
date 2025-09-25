import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Calculator, 
  Factory, 
  Zap, 
  Truck, 
  Building2, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Leaf
} from "lucide-react";

interface EmissionCalculation {
  category: string;
  amount: number;
  unit: string;
  co2Equivalent: number;
}

const CarbonCalculator = () => {
  const [industryType, setIndustryType] = useState("");
  const [calculations, setCalculations] = useState<EmissionCalculation[]>([]);
  const [formData, setFormData] = useState({
    companyName: "",
    energyConsumption: "",
    fuelConsumption: "",
    transportationKm: "",
    wasteGenerated: "",
    employees: ""
  });
  
  const { toast } = useToast();

  const industryTypes = [
    { value: "manufacturing", label: "Manufacturing", icon: Factory, factor: 2.1 },
    { value: "energy", label: "Energy Production", icon: Zap, factor: 3.2 },
    { value: "transportation", label: "Transportation", icon: Truck, factor: 1.8 },
    { value: "construction", label: "Construction", icon: Building2, factor: 1.5 },
    { value: "textile", label: "Textile", icon: Factory, factor: 2.3 },
    { value: "food", label: "Food Processing", icon: Factory, factor: 1.7 }
  ];

  const calculateEmissions = () => {
    const selectedIndustry = industryTypes.find(i => i.value === industryType);
    if (!selectedIndustry) return;

    const newCalculations: EmissionCalculation[] = [];
    
    // Energy consumption (kWh to CO2)
    if (formData.energyConsumption) {
      const energyCO2 = parseFloat(formData.energyConsumption) * 0.5 * selectedIndustry.factor;
      newCalculations.push({
        category: "Energy Consumption",
        amount: parseFloat(formData.energyConsumption),
        unit: "kWh",
        co2Equivalent: energyCO2
      });
    }

    // Fuel consumption (liters to CO2)
    if (formData.fuelConsumption) {
      const fuelCO2 = parseFloat(formData.fuelConsumption) * 2.3 * selectedIndustry.factor;
      newCalculations.push({
        category: "Fuel Consumption",
        amount: parseFloat(formData.fuelConsumption),
        unit: "liters",
        co2Equivalent: fuelCO2
      });
    }

    // Transportation (km to CO2)
    if (formData.transportationKm) {
      const transportCO2 = parseFloat(formData.transportationKm) * 0.2 * selectedIndustry.factor;
      newCalculations.push({
        category: "Transportation",
        amount: parseFloat(formData.transportationKm),
        unit: "km",
        co2Equivalent: transportCO2
      });
    }

    // Waste generated (kg to CO2)
    if (formData.wasteGenerated) {
      const wasteCO2 = parseFloat(formData.wasteGenerated) * 0.1 * selectedIndustry.factor;
      newCalculations.push({
        category: "Waste Generated",
        amount: parseFloat(formData.wasteGenerated),
        unit: "kg",
        co2Equivalent: wasteCO2
      });
    }

    setCalculations(newCalculations);
    
    toast({
      title: "Emissions Calculated",
      description: `Total CO₂ equivalent: ${getTotalEmissions().toFixed(2)} tons`,
    });
  };

  const getTotalEmissions = () => {
    return calculations.reduce((total, calc) => total + calc.co2Equivalent, 0);
  };

  const getEmissionLevel = (total: number) => {
    if (total < 50) return { level: "Low", color: "text-success", bgColor: "bg-success/10" };
    if (total < 200) return { level: "Medium", color: "text-warning", bgColor: "bg-warning/10" };
    return { level: "High", color: "text-destructive", bgColor: "bg-destructive/10" };
  };

  const getCreditsSuggestion = (total: number) => {
    return Math.ceil(total * 1.2); // 20% buffer for offsets
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card border-accent/20">
        <CardHeader className="bg-gradient-carbon text-secondary-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Industrial Carbon Emissions Calculator
          </CardTitle>
          <CardDescription className="text-secondary-foreground/80">
            Calculate industry-level emissions and determine required carbon credit offsets
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>
              Enter your company details for accurate emission calculations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="e.g., Green Manufacturing Ltd."
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industryType">Industry Type</Label>
              <Select value={industryType} onValueChange={setIndustryType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industryTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="energyConsumption">Energy Consumption (kWh/month)</Label>
                <Input
                  id="energyConsumption"
                  type="number"
                  placeholder="e.g., 50000"
                  value={formData.energyConsumption}
                  onChange={(e) => setFormData(prev => ({ ...prev, energyConsumption: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuelConsumption">Fuel Consumption (liters/month)</Label>
                <Input
                  id="fuelConsumption"
                  type="number"
                  placeholder="e.g., 2000"
                  value={formData.fuelConsumption}
                  onChange={(e) => setFormData(prev => ({ ...prev, fuelConsumption: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="transportationKm">Transportation (km/month)</Label>
                <Input
                  id="transportationKm"
                  type="number"
                  placeholder="e.g., 10000"
                  value={formData.transportationKm}
                  onChange={(e) => setFormData(prev => ({ ...prev, transportationKm: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wasteGenerated">Waste Generated (kg/month)</Label>
                <Input
                  id="wasteGenerated"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.wasteGenerated}
                  onChange={(e) => setFormData(prev => ({ ...prev, wasteGenerated: e.target.value }))}
                />
              </div>
            </div>

            <Button 
              onClick={calculateEmissions} 
              className="w-full bg-gradient-carbon hover:bg-secondary-hover"
              disabled={!industryType}
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Emissions
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Emission Analysis
            </CardTitle>
            <CardDescription>
              Detailed breakdown of your carbon footprint
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {calculations.length > 0 ? (
              <>
                <div className="space-y-3">
                  {calculations.map((calc, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                      <div>
                        <p className="font-medium text-sm">{calc.category}</p>
                        <p className="text-xs text-muted-foreground">
                          {calc.amount.toLocaleString()} {calc.unit}
                        </p>
                      </div>
                      <Badge variant="outline" className="font-mono">
                        {calc.co2Equivalent.toFixed(2)} tons CO₂
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Total Emissions</span>
                    <span className="text-2xl font-bold text-primary">
                      {getTotalEmissions().toFixed(2)} tons CO₂
                    </span>
                  </div>
                  
                  {(() => {
                    const total = getTotalEmissions();
                    const level = getEmissionLevel(total);
                    return (
                      <div className={`p-3 rounded-lg ${level.bgColor}`}>
                        <div className="flex items-center gap-2">
                          {level.level === "Low" ? (
                            <CheckCircle2 className={`h-4 w-4 ${level.color}`} />
                          ) : (
                            <AlertTriangle className={`h-4 w-4 ${level.color}`} />
                          )}
                          <span className={`font-medium ${level.color}`}>
                            {level.level} Emission Level
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {level.level === "Low" 
                            ? "Your emissions are within acceptable limits"
                            : level.level === "Medium"
                            ? "Consider implementing reduction strategies"
                            : "Immediate action required to reduce emissions"
                          }
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calculator className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Enter your data and calculate emissions to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Credit Recommendations */}
      {calculations.length > 0 && (
        <Card className="shadow-verification border-success/20">
          <CardHeader className="bg-gradient-success text-success-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Carbon Credit Recommendations
            </CardTitle>
            <CardDescription className="text-success-foreground/80">
              Based on your emission calculations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">
                  {getCreditsSuggestion(getTotalEmissions())}
                </div>
                <p className="text-sm text-muted-foreground">
                  Recommended Credits to Purchase
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (Includes 20% buffer)
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  ${(getCreditsSuggestion(getTotalEmissions()) * 25).toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">
                  Estimated Cost
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (@$25 per credit)
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  100%
                </div>
                <p className="text-sm text-muted-foreground">
                  Net Zero Target
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Carbon Neutral Status
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-success" />
                Reduction Strategies
              </h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Switch to renewable energy sources (30-50% reduction)</li>
                <li>• Optimize transportation and logistics (15-25% reduction)</li>
                <li>• Implement waste reduction programs (10-20% reduction)</li>
                <li>• Invest in energy-efficient equipment (20-35% reduction)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CarbonCalculator;