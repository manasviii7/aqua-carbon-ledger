import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Waves, Shield, Calculator, FileText, Bot, ArrowRight, Leaf, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-ocean">
                <Waves className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
                  carbonix
                </h1>
                <p className="text-lg text-muted-foreground">Blockchain-Based MRV System</p>
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparent, tamper-proof monitoring and verification of blue carbon ecosystems with 
              blockchain-secured carbon credits and intelligent emission tracking
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Platform Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* NGO/Government Portal */}
          <Card className="shadow-glow hover:shadow-verification transition-all duration-300 cursor-pointer border-success/20" 
                onClick={() => navigate("/ngo-dashboard")}>
            <CardHeader className="bg-gradient-success text-success-foreground rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Shield className="h-6 w-6" />
                NGO Verification Portal
              </CardTitle>
              <CardDescription className="text-success-foreground/80 text-base">
                Comprehensive dashboard for environmental organizations and government agencies
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">24</div>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success mb-1">15.4K</div>
                  <p className="text-sm text-muted-foreground">Credits Issued</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <FileText className="h-4 w-4 text-success" />
                  <span>MRV Report Generation & Submission</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calculator className="h-4 w-4 text-success" />
                  <span>Industry Carbon Emissions Calculator</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-4 w-4 text-success" />
                  <span>Project Verification & Credit Issuance</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Bot className="h-4 w-4 text-success" />
                  <span>AI-Powered Sustainability Recommendations</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-gradient-success hover:bg-success-hover">
                Access NGO Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Industry Portal */}
          <Card className="shadow-card border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Building2 className="h-6 w-6 text-primary" />
                Industry Compliance Portal
              </CardTitle>
              <CardDescription className="text-base">
                Carbon tracking and credit management for industrial partners
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">89K</div>
                  <p className="text-sm text-muted-foreground">Tons CO₂ Tracked</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning mb-1">8</div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Calculator className="h-4 w-4 text-primary" />
                  <span>Real-time Emission Monitoring</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Leaf className="h-4 w-4 text-primary" />
                  <span>Carbon Credit Purchase & Management</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Bot className="h-4 w-4 text-primary" />
                  <span>AI Reduction Strategy Recommendations</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Compliance Reporting & Verification</span>
                </div>
              </div>
              
              <div className="mt-6 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-sm text-center">
                  <Badge variant="outline" className="mr-2">Coming Soon</Badge>
                  Industry portal under development
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Features Overview */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive blockchain-based solution for blue carbon monitoring, verification, and credit management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-ocean flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Blockchain Security</h3>
              <p className="text-sm text-muted-foreground">
                Immutable records prevent double counting and ensure transparency
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-success flex items-center justify-center">
                <FileText className="h-6 w-6 text-success-foreground" />
              </div>
              <h3 className="font-semibold mb-2">MRV Reports</h3>
              <p className="text-sm text-muted-foreground">
                Automated monitoring, reporting & verification with IPFS storage
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-carbon flex items-center justify-center">
                <Calculator className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Emission Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Industry-specific carbon footprint analysis and credit recommendations
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/20 flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Intelligent recommendations for emission reduction strategies
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
