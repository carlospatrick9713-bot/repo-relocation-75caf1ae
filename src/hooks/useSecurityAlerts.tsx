import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export interface SecurityAlert {
  id: number;
  title: string;
  level: 'low' | 'medium' | 'high';
  message: string;
  time: string;
  timestamp: number;
}

// Simulação de alertas que seriam buscados de uma API
const generateSecurityAlerts = (t: any): SecurityAlert[] => {
  const now = Date.now();
  const alerts: SecurityAlert[] = [
    {
      id: Math.random(),
      title: t('securityAlerts.alerts.highRisk.title'),
      level: 'high',
      message: t('securityAlerts.alerts.highRisk.message'),
      time: 'now',
      timestamp: now
    },
    {
      id: Math.random(),
      title: t('securityAlerts.alerts.traffic.title'),
      level: 'medium',
      message: t('securityAlerts.alerts.traffic.message'),
      time: 'now',
      timestamp: now
    },
    {
      id: Math.random(),
      title: t('securityAlerts.alerts.safeSouth.title'),
      level: 'low',
      message: t('securityAlerts.alerts.safeSouth.message'),
      time: 'now',
      timestamp: now
    }
  ];

  return alerts;
};

export const useSecurityAlerts = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const updateAlerts = () => {
    const newAlerts = generateSecurityAlerts(t);
    setAlerts(newAlerts);
    setLastUpdate(new Date());

    // Mostrar notificação para alertas de alto risco
    const highRiskAlerts = newAlerts.filter(alert => alert.level === 'high');
    
    highRiskAlerts.forEach(alert => {
      toast.custom(
        (toastId) => (
          <div className="bg-destructive/90 backdrop-blur-sm text-destructive-foreground p-4 rounded-lg shadow-lg border border-destructive">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{alert.title}</h4>
                  <p className="text-sm mt-1 opacity-90">{alert.message}</p>
                </div>
              </div>
              <Button
                onClick={() => toast.dismiss(toastId)}
                size="sm"
                variant="secondary"
                className="w-full mt-2"
              >
                {t('securityAlerts.understood')}
              </Button>
            </div>
          </div>
        ),
        {
          duration: Infinity, // Não fecha automaticamente
          position: 'top-center',
        }
      );
    });
  };

  useEffect(() => {
    // Carregar alertas iniciais
    updateAlerts();

    // Atualizar a cada 5 minutos (300000 ms)
    const interval = setInterval(() => {
      updateAlerts();
    }, 300000);

    return () => clearInterval(interval);
  }, [t]);

  return { alerts, lastUpdate };
};
