import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  FileText, 
  MapPin, 
  Calendar,
  Users,
  Leaf,
  AlertTriangle,
  Award,
  Coins
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  location: string;
  ecosystemType: string;
  status: "pending" | "verified" | "rejected" | "reviewing";
  submittedDate: string;
  carbonCredited: number;
  creditsToIssue: number;
  confidence: number;
  community: string;
  documents: string[];
}

const ProjectVerification = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const projects: Project[] = [
    {
      id: "1",
      name: "Mangrove Restoration - Sundarbans",
      location: "Bangladesh",
      ecosystemType: "Mangrove",
      status: "pending",
      submittedDate: "2024-01-15",
      carbonCredited: 0,
      creditsToIssue: 2400,
      confidence: 92,
      community: "Local fishing community (450 families)",
      documents: ["Satellite imagery", "Field measurements", "Community impact study"]
    },
    {
      id: "2",
      name: "Seagrass Restoration - Bolinao",
      location: "Philippines",
      ecosystemType: "Seagrass",
      status: "reviewing",
      submittedDate: "2024-01-10",
      carbonCredited: 0,
      creditsToIssue: 1800,
      confidence: 87,
      community: "Coastal communities (320 families)",
      documents: ["Underwater surveys", "Carbon assessment", "Biodiversity report"]
    },
    {
      id: "3",
      name: "Salt Marsh Conservation - San Francisco Bay",
      location: "California, USA",
      ecosystemType: "Salt Marsh",
      status: "verified",
      submittedDate: "2024-01-05",
      carbonCredited: 3200,
      creditsToIssue: 3200,
      confidence: 96,
      community: "Environmental research groups",
      documents: ["Long-term monitoring", "Peer review study", "Impact assessment"]
    }
  ];

  const handleVerification = async (projectId: string, decision: "approve" | "reject") => {
    setIsProcessing(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setIsProcessing(false);
      
      if (decision === "approve") {
        toast({
          title: "Project Verified Successfully",
          description: "Carbon credits have been issued and recorded on blockchain.",
        });
      } else {
        toast({
          title: "Project Rejected",
          description: "Verification failed. Feedback has been sent to project owner.",
          variant: "destructive"
        });
      }
      
      setSelectedProject(null);
      setVerificationNotes("");
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-success text-success-foreground";
      case "rejected": return "bg-destructive text-destructive-foreground";
      case "reviewing": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return CheckCircle2;
      case "rejected": return XCircle;
      case "reviewing": return Eye;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card border-success/20">
        <CardHeader className="bg-gradient-success text-success-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Project Verification Dashboard
          </CardTitle>
          <CardDescription className="text-success-foreground/80">
            Review and verify blue carbon projects for credit issuance
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Projects Awaiting Verification</CardTitle>
            <CardDescription>
              Click on a project to review details and make verification decisions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((project) => {
              const StatusIcon = getStatusIcon(project.status);
              return (
                <div
                  key={project.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    selectedProject?.id === project.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{project.name}</h3>
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
                    <Badge className={getStatusColor(project.status)}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Coins className="h-3 w-3 text-accent" />
                        {project.creditsToIssue} credits
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-3 w-3 text-success" />
                        {project.confidence}% confidence
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {project.ecosystemType}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Project Details */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Project Review
            </CardTitle>
            <CardDescription>
              Detailed analysis and verification controls
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedProject ? (
              <div className="space-y-6">
                {/* Project Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedProject.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedProject.location}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Ecosystem Type</Label>
                      <p className="text-sm font-medium">{selectedProject.ecosystemType}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Submission Date</Label>
                      <p className="text-sm font-medium">{selectedProject.submittedDate}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Credits to Issue</Label>
                      <p className="text-sm font-medium text-accent">{selectedProject.creditsToIssue} tons CO₂</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Confidence Score</Label>
                      <div className="flex items-center gap-2">
                        <Progress value={selectedProject.confidence} className="flex-1 h-2" />
                        <span className="text-sm font-medium">{selectedProject.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Impact */}
                <div className="p-4 rounded-lg bg-muted/20">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Community Impact
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedProject.community}</p>
                </div>

                {/* Supporting Documents */}
                <div>
                  <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Supporting Documents
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded border bg-muted/10">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doc}</span>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Verification Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add your verification comments and recommendations..."
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                {selectedProject.status === "pending" || selectedProject.status === "reviewing" ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleVerification(selectedProject.id, "reject")}
                      variant="destructive"
                      disabled={isProcessing}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {isProcessing ? "Processing..." : "Reject Project"}
                    </Button>
                    <Button
                      onClick={() => handleVerification(selectedProject.id, "approve")}
                      disabled={isProcessing}
                      className="flex-1 bg-gradient-success hover:bg-success-hover"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      {isProcessing ? "Processing..." : "Verify & Issue Credits"}
                    </Button>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-muted/20 text-center">
                    <p className="text-sm text-muted-foreground">
                      This project has already been {selectedProject.status}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Shield className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Select a project from the list to begin verification</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Verification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {projects.filter(p => p.status === "verified").length}
            </div>
            <p className="text-sm text-muted-foreground">Verified Projects</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {projects.filter(p => p.status === "pending" || p.status === "reviewing").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">
              {projects.reduce((sum, p) => sum + p.carbonCredited, 0).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Credits Issued</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {Math.round(projects.reduce((sum, p) => sum + p.confidence, 0) / projects.length)}%
            </div>
            <p className="text-sm text-muted-foreground">Avg Confidence</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectVerification;