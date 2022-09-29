import React, { useState, useEffect } from "react";
import {
  Container,
  ContainerInner,
  ContentContainer,
  Group,
  Arrow,
  Arrows,
  Content,
  List,
  Highlight,
  SelectionRow,
  Feedback,
  Divider,
  RowContainer,
} from "@app/pages/surveyStyles";
import { db } from "@app/firebase";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import reddit from "@app/shared/constants/reddit_sample_filtered_1800.json";
import { ArrowContainer, SurveyForm } from "@app/pages/survey";

interface Response {
  classification: string;
  novelty: string;
  explanation: string;
}

interface RedditQuestion {
  title: string;
  context: string;
  response: string;
}

const RedditSurvey = () => {
  const [questions, setQuestions] = useState<RedditQuestion[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [index, setIndex] = useState(1);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  // @ts-ignore
  const total = reddit.length;
  useEffect(() => {
    let arr = [];
    while (arr.length < 10) {
      let r = Math.floor(Math.random() * total) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    // console.log(reddit[0]);
    let qs: RedditQuestion[] = [];
    arr.forEach((e, _) => {
      // @ts-ignore
      let redditObj = reddit[e];
      let questionObj = {
        title: redditObj["title"],
        context: redditObj["selftext"],
        response: redditObj["good_comments"][0]["body"],
      };
      qs.push(questionObj);
    });

    let copy: Response[] = [];
    [...qs].forEach(() => {
      copy.push({
        classification: "",
        novelty: "",
        explanation: "",
      });
    });

    setQuestions(qs);
    setResponses(copy);
  }, []);

  const updateIndex = (adder: number) => {
    if (
      // @ts-ignore
      (index + adder <= questions.length && adder > 0) ||
      (index + adder >= 1 && adder < 0)
    ) {
      let next = index + adder;
      if (index + adder == questions.length) {
        setFinished(true);
      } else {
        setFinished(false);
      }
      setIndex(index + adder);
    }
  };

  const handleSubmit = () => {
    let firebaseOutput = responses.map((val, index) => {
      let question = questions[index];

      return {
        questionTitle: question.title,
        questionContext: question.context,
        questionResponse: question.response,
        classification: val.classification,
        novelty: val.novelty,
        explanation: val.explanation,
      };
    });

    let docData = {
      responses: firebaseOutput,
      email: email,
    };

    addDoc(collection(db, "redditResponses"), docData);
    setSubmitted(true);
  };

  return (
    <div>
      <Container>
        <ContainerInner>
          {questions.length > 0 && (
            <ArrowContainer
              index={index}
              updateIndex={updateIndex}
              length={questions.length}
            />
          )}
          {questions.length > 0 && (
            <div>
              <Content>
                <Highlight>Title:</Highlight> {questions[index - 1].title}
              </Content>
              <Content>
                <Highlight>Context:</Highlight> {questions[index - 1].context}
              </Content>
              <Content>
                <Highlight>Response:</Highlight> {questions[index - 1].response}
              </Content>
            </div>
          )}
          <Divider />
          {responses.length > 0 && (
            <SurveyForm
              responses={responses}
              setResponses={setResponses}
              index={index}
              email={email}
              setEmail={setEmail}
              submitted={submitted}
              finished={finished}
              handleSubmit={handleSubmit}
            />
          )}{" "}
        </ContainerInner>
      </Container>
    </div>
  );
};

export default RedditSurvey;
