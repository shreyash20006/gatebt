import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Self-contained, valid 1-page sample PDF Data URI for offline/demo mode (prevents external 404s)
export const DEMO_PDF_DATA_URI = 'data:application/pdf;base64,JVBERi0xLjQKJSCt4uDJCjEgMCBvYmoKPDwvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFI+PgplbmRvYmoKMiAwIG9iaiA8PC9UeXBlIC9QYWdlcyAvQ291bnQgMSAvS2lkcyBbMyAwIFJdID4+CmVuZG9iagozIDAgb2JqIDw8L1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA2MTIgNzkyXSAvQ29udGVudHMgNCAwIFI+PgplbmRvYmoKNCAwIG9iaiA8PC9MZW5ndGggNTU+PnN0cmVhbQpCVAovRiAxMiBUZgpCVCA3MCA3MDAgVEQgKEdhdGVCVCBQcmVwIC0gU3R1ZHkgTm90ZXMgUERGKSUgRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNQowMDAwMDAwMDAwDYAwMDAwIG4gCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCjAwMDAwMDAyMjEgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDUvUm9vdCAxIDAgUj4+CnN0YXJ0eHJlZgoyOTYKJSVFT0Y=';

export function getPublicDownloadUrl(filePath: string): string {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('example.supabase.co')) {
    // Demo / fallback self-contained PDF (prevents 404 errors)
    return DEMO_PDF_DATA_URI;
  }
  
  // Clean file path if it already includes 'notes/' bucket prefix
  const cleanPath = filePath.startsWith('notes/') ? filePath.replace(/^notes\//, '') : filePath;
  const { data } = supabase.storage.from('notes').getPublicUrl(cleanPath);
  return data.publicUrl;
}
