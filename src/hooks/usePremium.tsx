import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export function usePremium() {
  const { user } = useAuth();

  const { data: hasRole, isLoading } = useQuery({
    queryKey: ['user-role', user?.id, 'premium'],
    queryFn: async () => {
      if (!user) return false;
      
      // Use the server-side has_role function for secure role checking
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'premium'
      });

      if (error) {
        console.error('Error checking premium role:', error);
        return false;
      }
      return data as boolean;
    },
    enabled: !!user,
  });

  return { isPremium: hasRole ?? false, isLoading };
}
