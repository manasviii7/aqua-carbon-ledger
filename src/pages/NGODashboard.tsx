import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Waves, 
  Shield, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Leaf,
  Database,
  Coins,
  Users,
  MapPin,
  Calendar,
  Award,
  Bot
} from "lucide-react";
import MRVReportGenerator from "@/components/MRVReportGenerator";
import ProjectVerification from "@/components/ProjectVerification";
import ProjectRegistry from "@/components/ProjectRegistry";
import CreditManagement from "@/components/CreditManagement";

const NGODashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for India-focused demonstration
  const stats = {
    totalProjects: 47,
    activeProjects: 24,
    pendingVerifications: 8,
    issuedCredits: 15420,
    totalValueLocked: 2850000, // in INR
    verifiedProjects: 15
  };

  const recentProjects = [
    { 
      id: 1, 
      name: "Mangrove Restoration - Sundarbans", 
      location: "West Bengal, India",
      status: "verified", 
      credits: 2400, 
      ecosystemType: "Mangrove",
      submittedDate: "2024-01-15",
      community: "450 families"
    },
    { 
      id: 2, 
      name: "Seagrass Conservation - Chilika Lake", 
      location: "Odisha, India",
      status: "pending", 
      credits: 0, 
      ecosystemType: "Seagrass",
      submittedDate: "2024-01-18",
      community: "320 families"
    },
    { 
      id: 3, 
      name: "Salt Marsh Protection - Rann of Kutch", 
      location: "Gujarat, India",
      status: "verified", 
      credits: 1800, 
      ecosystemType: "Salt Marsh",
      submittedDate: "2024-01-12",
      community: "280 families"
    },
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
                  CARBONIX
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Database className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">All registered</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Leaf className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.activeProjects}</div>
              <p className="text-xs text-muted-foreground">Currently monitoring</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-verification transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.pendingVerifications}</div>
              <p className="text-xs text-muted-foreground">Awaiting verification</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-verification transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Projects</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.verifiedProjects}</div>
              <p className="text-xs text-muted-foreground">Approved & credited</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Issued</CardTitle>
              <Coins className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.issuedCredits.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Blockchain tokens</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{stats.totalValueLocked.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Credits value (INR)</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:flex bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="overview" className="gap-2">
              <Database className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="mrv" className="gap-2">
              <FileText className="h-4 w-4" />
              MRV Reports
            </TabsTrigger>
            <TabsTrigger value="registry" className="gap-2">
              <Leaf className="h-4 w-4" />
              Project Registry
            </TabsTrigger>
            <TabsTrigger value="verification" className="gap-2">
              <Shield className="h-4 w-4" />
              Verification
            </TabsTrigger>
            <TabsTrigger value="credits" className="gap-2">
              <Coins className="h-4 w-4" />
              Credit Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Projects */}
              <Card className="shadow-card animate-scale-in">
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
                  {recentProjects.map((project, index) => (
                    <div 
                      key={project.id} 
                      className="group p-4 rounded-lg border bg-muted/20 hover:bg-muted/30 transition-all duration-300 hover:shadow-md cursor-pointer animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="font-medium group-hover:text-primary transition-colors">{project.name}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {project.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {project.submittedDate}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          variant={project.status === "verified" ? "default" : "secondary"}
                          className={project.status === "verified" ? "bg-success text-success-foreground" : ""}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Coins className="h-3 w-3 text-accent" />
                            {project.credits} credits
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-primary" />
                            {project.community}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {project.ecosystemType}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Verification Pipeline */}
              <Card className="shadow-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Verification Pipeline
                  </CardTitle>
                  <CardDescription>
                    Current status of project verifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-warning/10">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-warning" />
                        <span className="text-sm font-medium">Pending Reviews</span>
                      </div>
                      <Badge variant="outline" className="text-warning">
                        {stats.pendingVerifications} projects
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Under Review</span>
                      </div>
                      <Badge variant="outline" className="text-primary">
                        3 projects
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 rounded-lg bg-success/10">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium">Verified This Month</span>
                      </div>
                      <Badge variant="outline" className="text-success">
                        {stats.verifiedProjects} projects
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 rounded-lg bg-gradient-success/10 border border-success/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium">Verification Impact</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• {stats.issuedCredits.toLocaleString()} carbon credits issued</p>
                      <p>• ${stats.totalValueLocked.toLocaleString()} total value locked</p>
                      <p>• 847 hectares of blue carbon protected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mrv">
            <MRVReportGenerator />
          </TabsContent>

          <TabsContent value="registry">
            <ProjectRegistry />
          </TabsContent>

          <TabsContent value="verification">
            <ProjectVerification />
          </TabsContent>

          <TabsContent value="credits">
            <CreditManagement />
          </TabsContent>
        </Tabs>

        {/* AI Prediction Section - Horizontal Layout */}
        <div className="mt-8 animate-fade-in">
          <Card className="shadow-glow border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Bot className="h-6 w-6 text-primary-foreground" />
                </div>
                AI Ecosystem Prediction & Recommendations
              </CardTitle>
              <CardDescription>
                Advanced AI analysis for carbon absorption prediction and sustainability insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Trees Planted</label>
                    <input 
                      type="number" 
                      placeholder="Enter number of trees"
                      className="w-full px-3 py-2 border rounded-lg bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Area (hectares)</label>
                    <input 
                      type="number" 
                      placeholder="Enter area in hectares"
                      className="w-full px-3 py-2 border rounded-lg bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Annual Rainfall (mm)</label>
                    <input 
                      type="number" 
                      placeholder="Enter rainfall in mm"
                      className="w-full px-3 py-2 border rounded-lg bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Soil Type</label>
                    <select className="w-full px-3 py-2 border rounded-lg bg-background">
                      <option>Select soil type</option>
                      <option>Clay</option>
                      <option>Sandy</option>
                      <option>Loamy</option>
                      <option>Peaty</option>
                      <option>Saline</option>
                      <option>Muddy</option>
                    </select>
                  </div>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    <Bot className="h-4 w-4 mr-2" />
                    Predict Credits & Ecosystem
                  </Button>
                </div>

                {/* Prediction Results */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="text-center p-4 bg-success/10 border-success/20">
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold text-success mb-1">2,450</div>
                        <p className="text-sm text-muted-foreground">Tons CO₂/year</p>
                        <p className="text-xs text-success">Absorption Potential</p>
                      </CardContent>
                    </Card>
                    <Card className="text-center p-4 bg-primary/10 border-primary/20">
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold text-primary mb-1">1,850</div>
                        <p className="text-sm text-muted-foreground">Credits Needed</p>
                        <p className="text-xs text-primary">Industry Purchase</p>
                      </CardContent>
                    </Card>
                    <Card className="text-center p-4 bg-accent/10 border-accent/20">
                      <CardContent className="p-0">
                        <div className="text-2xl font-bold text-accent mb-1">Mangrove</div>
                        <p className="text-sm text-muted-foreground">Recommended</p>
                        <p className="text-xs text-accent">Best Ecosystem</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-success" />
                      AI Analysis & Industry Credit Requirements:
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/20">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>Based on soil analysis: Mangrove ecosystem recommended for optimal carbon absorption</span>
                      </div>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/20">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>Industry needs to purchase 1,850 carbon credits to offset current emissions</span>
                      </div>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/20">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>Muddy soil type ideal for mangrove growth with 95% success rate</span>
                      </div>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/20">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>Estimated ₹18.5L investment needed for complete carbon neutrality</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;