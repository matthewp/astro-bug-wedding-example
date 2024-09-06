import { Client } from '@notionhq/client';
import type { Coming, DietaryRequirement } from '../utilities/types';

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

export async function submitRsvp({
  name,
  coming,
  dietaryRequirement,
  allergies,
  songChoice,
  specialRequirements
}: {
  name: string;
  coming: Coming;
  dietaryRequirement: DietaryRequirement;
  allergies: string;
  songChoice: string;
  specialRequirements: string;
}) {
  try {
    // const page = await notion.databases.retrieve({
    //   database_id: import.meta.env.NOTION_RSVP_DATABASE_ID
    // });
    // console.log(page);

    // return;

    const response = await notion.pages.create({
      parent: { database_id: import.meta.env.NOTION_RSVP_DATABASE_ID },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name
              }
            }
          ]
        },
        Coming: {
          select: {
            name: coming
          }
        },
        ['Dietary Requirement']: {
          select: {
            name: dietaryRequirement
          }
        },
        Allergies: {
          rich_text: [
            {
              text: {
                content: allergies
              }
            }
          ]
        },
        ['Song Choice']: {
          rich_text: [
            {
              text: {
                content: songChoice
              }
            }
          ]
        },
        ['Special Requirements']: {
          rich_text: [
            {
              text: {
                content: specialRequirements
              }
            }
          ]
        },
        Created: {
          date: {
            start: new Date().toISOString()
          }
        }
      }
    });
    return response;
  } catch (error) {
    console.error('Error creating page:', error);
    throw error;
  }
}
