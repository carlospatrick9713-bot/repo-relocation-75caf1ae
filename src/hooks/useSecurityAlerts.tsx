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

export const useSecurityAlerts = (isPremium?: boolean) => {
  const { t } = useTranslation();
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [shownAlertIds, setShownAlertIds] = useState<Set<string>>(new Set());

  const { data: dbAlerts = [], refetch } = useQuery({
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
  });

  const alerts: SecurityAlert[] = dbAlerts.map(alert => ({
    id: alert.id,
    title: t(alert.title_key),
    level: mapTypeToLevel(alert.type),
    message: t(alert.message_key),
    time: 'now',
    timestamp: new Date(alert.created_at).getTime(),
  }));

  // Setup realtime subscription for premium users
  useEffect(() => {
    if (!isPremium) return;

    const channel = supabase
      .channel('security-alerts-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'security_alerts',
          filter: 'is_active=eq.true',
        },
        (payload) => {
          console.log('New security alert received:', payload);
          setLastUpdate(new Date());
          refetch();
          
          const newAlert = payload.new as DBSecurityAlert;
          const alertLevel = mapTypeToLevel(newAlert.type as 'warning' | 'danger' | 'info');
          
          // Show notification for new alerts
          toast.custom(
            (toastId) => (
              <div className="bg-destructive/90 backdrop-blur-sm text-destructive-foreground p-4 rounded-lg shadow-lg border border-destructive">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{t(newAlert.title_key)}</h4>
                      <p className="text-sm mt-1 opacity-90">{t(newAlert.message_key)}</p>
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
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isPremium, t, refetch]);

  // Show notifications for existing high risk alerts (only once)
  useEffect(() => {
    if (!isPremium || alerts.length === 0) return;
    
    const highRiskAlerts = alerts.filter(
      alert => alert.level === 'high' && !shownAlertIds.has(alert.id)
    );
    
    highRiskAlerts.forEach(alert => {
      setShownAlertIds(prev => new Set(prev).add(alert.id));
    });
  }, [alerts, isPremium, shownAlertIds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5 * 60000);

    return () => clearInterval(interval);
  }, []);

  return { alerts, lastUpdate };
};
