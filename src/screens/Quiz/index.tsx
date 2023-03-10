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
import { WidgetLoading, AlternativesForm } from '@/styles/pages/quiz';
import BackLinkArrow from '@/components/BackLinkArrow';

// import db from '../../../db.json';

function Loading() {
  return (
    <Widget>
      <WidgetHeader>Loading...</WidgetHeader>
      <WidgetContent>
        <WidgetLoading>
          <img src="/loading-ripple.gif" alt="loading" />
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
  const isCorrect = selectedAlternative === question.answer;
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
        <BackLinkArrow href="/" />
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
          {question.description}, <strong>{playerName}</strong> ????
        </p>

        <AlternativesForm onSubmit={handleCheckAnswer}>
          {question.alternatives.map(
            (alternative: React.ReactNode, alternativeIndex: never) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSeleted = selectedAlternative === alternativeIndex;

              return (
                <WidgetTopic
                  key={alternativeId}
                  as="label"
                  htmlFor={alternativeId}
                  data-selected={isSeleted}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  <input
                    style={{ display: 'none' }}
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

          {isQuestionSubmited && isCorrect && <p>Voc?? acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Voc?? errou!</p>}

          {/* <p>{selectedAlternative}</p> */}
        </AlternativesForm>
      </WidgetContent>
    </Widget>
  );
}

function ResultWidget({ results, playerName }) {
  return (
    <Widget>
      <WidgetHeader>
        <h1>???? Parab??ns {playerName}</h1>
      </WidgetHeader>
      <WidgetContent>
        <p>
          Voc?? acertou{' '}
          {results.reduce((accumulator: number, currentValue: boolean) => {
            const isHit = currentValue === true;

            if (isHit) return accumulator + 1;

            return accumulator;
          }, 0)}{' '}
          quest??es, confira seu resultado:
        </p>

        {/* <p>
          Voc?? acertou {results.filter((x) => x).length} quest??es, confira seu
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

export default function Quiz({ externalQuestions, externalBg }) {
  const router = useRouter();
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];
  const playerName = router.query.name;
  const bg = externalBg;

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
    <BackgroundImage backgroundImage={bg}>
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
