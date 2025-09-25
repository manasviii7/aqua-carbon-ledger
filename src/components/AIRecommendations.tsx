import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Bot, 
  Send, 
  Lightbulb, 
  TrendingDown, 
  Leaf, 
  Factory, 
  Zap, 
  Recycle,
  MessageCircle,
  Sparkles,
  Target,
  DollarSign,
  Clock
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  recommendations?: Recommendation[];
}

interface Recommendation {
  title: string;
  description: string;
  impact: string;
  cost: string;
  timeframe: string;
  priority: "high" | "medium" | "low";
}

const AIRecommendations = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your AI sustainability assistant. I can help industries reduce their carbon emissions and determine optimal carbon credit strategies. What would you like to know?",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const quickQuestions = [
    "How can our manufacturing plant reduce emissions by 30%?",
    "What's the best strategy for carbon neutrality in 2025?",
    "How many carbon credits should we purchase?",
    "Which renewable energy options suit our industry?"
  ];

  const sampleRecommendations: Recommendation[] = [
    {
      title: "Switch to Renewable Energy",
      description: "Install solar panels or purchase renewable energy certificates to reduce energy-related emissions by 40-60%.",
      impact: "45% emission reduction",
      cost: "$50,000 - $200,000",
      timeframe: "6-12 months",
      priority: "high"
    },
    {
      title: "Optimize Transportation Logistics",
      description: "Implement route optimization and transition to electric/hybrid vehicles for deliveries.",
      impact: "25% transport emission reduction",
      cost: "$30,000 - $100,000",
      timeframe: "3-6 months",
      priority: "medium"
    },
    {
      title: "Implement Circular Economy Practices",
      description: "Set up waste recycling programs and material reuse systems to minimize waste generation.",
      impact: "15% overall emission reduction",
      cost: "$10,000 - $50,000",
      timeframe: "2-4 months",
      priority: "medium"
    }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
        recommendations: inputMessage.toLowerCase().includes("reduce") || inputMessage.toLowerCase().includes("emissions") 
          ? sampleRecommendations 
          : undefined
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (question: string) => {
    if (question.toLowerCase().includes("manufacturing")) {
      return "For manufacturing plants, I recommend a multi-pronged approach: 1) Energy efficiency upgrades, 2) Renewable energy transition, 3) Process optimization, and 4) Supply chain improvements. Based on typical manufacturing emissions, you could achieve 30-50% reduction through these strategies.";
    } else if (question.toLowerCase().includes("carbon neutral")) {
      return "Achieving carbon neutrality requires: 1) Measuring your current baseline emissions, 2) Setting science-based reduction targets, 3) Implementing emission reduction strategies, and 4) Offsetting remaining emissions with verified carbon credits. I can help you create a detailed roadmap.";
    } else if (question.toLowerCase().includes("credits")) {
      return "The number of carbon credits depends on your annual emissions and reduction goals. As a rule of thumb, purchase 120% of your net emissions (after reductions) to account for potential variations. I recommend focusing on blue carbon credits for maximum environmental impact.";
    } else {
      return "Great question! Based on current industry best practices and your sector, I can provide tailored recommendations. Let me analyze the most effective strategies for your specific situation and emission profile.";
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return Target;
      case "medium": return Clock;
      default: return Lightbulb;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card border-primary/20">
        <CardHeader className="bg-gradient-ocean text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Sustainability Assistant
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Get intelligent recommendations for emission reduction and carbon credit strategies
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="shadow-card h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5" />
                Chat Assistant
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <ScrollArea className="flex-1 pr-4 mb-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted/50"
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                        
                        {/* Recommendations */}
                        {message.recommendations && (
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <Sparkles className="h-4 w-4" />
                              Recommendations:
                            </div>
                            {message.recommendations.slice(0, 2).map((rec, index) => (
                              <div key={index} className="p-2 rounded bg-background/50 text-foreground">
                                <div className="flex items-center gap-2 mb-1">
                              <Badge className={getPriorityColor(rec.priority)}>
                                {rec.priority}
                              </Badge>
                                  <span className="text-xs font-medium">{rec.title}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{rec.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-primary rounded-full border-t-transparent" />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about emission reduction strategies..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-ocean hover:bg-primary-hover"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Recommendations */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Quick Questions
              </CardTitle>
              <CardDescription>
                Common sustainability queries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left h-auto p-3 justify-start"
                  onClick={() => handleQuickQuestion(question)}
                >
                  <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Impact Categories */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Impact Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-success/10">
                <Zap className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm font-medium">Energy Efficiency</p>
                  <p className="text-xs text-muted-foreground">30-50% reduction potential</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 rounded-lg bg-primary/10">
                <Factory className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Process Optimization</p>
                  <p className="text-xs text-muted-foreground">20-35% reduction potential</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/10">
                <Recycle className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm font-medium">Waste Management</p>
                  <p className="text-xs text-muted-foreground">15-25% reduction potential</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carbon Credit Calculator */}
          <Card className="shadow-card border-success/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Leaf className="h-5 w-5 text-success" />
                Quick Credit Estimate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">1,250</div>
                <p className="text-sm text-muted-foreground">Estimated credits needed</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Current emissions:</span>
                  <span className="font-medium">1,040 tons CO₂</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Buffer (20%):</span>
                  <span className="font-medium">210 tons CO₂</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center text-sm font-medium">
                  <span>Total credits:</span>
                  <span className="text-success">1,250 credits</span>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-success hover:bg-success-hover">
                <DollarSign className="h-4 w-4 mr-2" />
                Calculate Exact Cost
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;