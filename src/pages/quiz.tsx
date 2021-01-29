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
import { WidgetLoading } from '@/styles/pages/quiz';

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
      <WidgetContent>
        <WidgetLoading>
          <img src="loading-ripple.gif" alt="loading" />
        </WidgetLoading>
      </WidgetContent>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  playerName,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative == question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  function handleCheckAnswer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsQuestionSubmited(true);

    setTimeout(() => {
      addResult(isCorrect);
      onSubmit();
      setIsQuestionSubmited(false);
      setSelectedAlternative(undefined);
    }, 3 * 1000);
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
            (alternative: React.ReactNode, alternativeIndex: never) => {
              const alternativeId = `alternative__${alternativeIndex}`;

              return (
                <WidgetTopic
                  key={alternativeId}
                  as="label"
                  htmlFor={alternativeId}
                >
                  <input
                    id={alternativeId}
                    name={questionId}
                    type="radio"
                    onChange={() => setSelectedAlternative(alternativeIndex)}
                  />
                  {` `}
                  {alternative}
                </WidgetTopic>
              );
            },
          )}

          {/* <pre>{JSON.stringify(question, null, 4)}</pre> */}

          <button type="submit" disabled={!hasAlternativeSelected}>
            CONFIRMAR
          </button>

          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}

          {/* <p>{selectedAlternative}</p> */}
        </form>
      </WidgetContent>
    </Widget>
  );
}

function ResultWidget({ results, playerName }) {
  return (
    <Widget>
      <WidgetHeader>
        <h1>🎉 Parabéns {playerName}</h1>
      </WidgetHeader>
      <WidgetContent>
        <p>
          Você acertou{' '}
          {results.reduce((accumulator: number, currentValue: boolean) => {
            const isHit = currentValue === true;

            if (isHit) return accumulator + 1;

            return accumulator;
          }, 0)}{' '}
          questões, confira seu resultado:
        </p>

        {/* <p>
          Você acertou {results.filter((x) => x).length} questões, confira seu
          resultado:
        </p> */}
        <ul>
          {results.map((result: boolean, index: never) => {
            const resultId = `${index + 1}`;
            return (
              <li key={resultId}>
                #{resultId} Resultado: {result === true ? ' Acertou' : ' Errou'}
              </li>
            );
          })}
        </ul>
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
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const playerName = router.query.name;

  function addResult(result: any) {
    setResults([...results, result]);
  }

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
              addResult={addResult}
            />

            <Footer />
          </>
        )}

        {screenState === screenStates.LOADING && <Loading />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} playerName={playerName} />
        )}
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/jpcmf/random-quiz" />
    </BackgroundImage>
  );
}
