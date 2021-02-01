import React from 'react';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '@/screens/Quiz';

export default function QuizOfTheGang({ externalDB }) {
  return (
    <>
      <ThemeProvider theme={externalDB.theme}>
        <QuizScreen
          externalQuestions={externalDB.questions}
          externalBg={externalDB.bg}
        />

        {/* <div>
        <pre style={{ color: 'red' }}>
          {JSON.stringify(externalDB.questions, null, 4)}
        </pre>
      </div> */}
      </ThemeProvider>
    </>
  );
}

export async function getServerSideProps(context: {
  query: { id: { split: (arg0: string) => [any, any] } };
}) {
  try {
    const [projectName, githubUser] = context.query.id.split('___');

    const externalDB = await fetch(
      `https://${projectName}.${githubUser}.vercel.app/api/db`,
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Failed to get data.');
      })
      .then((convertedResponse) => {
        return convertedResponse;
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(externalDB);
    // console.log(context.query.id);

    return {
      props: {
        externalDB,
        // githubUser,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
