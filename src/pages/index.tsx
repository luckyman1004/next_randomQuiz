import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import {
  BackgroundImage,
  QuizContainer,
  Widget,
  WidgetHeader,
  WidgetContent,
} from '@/styles/pages/home';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GitHubCorner from '@/components/GitHubCorner';

import db from '../../db.json';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  function handleStartQuiz(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/quiz/?name=${name}`);
  }

  return (
    <BackgroundImage backgroundImage={db.bg}>
      <QuizContainer>
        <Header />

        <Widget>
          <WidgetHeader>
            <h1>Random Quiz</h1>
          </WidgetHeader>
          <WidgetContent>
            <p>
              Teste os seus conhecimentos sobre o universo Marvel e divirta-se
              criando o seu AluraQuiz!
            </p>
            <form onSubmit={handleStartQuiz}>
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Diz aí seu nome pra jogar :)"
                required
              />
              <button type="submit" disabled={name.length === 0}>
                JOGAR
              </button>
            </form>
          </WidgetContent>
        </Widget>

        <Widget>
          <WidgetContent>
            <h1>Quizes da galera</h1>
            <p>
              Dá uma olhada nesses quizes incríveis que o pessoal da Imersão
              Alguma coisa fez:
            </p>
          </WidgetContent>
        </Widget>

        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/jpcmf" />
    </BackgroundImage>
  );
}
