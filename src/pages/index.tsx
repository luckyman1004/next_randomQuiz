import Head from "next/head";

import {
  BackgroundImage,
  QuizContainer,
  Widget,
  WidgetHeader,
  WidgetContent,
} from "@/styles/pages/home";

import Footer from "@/components/Footer";
import GitHubCorner from "@/components/GitHubCorner";

import db from "../../db.json";

export default function Home() {
  return (
    <BackgroundImage backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <WidgetHeader>
            <h1>Random Quiz</h1>
          </WidgetHeader>
          <WidgetContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
              laudantium ipsum molestias quasi ratione, quis maiores saepe,
              molestiae neque asperiores porro laboriosam praesentium id odio!
              Cumque hic accusantium commodi similique.
            </p>
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
