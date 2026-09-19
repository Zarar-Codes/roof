export async function trackEvent(
  eventName: 'page_view' | 'cta_click' | 'phone_click' | 'quote_start' | 'quote_submit' | 'inspection_submit' | 'contact_submit',
  path: string = window.location.pathname,
  meta: Record<string, any> = {}
) {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventName, path, meta })
    });
  } catch (err) {
    // Non-blocking analytics logging
    console.debug('Analytics event failed to dispatch:', err);
  }
}
