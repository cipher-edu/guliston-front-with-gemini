
const BASE_URL = 'https://api.guliston-mitsl.uz';
const REQUEST_TIMEOUT = 15000;

/**
 * URL manzilini API talablariga muvofiq normalizatsiya qiladi.
 */
const getUrl = (endpoint: string): string => {
  const [path, query] = endpoint.split('?');
  // path oxiridan '/'ni olib tashlaymiz va keyin aniq bitta '/' qo'shamiz
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  const prefix = cleanPath.startsWith('api') ? '' : 'api/';
  const normalizedPath = `${cleanPath}/`;
  
  return `${BASE_URL}/${prefix}${normalizedPath}${query ? `?${query}` : ''}`;
};

export const api = {
  async get(endpoint: string) {
    const url = getUrl(endpoint);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      
      clearTimeout(id);

      if (!response.ok) {
        if (response.status === 404) throw new Error('404');
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || `HTTP Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error: any) {
      clearTimeout(id);
      if (error.name === 'AbortError') {
        throw new Error('Soʻrov vaqti tugadi (Timeout).');
      }
      throw error;
    }
  },

  async post(endpoint: string, data: any) {
    const url = getUrl(endpoint);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(url, {
        method: 'POST',
        signal: controller.signal,
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      });

      clearTimeout(id);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || errData.message || `Server xatosi: ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      clearTimeout(id);
      throw error;
    }
  }
};
