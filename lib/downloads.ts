import { getPublicDownloadUrl } from '@/lib/supabase/client';

export async function handleDirectDownload(
  filePath: string,
  title: string,
  resourceId?: string
) {
  if (!filePath || filePath === '#') {
    alert('Resource file URL is currently being updated. Please check back shortly!');
    return;
  }

  // 1. Track download analytics asynchronously
  if (resourceId) {
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId }),
      }).catch((err) => console.warn('Download tracking error:', err));
    } catch (e) {
      console.warn('Track call error', e);
    }
  }

  // 2. Resolve final public URL
  const downloadUrl = filePath.startsWith('http') || filePath.startsWith('data:')
    ? filePath
    : getPublicDownloadUrl(filePath);

  // 3. Initiate browser download cleanly
  try {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('download', `${title.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  }
}
