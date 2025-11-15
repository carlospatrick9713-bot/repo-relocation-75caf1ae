import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SecurityRegionData {
  regionName: string;
  level: 'low' | 'medium' | 'high';
  incidents: number;
  crimeTypes: Array<{ type: string; count: number }>;
  dangerousHours: string[];
  safetyTips: string[];
}

export interface SecurityDataResponse {
  data: SecurityRegionData[];
  lastUpdate: string;
  source: string;
}

export const useRealSecurityData = (enabled: boolean = true) => {
  return useQuery<SecurityDataResponse>({
    queryKey: ['real-security-data'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('fetch-rio-security-data', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    enabled,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 4 * 60 * 1000, // Consider data stale after 4 minutes
  });
};
