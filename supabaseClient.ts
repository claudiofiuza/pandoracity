
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const supabaseUrl = 'https://stbspomkgcfqddizueyl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YnNwb21rZ2NmcWRkaXp1ZXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MTMzNjEsImV4cCI6MjA4NjI4OTM2MX0.zTqI4U3aAKxcsSxB87e4Lg9_orgFuxabb2eddDc50OQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
