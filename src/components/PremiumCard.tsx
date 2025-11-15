import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Navigation, Bell, Download, Headphones } from 'lucide-react';
import premiumBadge from '@/assets/premium-badge.png';

export default function PremiumCard() {
  const { t } = useTranslation();

  const features = [
    { icon: Navigation, text: t('premium.features.routes') },
    { icon: Bell, text: t('premium.features.alerts') },
    { icon: Download, text: t('premium.features.offline') },
    { icon: Headphones, text: t('premium.features.support') }
  ];

  return (
    <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background relative animate-fade-in">
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <img src={premiumBadge} alt="" className="w-full h-full object-contain" />
      </div>
      
      <CardHeader className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-primary animate-pulse" />
          <Badge className="bg-gradient-to-r from-yellow-500 to-primary text-white">
            {t('premium.badge')}
          </Badge>
        </div>
        <CardTitle className="text-lg">{t('premium.title')}</CardTitle>
        <CardDescription className="text-xs">
          {t('premium.description')}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-primary/5 transition-colors"
            >
              <feature.icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-xs">{feature.text}</span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <div className="text-center mb-3">
            <span className="text-2xl font-bold text-primary">{t('premium.price')}</span>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover-scale"
            onClick={() => window.open('https://pay.kiwify.com.br/lBcZdOF', '_blank')}
          >
            <Crown className="w-4 h-4 mr-2" />
            {t('premium.cta')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
