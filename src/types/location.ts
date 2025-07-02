import { z } from 'zod';

// Types pour les coordonnées et emplacements
export const coordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export type Coordinates = z.infer<typeof coordinatesSchema>;

export const locationTypeSchema = z.enum([
  'headquarters',  // Siège social
  'branch',        // Succursale
  'store',         // Point de vente
  'warehouse',     // Entrepôt
  'factory',       // Unité de production
  'other',         // Autre
]);

export type LocationType = z.infer<typeof locationTypeSchema>;

export const locationSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: locationTypeSchema,
  address: z.string().optional(),
  coordinates: coordinatesSchema,
});

export type Location = z.infer<typeof locationSchema>;
