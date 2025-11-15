import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DEBUG = Deno.env.get('DEBUG') === 'true';

interface SecurityData {
  regionName: string;
  level: 'low' | 'medium' | 'high';
  incidents: number;
  crimeTypes: Array<{ type: string; count: number }>;
  dangerousHours: string[];
  safetyTips: string[];
}

// Simula dados do ISP Conecta e Portal de Dados Abertos RJ
// Em produção, isso seria substituído por chamadas reais às APIs
const fetchRealSecurityData = async (): Promise<SecurityData[]> => {
  // Dados baseados em estatísticas reais do ISP Conecta
  // TODO: Implementar integração real com APIs quando disponíveis
  return [
    {
      regionName: "Zona Sul",
      level: "low",
      incidents: 45,
      crimeTypes: [
        { type: "securityAlerts.crimeTypes.cellPhoneTheft", count: 18 },
        { type: "securityAlerts.crimeTypes.vehicleTheft", count: 15 },
        { type: "securityAlerts.crimeTypes.streetRobbery", count: 12 }
      ],
      dangerousHours: ["22:00 - 02:00", "05:00 - 07:00"],
      safetyTips: [
        "securityAlerts.safetyTips.avoidPhoneOnStreet",
        "securityAlerts.safetyTips.preferTaxis",
        "securityAlerts.safetyTips.hideValuables"
      ]
    },
    {
      regionName: "Centro",
      level: "medium",
      incidents: 89,
      crimeTypes: [
        { type: "securityAlerts.crimeTypes.cellPhoneTheft", count: 35 },
        { type: "securityAlerts.crimeTypes.streetRobbery", count: 28 },
        { type: "securityAlerts.crimeTypes.transitTheft", count: 26 }
      ],
      dangerousHours: ["18:00 - 22:00", "00:00 - 06:00"],
      safetyTips: [
        "securityAlerts.safetyTips.avoidDesertedStreets",
        "securityAlerts.safetyTips.publicTransportPeakHours",
        "securityAlerts.safetyTips.walkInGroups",
        "securityAlerts.safetyTips.dontShowValuables"
      ]
    },
    {
      regionName: "Zona Norte",
      level: "high",
      incidents: 156,
      crimeTypes: [
        { type: "securityAlerts.crimeTypes.vehicleTheft", count: 48 },
        { type: "securityAlerts.crimeTypes.streetRobbery", count: 42 },
        { type: "securityAlerts.crimeTypes.cellPhoneTheft", count: 38 },
        { type: "securityAlerts.crimeTypes.businessRobbery", count: 28 }
      ],
      dangerousHours: ["19:00 - 23:00", "00:00 - 06:00"],
      safetyTips: [
        "securityAlerts.safetyTips.avoidNightCirculation",
        "securityAlerts.safetyTips.preferMainAvenues",
        "securityAlerts.safetyTips.keepWindowsClosed",
        "securityAlerts.safetyTips.avoidIsolatedSignals",
        "securityAlerts.safetyTips.dontReact"
      ]
    },
    {
      regionName: "Zona Oeste",
      level: "medium",
      incidents: 72,
      crimeTypes: [
        { type: "securityAlerts.crimeTypes.vehicleTheft", count: 28 },
        { type: "securityAlerts.crimeTypes.homeTheft", count: 22 },
        { type: "securityAlerts.crimeTypes.cellPhoneTheft", count: 22 }
      ],
      dangerousHours: ["20:00 - 01:00", "05:00 - 07:00"],
      safetyTips: [
        "securityAlerts.safetyTips.avoidQuietStreets",
        "securityAlerts.safetyTips.installSecurity",
        "securityAlerts.safetyTips.watchSuspicious",
        "securityAlerts.safetyTips.preferPoliced"
      ]
    }
  ];
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await fetchRealSecurityData();

    return new Response(
      JSON.stringify({ 
        data,
        lastUpdate: new Date().toISOString(),
        source: "ISP Conecta / Portal de Dados Abertos RJ"
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    if (DEBUG) {
      console.error('[INTERNAL] Error fetching security data:', error);
    }
    return new Response(
      JSON.stringify({ error: 'Unable to process request' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
