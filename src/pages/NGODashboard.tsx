import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Waves, 
  Shield, 
  Calculator, 
  FileText, 
  Bot, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Leaf,
  Building2,
  Database
} from "lucide-react";
import MRVReportGenerator from "@/components/MRVReportGenerator";
import CarbonCalculator from "@/components/CarbonCalculator";
import ProjectVerification from "@/components/ProjectVerification";
import AIRecommendations from "@/components/AIRecommendations";

const NGODashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const stats = {
    activeProjects: 24,
    pendingVerifications: 8,
    issuedCredits: 15420,
    totalEmissions: 89234
  };

  const recentProjects = [
    { id: 1, name: "Mangrove Restoration - Bangladesh", status: "verified", credits: 2400, emission: 12000 },
    { id: 2, name: "Seagrass Conservation - Philippines", status: "pending", credits: 0, emission: 8500 },
    { id: 3, name: "Tidal Marsh Protection - California", status: "verified", credits: 1800, emission: 9200 },
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-ocean">
                <Waves className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
                  Blue Carbon Registry
                </h1>
                <p className="text-sm text-muted-foreground">NGO Verification Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="gap-2">
                <Shield className="h-4 w-4" />
                Verified NGO
              </Badge>
              <Button variant="outline">Settings</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Database className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.activeProjects}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-verification transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.pendingVerifications}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-verification transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Issued</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.issuedCredits.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+15% this quarter</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Emissions Tracked</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.totalEmissions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">CO₂ tons monitored</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:flex bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="gap-2">
              <Database className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="mrv" className="gap-2">
              <FileText className="h-4 w-4" />
              MRV Reports
            </TabsTrigger>
            <TabsTrigger value="calculator" className="gap-2">
              <Calculator className="h-4 w-4" />
              Carbon Calculator
            </TabsTrigger>
            <TabsTrigger value="verification" className="gap-2">
              <Shield className="h-4 w-4" />
              Verification
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Bot className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Projects */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-success" />
                    Recent Blue Carbon Projects
                  </CardTitle>
                  <CardDescription>
                    Latest projects requiring verification and monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
                      <div className="space-y-1">
                        <p className="font-medium">{project.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Credits: {project.credits}</span>
                          <span>Emissions: {project.emission} tons CO₂</span>
                        </div>
                      </div>
                      <Badge 
                        variant={project.status === "verified" ? "default" : "secondary"}
                        className={project.status === "verified" ? "bg-success text-success-foreground" : ""}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Industry Impact Summary */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Industry Emissions Overview
                  </CardTitle>
                  <CardDescription>
                    Current emission levels and reduction targets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Manufacturing Sector</span>
                      <span className="text-sm text-destructive">34,200 tons CO₂</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Energy Sector</span>
                      <span className="text-sm text-warning">28,400 tons CO₂</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Transportation</span>
                      <span className="text-sm text-success">18,200 tons CO₂</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  
                  <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span className="text-sm font-medium">Action Required</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      15 industries need immediate MRV assessment for compliance
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mrv">
            <MRVReportGenerator />
          </TabsContent>

          <TabsContent value="calculator">
            <CarbonCalculator />
          </TabsContent>

          <TabsContent value="verification">
            <ProjectVerification />
          </TabsContent>

          <TabsContent value="ai">
            <AIRecommendations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NGODashboard;