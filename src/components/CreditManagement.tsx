import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Coins, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Shield, 
  Calendar,
  Filter,
  Download,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BarChart3,
  DollarSign,
  Users,
  Leaf,
  Building2
} from "lucide-react";

interface CreditTransaction {
  id: string;
  type: "issued" | "transferred" | "retired" | "purchased";
  amount: number;
  projectName: string;
  projectId: string;
  recipient?: string;
  buyer?: string;
  price?: number;
  timestamp: string;
  txHash: string;
  status: "confirmed" | "pending" | "failed";
}

interface CreditBalance {
  projectId: string;
  projectName: string;
  ecosystemType: string;
  totalIssued: number;
  available: number;
  retired: number;
  transferred: number;
  price: number;
  vintage: string;
}

const CreditManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Mock credit balances
  const creditBalances: CreditBalance[] = [
    {
      projectId: "1",
      projectName: "Sundarbans Mangrove Restoration",
      ecosystemType: "Mangrove",
      totalIssued: 2400,
      available: 1800,
      retired: 400,
      transferred: 200,
      price: 25.50,
      vintage: "2024"
    },
    {
      projectId: "3",
      projectName: "San Francisco Bay Salt Marsh",
      ecosystemType: "Salt Marsh",
      totalIssued: 3200,
      available: 2100,
      retired: 800,
      transferred: 300,
      price: 28.75,
      vintage: "2024"
    },
    {
      projectId: "5",
      projectName: "Great Barrier Reef Seagrass",
      ecosystemType: "Seagrass",
      totalIssued: 4200,
      available: 1900,
      retired: 1800,
      transferred: 500,
      price: 32.00,
      vintage: "2023"
    }
  ];

  // Mock transactions
  const transactions: CreditTransaction[] = [
    {
      id: "1",
      type: "issued",
      amount: 500,
      projectName: "Sundarbans Mangrove Restoration",
      projectId: "1",
      timestamp: "2024-01-25T10:30:00Z",
      txHash: "0x1234...5678",
      status: "confirmed"
    },
    {
      id: "2",
      type: "transferred",
      amount: 200,
      projectName: "San Francisco Bay Salt Marsh",
      projectId: "3",
      recipient: "EcoTech Industries",
      price: 28.75,
      timestamp: "2024-01-24T14:20:00Z",
      txHash: "0x2345...6789",
      status: "confirmed"
    },
    {
      id: "3",
      type: "retired",
      amount: 150,
      projectName: "Great Barrier Reef Seagrass",
      projectId: "5",
      buyer: "Carbon Neutral Corp",
      price: 32.00,
      timestamp: "2024-01-24T09:15:00Z",
      txHash: "0x3456...7890",
      status: "confirmed"
    },
    {
      id: "4",
      type: "issued",
      amount: 300,
      projectName: "Sundarbans Mangrove Restoration",
      projectId: "1",
      timestamp: "2024-01-23T16:45:00Z",
      txHash: "0x4567...8901",
      status: "pending"
    }
  ];

  const totalStats = {
    totalIssued: creditBalances.reduce((sum, cb) => sum + cb.totalIssued, 0),
    totalAvailable: creditBalances.reduce((sum, cb) => sum + cb.available, 0),
    totalRetired: creditBalances.reduce((sum, cb) => sum + cb.retired, 0),
    totalValue: creditBalances.reduce((sum, cb) => sum + (cb.available * cb.price), 0)
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "issued": return Upload;
      case "transferred": return ArrowUpRight;
      case "retired": return ArrowDownRight;
      case "purchased": return DollarSign;
      default: return Coins;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "issued": return "text-success bg-success/10";
      case "transferred": return "text-primary bg-primary/10";
      case "retired": return "text-accent bg-accent/10";
      case "purchased": return "text-warning bg-warning/10";
      default: return "text-muted-foreground bg-muted/10";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "text-success";
      case "pending": return "text-warning";
      case "failed": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const handleBulkIssue = () => {
    toast({
      title: "Bulk Credit Issuance",
      description: "Processing bulk credit issuance for verified projects.",
    });
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.buyer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = transactionFilter === "all" || tx.type === transactionFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-card border-accent/20">
        <CardHeader className="bg-gradient-carbon text-secondary-foreground rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Carbon Credit Management
          </CardTitle>
          <CardDescription className="text-secondary-foreground/80">
            Monitor, issue, and manage blockchain-based carbon credits for verified projects
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Credit Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-card animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Issued</p>
                <p className="text-2xl font-bold text-success">{totalStats.totalIssued.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-success/10">
                <Upload className="h-5 w-5 text-success" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Credits created</p>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-primary">{totalStats.totalAvailable.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Ready for transfer</p>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Retired</p>
                <p className="text-2xl font-bold text-accent">{totalStats.totalRetired.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-accent/10">
                <ArrowDownRight className="h-5 w-5 text-accent" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Used for offsetting</p>
          </CardContent>
        </Card>

        <Card className="shadow-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-warning">${totalStats.totalValue.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg bg-warning/10">
                <DollarSign className="h-5 w-5 text-warning" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Market value</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credit Balances */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-success" />
                  Credit Balances by Project
                </CardTitle>
                <CardDescription>Current inventory of issued carbon credits</CardDescription>
              </div>
              <Button onClick={handleBulkIssue} className="gap-2 bg-gradient-success hover:bg-success-hover">
                <Upload className="h-4 w-4" />
                Bulk Issue
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {creditBalances.map((balance, index) => (
              <div 
                key={balance.projectId} 
                className="p-4 rounded-lg border bg-muted/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-sm">{balance.projectName}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <Badge variant="outline" className="text-xs">
                        {balance.ecosystemType}
                      </Badge>
                      <span>Vintage: {balance.vintage}</span>
                      <span className="text-success font-medium">${balance.price}/credit</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="text-center p-2 rounded bg-success/10">
                    <p className="font-medium text-success">{balance.available}</p>
                    <p className="text-muted-foreground">Available</p>
                  </div>
                  <div className="text-center p-2 rounded bg-accent/10">
                    <p className="font-medium text-accent">{balance.retired}</p>
                    <p className="text-muted-foreground">Retired</p>
                  </div>
                  <div className="text-center p-2 rounded bg-primary/10">
                    <p className="font-medium text-primary">{balance.transferred}</p>
                    <p className="text-muted-foreground">Transferred</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Utilization</span>
                    <span>{Math.round(((balance.retired + balance.transferred) / balance.totalIssued) * 100)}%</span>
                  </div>
                  <Progress 
                    value={((balance.retired + balance.transferred) / balance.totalIssued) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Latest blockchain credit transactions</CardDescription>
            
            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-sm"
                />
              </div>
              <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="issued">Issued</SelectItem>
                  <SelectItem value="transferred">Transferred</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredTransactions.map((transaction, index) => {
              const TransactionIcon = getTransactionIcon(transaction.type);
              const StatusIcon = transaction.status === "confirmed" ? CheckCircle2 : 
                               transaction.status === "pending" ? Clock : AlertTriangle;
              
              return (
                <div 
                  key={transaction.id} 
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/10 animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getTransactionColor(transaction.type)}`}>
                      <TransactionIcon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm capitalize">{transaction.type}</p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.amount} credits
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{transaction.projectName}</p>
                      {transaction.recipient && (
                        <p className="text-xs text-muted-foreground">To: {transaction.recipient}</p>
                      )}
                      {transaction.buyer && (
                        <p className="text-xs text-muted-foreground">By: {transaction.buyer}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <StatusIcon className={`h-3 w-3 ${getStatusColor(transaction.status)}`} />
                      <span className={`text-xs ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                    {transaction.price && (
                      <p className="text-xs font-medium text-success">
                        ${(transaction.amount * transaction.price).toLocaleString()}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Market Analytics */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Market Analytics
          </CardTitle>
          <CardDescription>Credit performance and market insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-success/10">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold text-success">$28.50</div>
              <p className="text-sm text-muted-foreground">Average Price per Credit</p>
              <p className="text-xs text-success mt-1">↑ 12% from last month</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-primary/10">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">47</div>
              <p className="text-sm text-muted-foreground">Active Buyers</p>
              <p className="text-xs text-primary mt-1">↑ 8 new this month</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-accent/10">
              <Building2 className="h-8 w-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold text-accent">89%</div>
              <p className="text-sm text-muted-foreground">Corporate Demand</p>
              <p className="text-xs text-accent mt-1">↑ 15% from last quarter</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditManagement;