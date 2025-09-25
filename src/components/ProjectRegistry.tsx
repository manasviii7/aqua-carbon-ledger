import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Leaf, 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  Users,
  Waves,
  TreePine,
  Fish,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  Download
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  location: string;
  country: string;
  ecosystemType: "mangrove" | "seagrass" | "saltmarsh" | "mixed";
  status: "draft" | "submitted" | "verified" | "active" | "completed" | "rejected";
  area: number; // hectares
  carbonPotential: number; // tons CO2
  creditsIssued: number;
  community: string;
  registrationDate: string;
  lastUpdated: string;
  coordinator: string;
  fundingStatus: "funded" | "seeking" | "partial";
}

const ProjectRegistry = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ecosystemFilter, setEcosystemFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { toast } = useToast();

  // Mock project data
  const projects: Project[] = [
    {
      id: "1",
      name: "Sundarbans Mangrove Restoration",
      location: "Sundarbans",
      country: "Bangladesh",
      ecosystemType: "mangrove",
      status: "active",
      area: 1250,
      carbonPotential: 15600,
      creditsIssued: 2400,
      community: "450 fishing families",
      registrationDate: "2024-01-15",
      lastUpdated: "2024-01-20",
      coordinator: "Bangladesh Forest Department",
      fundingStatus: "funded"
    },
    {
      id: "2",
      name: "Bolinao Seagrass Conservation",
      location: "Bolinao",
      country: "Philippines",
      ecosystemType: "seagrass",
      status: "submitted",
      area: 890,
      carbonPotential: 11200,
      creditsIssued: 0,
      community: "320 coastal families",
      registrationDate: "2024-01-18",
      lastUpdated: "2024-01-18",
      coordinator: "Philippine Marine Institute",
      fundingStatus: "seeking"
    },
    {
      id: "3",
      name: "San Francisco Bay Salt Marsh",
      location: "San Francisco Bay",
      country: "USA",
      ecosystemType: "saltmarsh",
      status: "verified",
      area: 2100,
      carbonPotential: 21000,
      creditsIssued: 3200,
      community: "Environmental research groups",
      registrationDate: "2024-01-05",
      lastUpdated: "2024-01-22",
      coordinator: "California Coastal Commission",
      fundingStatus: "funded"
    },
    {
      id: "4",
      name: "Madagascar Mangrove Protection",
      location: "Mahajanga",
      country: "Madagascar",
      ecosystemType: "mangrove",
      status: "draft",
      area: 3400,
      carbonPotential: 42500,
      creditsIssued: 0,
      community: "1200 local community members",
      registrationDate: "2024-01-22",
      lastUpdated: "2024-01-22",
      coordinator: "Madagascar Wildlife Conservation",
      fundingStatus: "partial"
    },
    {
      id: "5",
      name: "Great Barrier Reef Seagrass",
      location: "Queensland",
      country: "Australia",
      ecosystemType: "seagrass",
      status: "completed",
      area: 1800,
      carbonPotential: 18900,
      creditsIssued: 4200,
      community: "Aboriginal communities",
      registrationDate: "2023-08-10",
      lastUpdated: "2024-01-15",
      coordinator: "Australian Marine Conservation",
      fundingStatus: "funded"
    }
  ];

  const ecosystemTypes = {
    mangrove: { label: "Mangrove Forests", icon: TreePine, color: "text-success" },
    seagrass: { label: "Seagrass Meadows", icon: Waves, color: "text-primary" },
    saltmarsh: { label: "Salt Marshes", icon: Fish, color: "text-accent" },
    mixed: { label: "Mixed Ecosystems", icon: Leaf, color: "text-secondary" }
  };

  const statusConfig = {
    draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: Edit },
    submitted: { label: "Submitted", color: "bg-warning text-warning-foreground", icon: Clock },
    verified: { label: "Verified", color: "bg-success text-success-foreground", icon: CheckCircle2 },
    active: { label: "Active", color: "bg-primary text-primary-foreground", icon: BarChart3 },
    completed: { label: "Completed", color: "bg-accent text-accent-foreground", icon: CheckCircle2 },
    rejected: { label: "Rejected", color: "bg-destructive text-destructive-foreground", icon: AlertCircle }
  };

  const fundingStatusConfig = {
    funded: { label: "Fully Funded", color: "text-success bg-success/10" },
    partial: { label: "Partially Funded", color: "text-warning bg-warning/10" },
    seeking: { label: "Seeking Funding", color: "text-destructive bg-destructive/10" }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesEcosystem = ecosystemFilter === "all" || project.ecosystemType === ecosystemFilter;
    
    return matchesSearch && matchesStatus && matchesEcosystem;
  });

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Project registry data is being exported to CSV format.",
    });
  };

  const handleDeleteProject = (projectId: string) => {
    toast({
      title: "Project Deleted",
      description: "Project has been removed from the registry.",
      variant: "destructive"
    });
  };

  const totalStats = {
    totalProjects: projects.length,
    totalArea: projects.reduce((sum, p) => sum + p.area, 0),
    totalCarbon: projects.reduce((sum, p) => sum + p.carbonPotential, 0),
    totalCredits: projects.reduce((sum, p) => sum + p.creditsIssued, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card border-success/20">
        <CardHeader className="bg-gradient-success text-success-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Blue Carbon Project Registry
          </CardTitle>
          <CardDescription className="text-success-foreground/80">
            Comprehensive database of all registered blue carbon conservation projects
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Registry Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card animate-fade-in">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{totalStats.totalProjects}</div>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </CardContent>
        </Card>
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">{totalStats.totalArea.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Hectares Protected</p>
          </CardContent>
        </Card>
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">{totalStats.totalCarbon.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Carbon Potential (tons)</p>
          </CardContent>
        </Card>
        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning mb-1">{totalStats.totalCredits.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Credits Issued</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Search Projects</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, location, or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Ecosystem</label>
              <Select value={ecosystemFilter} onValueChange={setEcosystemFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="mangrove">Mangrove</SelectItem>
                  <SelectItem value="seagrass">Seagrass</SelectItem>
                  <SelectItem value="saltmarsh">Salt Marsh</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExportData} className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button className="gap-2 bg-gradient-success hover:bg-success-hover">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => {
          const EcosystemIcon = ecosystemTypes[project.ecosystemType].icon;
          const StatusIcon = statusConfig[project.status].icon;
          
          return (
            <Card 
              key={project.id} 
              className="shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-success/10`}>
                      <EcosystemIcon className={`h-4 w-4 ${ecosystemTypes[project.ecosystemType].color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {project.location}, {project.country}
                      </div>
                    </div>
                  </div>
                  <Badge className={statusConfig[project.status].color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig[project.status].label}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Area</p>
                    <p className="font-medium">{project.area.toLocaleString()} ha</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Carbon Potential</p>
                    <p className="font-medium">{project.carbonPotential.toLocaleString()} tons</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Credits Issued</p>
                    <p className="font-medium text-accent">{project.creditsIssued.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Community</p>
                    <p className="font-medium text-xs">{project.community}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge 
                    variant="outline" 
                    className={fundingStatusConfig[project.fundingStatus].color}
                  >
                    {fundingStatusConfig[project.fundingStatus].label}
                  </Badge>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {project.registrationDate}
                  </div>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProject(project.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No Projects Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find projects.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectRegistry;