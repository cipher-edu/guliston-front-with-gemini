
const BASE_URL = 'https://api.guliston-mitsl.uz';

/**
 * URL manzillarini server talablariga muvofiq shakllantirish.
 */
const getUrl = (endpoint: string): string => {
  // Boshidagi va oxiridagi slashlarni olib tashlash
  const cleaned = endpoint.replace(/^\/+|\/+$/g, '');
  
  // 'api/' prefiksini tekshirish va qo'shish
  const path = cleaned.startsWith('api') ? cleaned : `api/${cleaned}`;
  
  // URL ning asosiy qismi va query parametrlarni ajratib olish
  const [basePath, query] = path.split('?');
  
  // Asosiy path oxirida slash bo'lishini ta'minlash (Django talabi)
  const normalizedPath = basePath.endsWith('/') ? basePath : `${basePath}/`;
  
  const finalUrl = query ? `${normalizedPath}?${query}` : normalizedPath;
  
  return `${BASE_URL}/${finalUrl}`;
};

export const api = {
  async post(endpoint: string, data: any) {
    const url = getUrl(endpoint);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Xatolik haqida ma\'lumot yo\'q');
        throw new Error(`Server xatosi (${response.status}): ${errorText}`);
      }

      return await response.json().catch(() => ({ success: true }));
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('So\'rov vaqti tugadi.');
      }
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('CORS yoki Tarmoq xatosi: Server so\'rovni bloklamoqda.');
      }
      
      throw error;
    }
  },

  async get(endpoint: string) {
    const url = getUrl(endpoint);
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 404) {
        throw new Error('404');
      }
      
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error: any) {
      console.error(`API Get Error [${url}]:`, error.message);
      throw error;
    }
  }
};
