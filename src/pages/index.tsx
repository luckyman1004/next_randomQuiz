import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GitHubCorner from '@/components/GitHubCorner';
import Input from '@/components/Input';

import {
  BackgroundImage,
  QuizContainer,
  Widget,
  WidgetHeader,
  WidgetContent,
} from '@/styles/pages/home';

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
            <h1>Desenvolvimento Web</h1>
          </WidgetHeader>
          <WidgetContent>
            <p>
              Teste os seus conhecimentos sobre o universo CSS e divirta-se com
              o Random Quiz!
            </p>
            <form onSubmit={handleStartQuiz}>
              <Input
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
              Dá uma olhada nesses <i>quizes</i> incríveis que o pessoal fez na
              Imersão React Next.js da Alura:
            </p>
          </WidgetContent>
        </Widget>

        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/jpcmf/random-quiz" />
    </BackgroundImage>
  );
}
