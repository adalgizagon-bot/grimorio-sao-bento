export function checkoutUrl(value = '') {
  try { const url = new URL(value); return url.protocol === 'https:' && (url.hostname === 'pay.cakto.com.br' || url.hostname === 'checkout.cakto.com.br') && url.pathname.length > 1 ? url.href : null; } catch { return null; }
}
export function whatsappUrl(value = '') {
  return /^[1-9]\d{9,14}$/.test(value) ? `https://wa.me/${value}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre o Grimório de São Bento.')}` : null;
}
export function httpsUrl(value = '') { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; } }
