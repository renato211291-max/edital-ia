import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

/**
 * Cliente Supabase para uso em componentes do lado do cliente (browser).
 * Use em componentes 'use client'.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
