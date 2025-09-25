import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Waves, 
  TreePine, 
  Fish,
  Save,
  Send,
  AlertCircle
} from "lucide-react";

const MRVReportGenerator = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    ecosystemType: "",
    location: "",
    monitoringPeriod: "",
    carbonSequestration: "",
    biodiversityImpact: "",
    communityBenefit: "",
    methodology: "",
    verificationNotes: ""
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const ecosystemTypes = [
    { value: "mangrove", label: "Mangrove Forests", icon: TreePine },
    { value: "seagrass", label: "Seagrass Meadows", icon: Waves },
    { value: "saltmarsh", label: "Salt Marshes", icon: Fish },
    { value: "mixed", label: "Mixed Blue Carbon", icon: Waves }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = () => {
    // Simulate file upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          toast({
            title: "File Uploaded Successfully",
            description: "Monitoring data has been processed and validated.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate blockchain submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "MRV Report Submitted",
        description: "Report has been recorded on blockchain and is pending verification.",
      });
      
      // Reset form
      setFormData({
        projectName: "",
        ecosystemType: "",
        location: "",
        monitoringPeriod: "",
        carbonSequestration: "",
        biodiversityImpact: "",
        communityBenefit: "",
        methodology: "",
        verificationNotes: ""
      });
      setUploadProgress(0);
    }, 2000);
  };

  const isFormValid = formData.projectName && formData.ecosystemType && formData.location;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card border-primary/20">
        <CardHeader className="bg-gradient-ocean text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            MRV Report Generator
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Create comprehensive Monitoring, Reporting & Verification documents for blue carbon projects
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Form */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>
              Enter the basic details for the blue carbon project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                placeholder="e.g., Mangrove Restoration - Sundarbans"
                value={formData.projectName}
                onChange={(e) => handleInputChange("projectName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ecosystemType">Ecosystem Type</Label>
              <Select value={formData.ecosystemType} onValueChange={(value) => handleInputChange("ecosystemType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ecosystem type" />
                </SelectTrigger>
                <SelectContent>
                  {ecosystemTypes.map((type) => (
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
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Bangladesh"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monitoringPeriod">Monitoring Period</Label>
                <Input
                  id="monitoringPeriod"
                  placeholder="e.g., Q1 2024"
                  value={formData.monitoringPeriod}
                  onChange={(e) => handleInputChange("monitoringPeriod", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="methodology">Methodology Used</Label>
              <Select value={formData.methodology} onValueChange={(value) => handleInputChange("methodology", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select verification methodology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vm0007">VM0007 - REDD+ Methodology Framework</SelectItem>
                  <SelectItem value="vm0033">VM0033 - Methodology for Tidal Wetland</SelectItem>
                  <SelectItem value="ar-am0014">AR-AM0014 - Afforestation and Reforestation</SelectItem>
                  <SelectItem value="custom">Custom Methodology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Data */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Monitoring Data</CardTitle>
            <CardDescription>
              Quantitative measurements and impact assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="carbonSequestration">Carbon Sequestration (tons CO₂)</Label>
              <Input
                id="carbonSequestration"
                type="number"
                placeholder="e.g., 2400"
                value={formData.carbonSequestration}
                onChange={(e) => handleInputChange("carbonSequestration", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="biodiversityImpact">Biodiversity Impact Score</Label>
              <Input
                id="biodiversityImpact"
                type="number"
                placeholder="1-10 scale"
                value={formData.biodiversityImpact}
                onChange={(e) => handleInputChange("biodiversityImpact", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="communityBenefit">Community Benefit Assessment</Label>
              <Textarea
                id="communityBenefit"
                placeholder="Describe the social and economic benefits to local communities..."
                value={formData.communityBenefit}
                onChange={(e) => handleInputChange("communityBenefit", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationNotes">Verification Notes</Label>
              <Textarea
                id="verificationNotes"
                placeholder="Additional observations, recommendations, or concerns..."
                value={formData.verificationNotes}
                onChange={(e) => handleInputChange("verificationNotes", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Upload Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Supporting Documentation
          </CardTitle>
          <CardDescription>
            Upload satellite imagery, field measurements, and scientific data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Upload monitoring files</p>
              <p className="text-xs text-muted-foreground">
                Supports: .pdf, .xlsx, .csv, .jpg, .png (Max 50MB)
              </p>
              <Button onClick={handleFileUpload} variant="outline" className="mt-4">
                Select Files
              </Button>
            </div>
            
            {uploadProgress > 0 && (
              <div className="mt-4 space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-xs text-muted-foreground">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {!isFormValid && (
            <>
              <AlertCircle className="h-4 w-4 text-warning" />
              <span className="text-sm text-warning">Complete required fields to proceed</span>
            </>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="gap-2 bg-gradient-ocean hover:bg-primary-hover"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Submitting to Blockchain..." : "Submit MRV Report"}
          </Button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <div>
              <p className="text-sm font-medium">Data Validated</p>
              <p className="text-xs text-muted-foreground">All inputs verified</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Timestamp</p>
              <p className="text-xs text-muted-foreground">Blockchain ready</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <MapPin className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium">Geolocation</p>
              <p className="text-xs text-muted-foreground">GPS coordinates verified</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MRVReportGenerator;