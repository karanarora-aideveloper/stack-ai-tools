import { Article, DeepArticleContent } from '../../lib/blog';
import { article1Claude37 } from './article-1-claude-3-7';
import { article2CursorVsWindsurf } from './article-2-cursor-vs-windsurf';
import { article3OpenAIO3 } from './article-3-openai-o3';
import { article4DevinVsOpenSource } from './article-4-devin-vs-open-source';
import { article5FluxVsMidjourney } from './article-5-flux-vs-midjourney';
import { article6FrontierVideo } from './article-6-frontier-video';
import { article7RealtimeVoice } from './article-7-realtime-voice';
import { article8WorkflowAgents } from './article-8-workflow-agents';
import { article9DeepSeekR1 } from './article-9-deepseek-r1';
import { article10GEO } from './article-10-geo-optimization';

export const allBreakingNewsArticles = [
  article1Claude37,
  article2CursorVsWindsurf,
  article3OpenAIO3,
  article4DevinVsOpenSource,
  article5FluxVsMidjourney,
  article6FrontierVideo,
  article7RealtimeVoice,
  article8WorkflowAgents,
  article9DeepSeekR1,
  article10GEO,
];

export const breakingNewsArticlesMetadata: Article[] = allBreakingNewsArticles.map(a => a.metadata);

export const breakingNewsArticlesContent: Record<string, DeepArticleContent> = allBreakingNewsArticles.reduce((acc, a) => {
  acc[a.metadata.slug] = a.content;
  return acc;
}, {} as Record<string, DeepArticleContent>);
