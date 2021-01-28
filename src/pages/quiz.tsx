import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GitHubCorner from '@/components/GitHubCorner';

import {
  BackgroundImage,
  QuizContainer,
  Widget,
  WidgetHeader,
  WidgetContent,
  WidgetTopic,
} from '@/styles/pages/home';

import db from '../../db.json';

// interface Question {
//   image: string;
//   title: string;
//   description: string;
//   answer: boolean;
//   alternatives: [];
// }
// interface Questions {
//   questions: Question[];
// }

function Loading() {
  return (
    <Widget>
      <WidgetHeader>Loading...</WidgetHeader>
      <WidgetContent>spinner?</WidgetContent>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  playerName,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;

  function handleCheckAnswer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(e.target);

    onSubmit();
  }

  return (
    <Widget>
      <WidgetHeader>
        <h1>
          Pergunta {questionIndex + 1} de {totalQuestions}
        </h1>
      </WidgetHeader>

      <img
        src={question.image}
        alt="description"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
      />

      <WidgetContent>
        <h2>{question.title}</h2>
        <p>
          {question.description}, <strong>{playerName}</strong> 🌚
        </p>

        <form onSubmit={handleCheckAnswer}>
          {question.alternatives.map(
            (alternative: React.ReactNode, index: never) => {
              const alternativeId = `alternative__${index}`;

              return (
                <WidgetTopic
                  key={alternativeId}
                  as="label"
                  htmlFor={alternativeId}
                >
                  <input id={alternativeId} name={questionId} type="radio" />
                  {` `}
                  {alternative}
                </WidgetTopic>
              );
            },
          )}

          {/* <pre>{JSON.stringify(question, null, 4)}</pre> */}

          <button type="submit">CONFIRMAR</button>
        </form>
      </WidgetContent>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function Quiz() {
  const router = useRouter();
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const playerName = router.query.name;

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  function handleQuizSubmit() {
    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <BackgroundImage backgroundImage={db.bg}>
      <QuizContainer>
        <Header />

        {screenState === screenStates.QUIZ && (
          <>
            <QuestionWidget
              questionIndex={questionIndex}
              question={question}
              totalQuestions={totalQuestions}
              playerName={playerName}
              onSubmit={handleQuizSubmit}
            />

            <Footer />
          </>
        )}

        {screenState === screenStates.LOADING && <Loading />}

        {screenState === screenStates.RESULT && (
          <Widget>
            <WidgetHeader>Parabéns {playerName} 🎉</WidgetHeader>
            <WidgetContent>Você acertou X questões, parabéns!</WidgetContent>
          </Widget>
        )}
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/jpcmf/random-quiz" />
    </BackgroundImage>
  );
}
