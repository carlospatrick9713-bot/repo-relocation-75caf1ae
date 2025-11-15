import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, AlertTriangle, Clock, MapPin, Crown } from 'lucide-react';
import { useSecurityAlerts } from '@/hooks/useSecurityAlerts';
import { usePremium } from '@/hooks/usePremium';
import { useAuth } from '@/hooks/useAuth';
import RiskBadge from '@/components/RiskBadge';
import PremiumCard from '@/components/PremiumCard';
import ConfirmExitDialog from '@/components/ConfirmExitDialog';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';
import LanguageSelector from '@/components/LanguageSelector';
import MapView from '@/components/MapView';
import { useRealSecurityData } from '@/hooks/useRealSecurityData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Info, TrendingUp, BarChart3 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SecurityAlerts() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isPremium, isLoading } = usePremium();
  const { user, loading: authLoading } = useAuth();
  const { alerts, lastUpdate } = useSecurityAlerts(isPremium);
  const { data: realData, isLoading: loadingRealData } = useRealSecurityData(isPremium);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000 / 60);
    
    if (diff < 1) return t('sidebar.timeAgo.now');
    if (diff < 60) return t('sidebar.timeAgo.minutes', { count: diff });
    const hours = Math.floor(diff / 60);
    return t('sidebar.timeAgo.hours', { count: hours });
  };

  const regionAlerts = [
    { 
      region: t('securityAlerts.regions.centro.name'), 
      level: 'medium' as const, 
      message: t('securityAlerts.regions.centro.message'), 
      areas: t('securityAlerts.regions.centro.areas', { returnObjects: true }) as string[]
    },
    { 
      region: t('securityAlerts.regions.zonaNorte.name'), 
      level: 'high' as const, 
      message: t('securityAlerts.regions.zonaNorte.message'), 
      areas: t('securityAlerts.regions.zonaNorte.areas', { returnObjects: true }) as string[]
    },
    { 
      region: t('securityAlerts.regions.zonaSul.name'), 
      level: 'low' as const, 
      message: t('securityAlerts.regions.zonaSul.message'), 
      areas: t('securityAlerts.regions.zonaSul.areas', { returnObjects: true }) as string[]
    },
    { 
      region: t('securityAlerts.regions.zonaOeste.name'), 
      level: 'medium' as const, 
      message: t('securityAlerts.regions.zonaOeste.message'), 
      areas: t('securityAlerts.regions.zonaOeste.areas', { returnObjects: true }) as string[]
    },
  ];

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <p className="text-muted-foreground">{t('common.loading')}</p>
      </div>
    );
  }


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                localStorage.removeItem('hideHero');
                navigate('/');
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img 
              src={logo} 
              alt="Safe Trip" 
              className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={() => {
                localStorage.removeItem('hideHero');
                navigate('/');
              }}
            />
            <h1 className="text-xl font-bold">{t('header.title')}</h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <AppMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`container py-8 px-4 space-y-8 ${!isPremium && !isLoading ? 'blur-md pointer-events-none' : ''}`}>
        {/* Hero Section */}
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-bold">{t('securityAlerts.title')}</h2>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-lg text-muted-foreground">
              {t('securityAlerts.subtitle')}
            </p>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {t('securityAlerts.updated')} {formatLastUpdate()}
              </span>
              <Badge variant="secondary">{t('securityAlerts.updatesEvery')}</Badge>
            </div>
          </div>
        </div>


        {/* Danger Zone Map */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {t('securityAlerts.dangerZoneMap')}
            </CardTitle>
            <CardDescription>
              {t('securityAlerts.dangerZoneMapDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MapView 
              spots={[]} 
              restaurants={[]}
              dangerZones={regionAlerts.map(alert => ({
                name: alert.region,
                level: alert.level,
                areas: alert.areas,
              }))}
            />
          </CardContent>
        </Card>

        {/* Real Security Data from ISP Conecta */}
        {loadingRealData ? (
          <Card className="animate-fade-in">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">{t('common.loading')}</p>
            </CardContent>
          </Card>
        ) : realData && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {realData.data.map((region, index) => (
                <Card key={region.regionName} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center justify-between">
                      <span>{region.regionName}</span>
                      <RiskBadge level={region.level} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{region.incidents}</div>
                    <p className="text-xs text-muted-foreground mt-1">Incidentes (últimas 24h)</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Regional Information */}
            <div className="space-y-6">
              {realData.data.map((region, index) => (
                <Card key={region.regionName} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        {region.regionName}
                      </div>
                      <RiskBadge level={region.level} />
                    </CardTitle>
                    <CardDescription>
                      {region.incidents} incidentes registrados nas últimas 24 horas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="crimes" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="crimes">{t('securityAlerts.tabs.crimeTypes')}</TabsTrigger>
                        <TabsTrigger value="hours">{t('securityAlerts.tabs.hours')}</TabsTrigger>
                        <TabsTrigger value="tips">{t('securityAlerts.tabs.tips')}</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="crimes" className="space-y-3 mt-4">
                        <div className="space-y-2">
                          {region.crimeTypes.map((crime, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                              <span className="text-sm">{t(`securityAlerts.${crime.type}`)}</span>
                              <Badge variant="outline">{t('securityAlerts.statistics.cases', { count: crime.count })}</Badge>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="hours" className="space-y-3 mt-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{t('securityAlerts.statistics.dangerousHours')}</p>
                          {region.dangerousHours.map((hour, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10">
                              <Clock className="w-4 h-4 text-destructive" />
                              <span className="text-sm">{hour}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tips" className="space-y-3 mt-4">
                        <div className="space-y-2">
                          {region.safetyTips.map((tip, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-primary/5">
                              <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{t(`securityAlerts.${tip}`)}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Contacts */}
            <Card className="animate-fade-in bg-gradient-to-br from-destructive/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-destructive" />
                  {t('securityAlerts.emergency.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">{t('securityAlerts.emergency.police')}</span>
                    <a href="tel:190" className="text-lg font-bold text-primary hover:underline">190</a>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">{t('securityAlerts.emergency.fireDept')}</span>
                    <a href="tel:193" className="text-lg font-bold text-primary hover:underline">193</a>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">{t('securityAlerts.emergency.ambulance')}</span>
                    <a href="tel:192" className="text-lg font-bold text-primary hover:underline">192</a>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">{t('securityAlerts.emergency.civilDefense')}</span>
                    <a href="tel:199" className="text-lg font-bold text-primary hover:underline">199</a>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">{t('securityAlerts.emergency.tipLine')}</span>
                    <a href="tel:21971997" className="text-lg font-bold text-primary hover:underline">2197-1997</a>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <span className="font-medium">{t('securityAlerts.emergency.roadPolice')}</span>
                    <a href="tel:191" className="text-lg font-bold text-primary hover:underline">191</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Source */}
            <Card className="animate-fade-in">
              <CardContent className="py-4">
                <p className="text-xs text-muted-foreground text-center">
                  {t('securityAlerts.dataSource')}: {realData.source} | {t('securityAlerts.lastUpdate')}: {new Date(realData.lastUpdate).toLocaleString('pt-BR')}
                </p>
              </CardContent>
            </Card>

            {/* Statistics and Data Visualization */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  {t('securityAlerts.statistics.title')}
                </CardTitle>
                <CardDescription>
                  {t('securityAlerts.statistics.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="incidents" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="incidents">{t('securityAlerts.statistics.incidentsTab')}</TabsTrigger>
                    <TabsTrigger value="comparison">{t('securityAlerts.statistics.comparisonTab')}</TabsTrigger>
                    <TabsTrigger value="trends">{t('securityAlerts.statistics.trendsTab')}</TabsTrigger>
                    <TabsTrigger value="ranking">{t('securityAlerts.statistics.rankingTab')}</TabsTrigger>
                  </TabsList>

                  {/* Incidents by Region - Bar Chart */}
                  <TabsContent value="incidents" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{t('securityAlerts.statistics.incidentsByRegion')}</h3>
                      <p className="text-sm text-muted-foreground">{t('securityAlerts.statistics.totalOccurrences')}</p>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={realData.data}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="regionName" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Legend />
                        <Bar dataKey="incidents" fill="hsl(var(--primary))" name={t('securityAlerts.statistics.incidents')} radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  {/* Crime Types Comparison - Pie Chart */}
                  <TabsContent value="comparison" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{t('securityAlerts.statistics.crimeDistribution')}</h3>
                      <p className="text-sm text-muted-foreground">{t('securityAlerts.statistics.crimeProportions')}</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {realData.data.slice(0, 2).map((region) => {
                        const COLORS = ['hsl(var(--primary))', 'hsl(var(--destructive))', 'hsl(var(--warning))', 'hsl(var(--success))', 'hsl(var(--secondary))'];
                        return (
                          <div key={region.regionName} className="space-y-2">
                            <h4 className="font-medium text-center">{region.regionName}</h4>
                            <ResponsiveContainer width="100%" height={300}>
                              <PieChart>
                                <Pie
                                  data={region.crimeTypes}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  label={(entry) => entry.type}
                                  outerRadius={80}
                                  fill="hsl(var(--primary))"
                                  dataKey="count"
                                >
                                  {region.crimeTypes.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip 
                                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>

                  {/* Trends - Line Chart */}
                  <TabsContent value="trends" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{t('securityAlerts.statistics.incidentTrends')}</h3>
                      <p className="text-sm text-muted-foreground">{t('securityAlerts.statistics.temporalComparison')}</p>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={realData.data}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="regionName" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="incidents" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          name={t('securityAlerts.statistics.incidents')}
                          dot={{ fill: 'hsl(var(--primary))', r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>

                  {/* Safety Ranking */}
                  <TabsContent value="ranking" className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{t('securityAlerts.statistics.safetyRanking')}</h3>
                      <p className="text-sm text-muted-foreground">{t('securityAlerts.statistics.orderedBySafety')}</p>
                    </div>
                    <div className="space-y-3">
                      {[...realData.data]
                        .sort((a, b) => a.incidents - b.incidents)
                        .map((region, index) => {
                          const position = index + 1;
                          const getMedalEmoji = () => {
                            if (position === 1) return '🥇';
                            if (position === 2) return '🥈';
                            if (position === 3) return '🥉';
                            return `${position}º`;
                          };
                          
                          return (
                            <div
                              key={region.regionName}
                              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold w-12 text-center">
                                  {getMedalEmoji()}
                                </span>
                                <div>
                                  <h4 className="font-semibold">{region.regionName}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {region.incidents} incidentes
                                  </p>
                                </div>
                              </div>
                              <RiskBadge level={region.level} />
                            </div>
                          );
                        })}
                    </div>
                    
                    {/* Summary Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t('securityAlerts.statistics.safestRegion')}</p>
                              <p className="text-lg font-bold text-primary">
                                {[...realData.data].sort((a, b) => a.incidents - b.incidents)[0]?.regionName}
                              </p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-primary" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t('securityAlerts.statistics.totalIncidents')}</p>
                              <p className="text-lg font-bold text-destructive">
                                {realData.data.reduce((sum, r) => sum + r.incidents, 0)}
                              </p>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-destructive" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">{t('securityAlerts.statistics.averagePerRegion')}</p>
                              <p className="text-lg font-bold">
                                {Math.round(realData.data.reduce((sum, r) => sum + r.incidents, 0) / realData.data.length)}
                              </p>
                            </div>
                            <BarChart3 className="w-8 h-8 text-primary" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      {/* Premium Overlay */}
      {(!user || !isPremium) && !isLoading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-background/20">
          <div className="w-full max-w-md animate-fade-in">
            <PremiumCard />
          </div>
        </div>
      )}
    </div>

    <ConfirmExitDialog 
      open={showExitDialog} 
      onOpenChange={setShowExitDialog}
      onConfirm={() => navigate('/')}
    />
    </>
  );
}
