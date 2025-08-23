// Client-side link management for GitHub Pages compatibility
// This replaces the server-side API routes

import type { LinkMapping, LinkMappings } from "@/types";

// Store link mappings in the client
let linkMappings: LinkMappings | null = null;

// Initialize link mappings from static JSON
export async function initializeLinkMappings(): Promise<void> {
  try {
    const response = await fetch('/data/link-mappings.json');
    linkMappings = await response.json();
  } catch (error) {
    console.error('Failed to load link mappings:', error);
    linkMappings = {
      links: {},
      analytics: {
        totalClicks: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    };
  }
}

// Get link by ID
export function getLinkById(id: string): LinkMapping | null {
  if (!linkMappings) {
    console.error('Link mappings not initialized');
    return null;
  }
  
  const link = linkMappings.links[id];
  if (!link) {
    return null;
  }

  // Handle legacy links without openInNewTab property
  return {
    ...link,
    openInNewTab: link.openInNewTab ?? true, // Default to true
  };
}

// Increment click count (client-side storage)
export function incrementClickCount(id: string): void {
  if (!linkMappings) {
    console.error('Link mappings not initialized');
    return;
  }

  if (!linkMappings.links[id]) {
    console.error('Link not found:', id);
    return;
  }

  // Get current counts from localStorage
  const stored = localStorage.getItem('linkClickCounts');
  const clickCounts = stored ? JSON.parse(stored) : {};
  
  // Increment count
  clickCounts[id] = (clickCounts[id] || 0) + 1;
  
  // Store back to localStorage
  localStorage.setItem('linkClickCounts', JSON.stringify(clickCounts));
  
  // Update total clicks
  const totalClicks = Object.values(clickCounts).reduce((sum: number, count) => sum + (count as number), 0);
  localStorage.setItem('totalLinkClicks', totalClicks.toString());
  localStorage.setItem('lastLinkUpdate', new Date().toISOString().split('T')[0]);
}

// Get click count for a link
export function getClickCount(id: string): number {
  const stored = localStorage.getItem('linkClickCounts');
  const clickCounts = stored ? JSON.parse(stored) : {};
  return clickCounts[id] || 0;
}

// Get all analytics data
export function getAnalytics(): { totalClicks: number; lastUpdated: string; linkCounts: Record<string, number> } {
  const stored = localStorage.getItem('linkClickCounts');
  const linkCounts = stored ? JSON.parse(stored) : {};
  
  const totalClicks = parseInt(localStorage.getItem('totalLinkClicks') || '0');
  const lastUpdated = localStorage.getItem('lastLinkUpdate') || new Date().toISOString().split('T')[0];
  
  return {
    totalClicks,
    lastUpdated,
    linkCounts
  };
}

// Handle link redirect
export async function handleLinkRedirect(id: string, referrer?: string): Promise<void> {
  // Initialize if not done yet
  if (!linkMappings) {
    await initializeLinkMappings();
  }

  const link = getLinkById(id);
  
  if (!link) {
    // Redirect to 404 or error page
    window.location.href = '/404';
    return;
  }

  // Increment click count
  incrementClickCount(id);

  // For affiliate links, show disclosure page
  if (link.affiliate) {
    const returnParam = referrer ? `&return=${encodeURIComponent(referrer)}` : '';
    window.location.href = `/redirect-info?id=${id}${returnParam}`;
    return;
  }

  // For non-affiliate links, redirect directly
  if (link.openInNewTab) {
    window.open(link.targetUrl, '_blank');
  } else {
    window.location.href = link.targetUrl;
  }
}
