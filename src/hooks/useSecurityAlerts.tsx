import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export interface SecurityAlert {
  id: string;
  title: string;
  level: 'low' | 'medium' | 'high';
  message: string;
  time: string;
  timestamp: number;
}

interface DBSecurityAlert {
  id: string;
  title_key: string;
  message_key: string;
  type: 'warning' | 'danger' | 'info';
  created_at: string;
}

const mapTypeToLevel = (type: 'warning' | 'danger' | 'info'): 'low' | 'medium' | 'high' => {
  switch (type) {
    case 'danger': return 'high';
    case 'warning': return 'medium';
    case 'info': return 'low';
  }
};

export const useSecurityAlerts = () => {
  const { t } = useTranslation();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const { data: dbAlerts = [] } = useQuery({
    queryKey: ['security-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('security_alerts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as DBSecurityAlert[];
    },
    refetchInterval: 5 * 60000, // Refetch every 5 minutes
  });

  const alerts: SecurityAlert[] = dbAlerts.map(alert => ({
    id: alert.id,
    title: t(alert.title_key),
    level: mapTypeToLevel(alert.type),
    message: t(alert.message_key),
    time: 'now',
    timestamp: new Date(alert.created_at).getTime(),
  }));

  useEffect(() => {
    if (alerts.length > 0) {
      // Mostrar notificação para alertas de alto risco
      const highRiskAlerts = alerts.filter(alert => alert.level === 'high');
      
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
            duration: Infinity,
            position: 'top-center',
          }
        );
      });
    }
  }, [alerts.length, t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5 * 60000);

    return () => clearInterval(interval);
  }, []);

  return { alerts, lastUpdate };
};
