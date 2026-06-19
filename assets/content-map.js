const contentSections = [
  {
    id: "sports",
    title: "体育赛事",
    tags: ["足球", "篮球", "网球"],
    url: "https://portal-app-hth.com.cn/sports",
    keywords: ["华体会", "赛事直播", "比分"],
    items: [
      { name: "英超联赛", popularity: 98 },
      { name: "NBA季后赛", popularity: 95 }
    ]
  },
  {
    id: "esports",
    title: "电竞专区",
    tags: ["LOL", "DOTA2", "CSGO"],
    url: "https://portal-app-hth.com.cn/esports",
    keywords: ["华体会", "电竞赛事", "竞猜"],
    items: [
      { name: "S13全球总决赛", popularity: 92 },
      { name: "TI12邀请赛", popularity: 89 }
    ]
  },
  {
    id: "casino",
    title: "真人娱乐",
    tags: ["百家乐", "轮盘", "德州扑克"],
    url: "https://portal-app-hth.com.cn/casino",
    keywords: ["华体会", "真人视讯", "荷官"],
    items: [
      { name: "VIP百家乐", popularity: 87 },
      { name: "极速轮盘", popularity: 84 }
    ]
  }
];

const globalKeywords = ["华体会", "体育投注", "电竞竞猜", "真人娱乐", "优惠活动"];

function searchContent(query, sections) {
  const results = [];
  const lowerQuery = query.toLowerCase();

  sections.forEach(section => {
    const matchTags = section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const matchKeywords = section.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));
    const matchItems = section.items.some(item => item.name.toLowerCase().includes(lowerQuery));

    if (matchTags || matchKeywords || matchItems) {
      results.push({
        id: section.id,
        title: section.title,
        url: section.url,
        relevance: calculateRelevance(query, section)
      });
    }
  });

  results.sort((a, b) => b.relevance - a.relevance);
  return results;
}

function calculateRelevance(query, section) {
  let score = 0;
  const lowerQuery = query.toLowerCase();

  section.tags.forEach(tag => {
    if (tag.toLowerCase().includes(lowerQuery)) score += 10;
  });
  section.keywords.forEach(kw => {
    if (kw.toLowerCase().includes(lowerQuery)) score += 15;
  });
  section.items.forEach(item => {
    if (item.name.toLowerCase().includes(lowerQuery)) score += item.popularity * 0.1;
  });

  if (globalKeywords.some(kw => kw.toLowerCase() === lowerQuery)) {
    score += 20;
  }

  return Math.round(score);
}

function filterByTag(tag, sections) {
  const lowerTag = tag.toLowerCase();
  return sections.filter(section =>
    section.tags.some(t => t.toLowerCase() === lowerTag)
  ).map(section => ({
    id: section.id,
    title: section.title,
    url: section.url,
    matchedItems: section.items.filter(item =>
      item.name.toLowerCase().includes(lowerTag)
    )
  }));
}

function getSectionById(id, sections) {
  return sections.find(section => section.id === id) || null;
}

function getAllKeywords(sections) {
  const keywordSet = new Set(globalKeywords);
  sections.forEach(section => {
    section.keywords.forEach(kw => keywordSet.add(kw));
  });
  return Array.from(keywordSet);
}

const exampleQuery = "华体会";
const exampleResults = searchContent(exampleQuery, contentSections);
console.log(`搜索 "${exampleQuery}" 的结果:`, exampleResults);

const tagExample = filterByTag("足球", contentSections);
console.log("按标签过滤的结果:", tagExample);

console.log("所有关键词:", getAllKeywords(contentSections));

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentSections,
    globalKeywords,
    searchContent,
    filterByTag,
    getSectionById,
    getAllKeywords
  };
}