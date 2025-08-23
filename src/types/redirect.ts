export interface LinkMapping {
  title: string;
  description: string;
  targetUrl: string;
  provider: string;
  category: string;
  affiliate: boolean;
  clicks: number;
  created: string;
  lastUpdated: string;
}

export interface LinkMappings {
  links: Record<string, LinkMapping>;
  analytics: {
    totalClicks: number;
    lastUpdated: string;
  };
}
