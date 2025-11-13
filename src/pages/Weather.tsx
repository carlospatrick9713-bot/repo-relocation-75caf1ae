import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import logo from '@/assets/logo-transparent.png';
import AppMenu from '@/components/AppMenu';

export default function Weather() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const forecast = [
    { day: 'Segunda', temp: '28°C', condition: 'Ensolarado', icon: Sun },
    { day: 'Terça', temp: '26°C', condition: 'Parcialmente nublado', icon: Cloud },
    { day: 'Quarta', temp: '24°C', condition: 'Chuvoso', icon: CloudRain },
    { day: 'Quinta', temp: '27°C', condition: 'Ensolarado', icon: Sun },
    { day: 'Sexta', temp: '29°C', condition: 'Ensolarado', icon: Sun },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img 
              src={logo} 
              alt="Safe Trip" 
              className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={() => navigate('/')}
            />
            <h1 className="text-xl font-bold">{t('header.title')}</h1>
          </div>
          <AppMenu />
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 px-4 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center gap-3">
            <Cloud className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-bold">Meteorologia</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Previsão do tempo atualizada para o Rio de Janeiro
          </p>
        </div>

        {/* Current Weather */}
        <Card className="animate-fade-in bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">Agora no Rio de Janeiro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center gap-8">
              <Sun className="w-24 h-24 text-yellow-500" />
              <div className="text-center">
                <div className="text-6xl font-bold">28°C</div>
                <div className="text-xl text-muted-foreground mt-2">Ensolarado</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                <Wind className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Vento</div>
                  <div className="text-lg font-semibold">12 km/h</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                <Droplets className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Umidade</div>
                  <div className="text-lg font-semibold">65%</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                <Eye className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Visibilidade</div>
                  <div className="text-lg font-semibold">10 km</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-background/50 rounded-lg">
                <Gauge className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Pressão</div>
                  <div className="text-lg font-semibold">1013 hPa</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forecast */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Previsão para os Próximos Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecast.map((day, index) => {
                const IconComponent = day.icon;
                return (
                  <div
                    key={day.day}
                    className="flex flex-col items-center p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="font-semibold mb-3">{day.day}</div>
                    <IconComponent className="w-12 h-12 text-primary mb-3" />
                    <div className="text-2xl font-bold mb-2">{day.temp}</div>
                    <div className="text-sm text-muted-foreground text-center">
                      {day.condition}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
