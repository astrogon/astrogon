import fs from "fs/promises";
import path from "path";
import type { LinkMappings, LinkMapping } from "@/types";

const MAPPINGS_FILE = path.join(process.cwd(), "src/data/link-mappings.json");

export async function getLinkMappings(): Promise<LinkMappings> {
  try {
    const data = await fs.readFile(MAPPINGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading link mappings:", error);
    throw new Error("Failed to load link mappings");
  }
}

export async function getLinkById(id: string): Promise<LinkMapping | null> {
  try {
    const mappings = await getLinkMappings();
    const link = mappings.links[id];
    
    if (!link) {
      return null;
    }

    // Handle legacy links without openInNewTab property
    return {
      ...link,
      openInNewTab: link.openInNewTab ?? true, // Default to true
    };
  } catch (error) {
    console.error("Error getting link by ID:", error);
    return null;
  }
}

export async function incrementClickCount(id: string): Promise<boolean> {
  try {
    const mappings = await getLinkMappings();

    if (!mappings.links[id]) {
      return false;
    }

    // Increment click count
    mappings.links[id].clicks += 1;
    mappings.analytics.totalClicks += 1;
    mappings.analytics.lastUpdated = new Date().toISOString().split("T")[0];
    mappings.links[id].lastUpdated = new Date().toISOString().split("T")[0];

    // Write back to file
    await fs.writeFile(MAPPINGS_FILE, JSON.stringify(mappings, null, 2));
    return true;
  } catch (error) {
    console.error("Error incrementing click count:", error);
    return false;
  }
}

export async function addLink(
  id: string,
  linkData: Omit<LinkMapping, "clicks" | "created" | "lastUpdated">
): Promise<boolean> {
  try {
    const mappings = await getLinkMappings();
    const now = new Date().toISOString().split("T")[0];

    mappings.links[id] = {
      ...linkData,
      // Set default for openInNewTab if not provided
      openInNewTab: linkData.openInNewTab ?? true,
      clicks: 0,
      created: now,
      lastUpdated: now,
    };

    await fs.writeFile(MAPPINGS_FILE, JSON.stringify(mappings, null, 2));
    return true;
  } catch (error) {
    console.error("Error adding link:", error);
    return false;
  }
}
