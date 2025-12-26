export interface OGPData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName?: string;
  favicon?: string;
}

/**
 * URLからOGP情報を取得する
 * ビルド時に実行される（SSG）
 */
export async function fetchOGP(url: string): Promise<OGPData | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; philomagi.dev OGP fetcher)',
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch OGP for ${url}: ${response.status}`);
      return null;
    }

    const html = await response.text();

    // OGPメタタグを抽出
    const ogpData: Partial<OGPData> = { url };

    // og:title
    const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
    if (titleMatch) {
      ogpData.title = decodeHTMLEntities(titleMatch[1]);
    } else {
      // fallback to <title>
      const titleTagMatch = html.match(/<title>([^<]+)<\/title>/i);
      if (titleTagMatch) {
        ogpData.title = decodeHTMLEntities(titleTagMatch[1]);
      }
    }

    // og:description
    const descMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
    if (descMatch) {
      ogpData.description = decodeHTMLEntities(descMatch[1]);
    } else {
      // fallback to meta description
      const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
      if (metaDescMatch) {
        ogpData.description = decodeHTMLEntities(metaDescMatch[1]);
      }
    }

    // og:image
    const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    if (imageMatch) {
      ogpData.image = resolveURL(imageMatch[1], url);
    }

    // og:site_name
    const siteNameMatch = html.match(/<meta\s+property=["']og:site_name["']\s+content=["']([^"']+)["']/i);
    if (siteNameMatch) {
      ogpData.siteName = decodeHTMLEntities(siteNameMatch[1]);
    }

    // favicon
    const faviconMatch = html.match(/<link\s+[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i);
    if (faviconMatch) {
      ogpData.favicon = resolveURL(faviconMatch[1], url);
    } else {
      // デフォルトのfaviconパスを試す
      const urlObj = new URL(url);
      ogpData.favicon = `${urlObj.origin}/favicon.ico`;
    }

    // 必須フィールドのチェック
    if (!ogpData.title) {
      console.warn(`No title found for ${url}`);
      ogpData.title = url;
    }

    if (!ogpData.description) {
      ogpData.description = '';
    }

    if (!ogpData.image) {
      ogpData.image = '';
    }

    return ogpData as OGPData;
  } catch (error) {
    console.error(`Error fetching OGP for ${url}:`, error);
    return null;
  }
}

/**
 * 相対URLを絶対URLに解決
 */
function resolveURL(href: string, baseURL: string): string {
  try {
    return new URL(href, baseURL).href;
  } catch {
    return href;
  }
}

/**
 * HTMLエンティティをデコード
 */
function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
  };

  return text.replace(/&(?:amp|lt|gt|quot|#39|apos);/g, (match) => entities[match] || match);
}
