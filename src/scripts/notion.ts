import { Client } from '@notionhq/client';

interface QA {
  question: string;
  answer: string;
}

type Result = {
  [key: string]: QA[];
};

const notion = new Client({ auth: import.meta.env.NOTION_INTEGRATION_SECRET });

export async function getFaqs(): Promise<Result> {
  const page = await notion.pages.retrieve({
    page_id: import.meta.env.NOTION_FAQ_PAGE_ID
  });
  const blocks = await notion.blocks.children.list({
    block_id: page.id
  });

  let faq: { type: string; text: string }[] = blocks.results.reduce(
    (acc: any, curr: any) => {
      // category
      if (curr?.type === 'heading_2') {
        acc.push({
          type: 'category',
          text: curr.heading_2.rich_text[0].plain_text
        });
        // question
      } else if (curr?.type === 'heading_3') {
        acc.push({
          type: 'question',
          text: curr.heading_3.rich_text[0].plain_text
        });
        // answer
      } else if (
        curr?.type === 'paragraph' &&
        !!curr.paragraph?.rich_text.length
      ) {
        acc.push({
          type: 'answer',
          text: curr.paragraph?.rich_text[0]?.plain_text
        });
      }

      return acc;
    },
    []
  );

  const result: Result = {};
  let currentCategory = '';
  let lastQuestion: QA | null = null;

  faq.forEach((item) => {
    if (item.type === 'category') {
      currentCategory = item.text;
      result[currentCategory] = [];
    } else if (item.type === 'question') {
      lastQuestion = { question: item.text, answer: '' };
      if (currentCategory) {
        result[currentCategory].push(lastQuestion);
      }
    } else if (item.type === 'answer' && lastQuestion) {
      lastQuestion.answer = item.text;
    }
  });

  return result;
}
