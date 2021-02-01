import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GitHubCorner from '@/components/GitHubCorner';
import Input from '@/components/Input';
import Link from '@/components/Link';

import {
  BackgroundImage,
  QuizContainer,
  Widget,
  WidgetHeader,
  WidgetContent,
  WidgetTopic,
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

        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
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

        <Widget
          as={motion.section}
          transition={{ delay: 0.3, duration: 0.3 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <WidgetContent>
            <h1>Quizes da galera</h1>
            <p>
              Dá uma olhada nesses <i>quizes</i> incríveis que o pessoal fez na
              Imersão React Next.js da Alura:
            </p>
            <ul>
              {db.external.map((externalLink) => {
                const [projectName, githubUser] = externalLink
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={externalLink}>
                    <WidgetTopic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                      // target="_blank"
                      rel="noreferrer"
                    >
                      {projectName}/{githubUser}
                    </WidgetTopic>
                  </li>
                );
              })}
            </ul>
          </WidgetContent>
        </Widget>

        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/jpcmf/random-quiz" />
    </BackgroundImage>
  );
}
