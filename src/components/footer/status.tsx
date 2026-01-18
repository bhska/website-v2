type BetterStackResponse = {
  data: {
    id: string;
    type: string;
    attributes: {
      url: string;
      pronounceable_name: string;
      auth_username: string;
      auth_password: string;
      monitor_type: string;
      monitor_group_id: unknown;
      last_checked_at: string;
      status: 'down' | 'maintenance' | 'paused' | 'pending' | 'up' | 'validating';
      policy_id: unknown;
      required_keyword: unknown;
      verify_ssl: boolean;
      check_frequency: number;
      call: boolean;
      sms: boolean;
      email: boolean;
      push: boolean;
      team_wait: unknown;
      http_method: string;
      request_timeout: number;
      recovery_period: number;
      request_headers: unknown[];
      request_body: string;
      follow_redirects: boolean;
      remember_cookies: boolean;
      created_at: string;
      updated_at: string;
      ssl_expiration: unknown;
      domain_expiration: unknown;
      regions: string[];
      expected_status_codes: unknown[];
      port: unknown;
      confirmation_period: number;
      paused_at: unknown;
      paused: boolean;
      maintenance_from: unknown;
      maintenance_to: unknown;
      maintenance_timezone: string;
    };
    relationships: {
      policy: {
        data: unknown;
      };
    };
  }[];
  pagination: {
    first: string;
    last: string;
    prev: unknown;
    next: unknown;
  };
};

import 'server-only';
import { env } from '@/lib/env';
import { Button } from '../ui/button';

export const Status = async () => {
  let statusColor = 'bg-muted-foreground';
  let statusLabel = 'Unable to fetch status';

  try {
    const response = await fetch('https://uptime.betterstack.com/api/v2/monitors', {
      headers: {
        Authorization: `Bearer ${env.BETTERSTACK_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch status');
    }

    const { data } = (await response.json()) as BetterStackResponse;

    if (data.length === 0) {
      statusColor = 'bg-muted-foreground';
      statusLabel = 'No monitors configured';
    } else {
      const upCount = data.filter((m) => m.attributes.status === 'up').length;
      const downCount = data.filter((m) => m.attributes.status === 'down').length;
      const maintenanceCount = data.filter((m) => m.attributes.status === 'maintenance').length;

      if (downCount === data.length) {
        // All monitors are down
        statusColor = 'bg-destructive';
        statusLabel = 'Degraded performance';
      } else if (downCount > 0) {
        // Some monitors are down
        statusColor = 'bg-warning';
        statusLabel = 'Partial outage';
      } else if (maintenanceCount > 0 && upCount === 0) {
        // All in maintenance
        statusColor = 'bg-muted-foreground';
        statusLabel = 'Under maintenance';
      } else {
        // All systems operational (up, validating, or pending)
        statusColor = 'bg-success';
        statusLabel = 'All systems normal';
      }
    }
  } catch {
    statusColor = 'bg-muted-foreground';
    statusLabel = 'Unable to fetch status';
  }

  return (
    <Button variant="outline">
      <a
        className="flex items-center gap-3 text-xs md:text-sm"
        target="_blank"
        rel="noreferrer"
        href={env.BETTERSTACK_URL}
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`absolute inline-flex size-full animate-ping rounded-full opacity-75 ${statusColor}`}
          />
          <span className={`relative inline-flex h-2 w-2 rounded-full ${statusColor}`} />
        </span>
        <span className="text-muted-foreground">{statusLabel}</span>
      </a>
    </Button>
  );
};
