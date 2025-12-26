import { createSignal, For } from "solid-js";

interface Article {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  category: string;
  tags: string[];
}

interface Props {
  articles: Article[];
}

export default function ArticleSearch(props: Props) {
  const [searchQuery, setSearchQuery] = createSignal("");
  const [selectedCategory, setSelectedCategory] = createSignal("all");

  // ユニークなカテゴリを取得
  const categories = () => {
    const uniqueCategories = new Set(props.articles.map(a => a.category));
    return Array.from(uniqueCategories);
  };

  // フィルタリングされた記事
  const filteredArticles = () => {
    const query = searchQuery().toLowerCase().trim();
    const category = selectedCategory();

    return props.articles.filter(article => {
      // カテゴリフィルタ
      const categoryMatch = category === "all" || article.category === category;

      // 検索クエリフィルタ
      let searchMatch = true;
      if (query) {
        const titleMatch = article.title.toLowerCase().includes(query);
        const tagsMatch = article.tags.some(tag =>
          tag.toLowerCase().includes(query)
        );
        searchMatch = titleMatch || tagsMatch;
      }

      return categoryMatch && searchMatch;
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div class="space-y-8">
      {/* 検索ボックス */}
      <section class="max-w-2xl mx-auto">
        <div class="relative">
          <input
            type="text"
            placeholder="タイトルやタグで検索..."
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            class="w-full px-6 py-4 pl-14 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          />
          <svg
            class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery() && (
            <button
              onClick={clearSearch}
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="検索をクリア"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {searchQuery() && (
          <div class="mt-2 text-sm text-gray-400 text-center">
            {filteredArticles().length}件の記事が見つかりました
          </div>
        )}
      </section>

      {/* カテゴリフィルタ */}
      <section class="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setSelectedCategory("all")}
          class={`px-6 py-3 rounded-lg transition-all duration-300 font-medium tracking-wide uppercase text-sm ${
            selectedCategory() === "all"
              ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border border-cyan-500 shadow-lg shadow-cyan-500/25"
              : "bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800 hover:text-gray-300 hover:border-gray-700"
          }`}
        >
          すべて
        </button>
        <For each={categories()}>
          {(category) => (
            <button
              onClick={() => setSelectedCategory(category)}
              class={`px-6 py-3 rounded-lg transition-all duration-300 font-medium tracking-wide uppercase text-sm ${
                selectedCategory() === category
                  ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border border-cyan-500 shadow-lg shadow-cyan-500/25"
                  : "bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800 hover:text-gray-300 hover:border-gray-700"
              }`}
            >
              {category}
            </button>
          )}
        </For>
      </section>

      {/* 記事一覧 */}
      <section class="space-y-8">
        {filteredArticles().length === 0 ? (
          <div class="text-center py-12">
            <p class="text-gray-400 text-lg">該当する記事がありません。</p>
          </div>
        ) : (
          <div class="grid gap-8 md:gap-12">
            <For each={filteredArticles()}>
              {(article) => (
                <article class="group border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-800/90 hover:to-gray-900/90">
                  <div class="space-y-4">
                    {/* Article Header */}
                    <div class="space-y-2">
                      <div class="flex flex-wrap gap-2 items-center text-sm">
                        <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full font-medium">
                          {article.category}
                        </span>
                        <time
                          datetime={article.publishDate}
                          class="text-gray-400"
                        >
                          {new Date(article.publishDate).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>

                      <h2 class="text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        <a href={`/articles/${article.slug}`} class="hover:no-underline">
                          {article.title}
                        </a>
                      </h2>
                    </div>

                    {/* Article Description */}
                    <p class="text-gray-300 text-lg leading-relaxed">
                      {article.description}
                    </p>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div class="flex flex-wrap gap-2">
                        <For each={article.tags}>
                          {(tag) => (
                            <span class="px-2 py-1 text-sm bg-gray-800 text-gray-300 rounded border border-gray-700">
                              #{tag}
                            </span>
                          )}
                        </For>
                      </div>
                    )}

                    {/* Read More Link */}
                    <div class="pt-2">
                      <a
                        href={`/articles/${article.slug}`}
                        class="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium transition-colors group"
                      >
                        記事を読む
                        <svg
                          class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              )}
            </For>
          </div>
        )}
      </section>
    </div>
  );
}
