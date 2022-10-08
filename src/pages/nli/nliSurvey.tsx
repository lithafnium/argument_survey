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

import { ArrowContainer, SurveyForm } from "@app/pages/survey";
import { Button } from "@app/shared/components/index";

import { db } from "@app/firebase";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import snli from "@app/shared/constants/snli.json";
import mnli from "@app/shared/constants/mnli.json";

interface Response {
  classification: string;
  novelty: string;
  explanation: string;
}

interface NliQuestion {
  context: string;
  hypothesis: string;
  label: string;
}

const NliSurvey = () => {
  const [questions, setQuestions] = useState<NliQuestion[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [index, setIndex] = useState(1);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  // @ts-ignore
  const snlitotal = snli.length;
  const mnlitotal = mnli.length;
  useEffect(() => {
    let arr = [];
    while (arr.length < 5) {
      let r = Math.floor(Math.random() * snlitotal) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    while (arr.length < 10) {
      let r = Math.floor(Math.random() * mnlitotal) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    // console.log(reddit[0]);
    let qs: NliQuestion[] = [];
    arr.forEach((e, i) => {
      // @ts-ignore
      let obj;
      if (i < 5) {
        obj = snli[e];
      } else {
        obj = mnli[e];
      }
      let label =
        // @ts-ignore
        obj["label_counter"]["c"] > obj["label_counter"]["e"]
          ? "False"
          : "True";
      let questionObj = {
        context: obj["example"]["premise"],
        hypothesis: obj["example"]["hypothesis"],
        label,
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
        questionTitle: question.context,
        questionHypothesis: question.hypothesis,
        questionLabel: question.label,
        classification: val.classification,
        novelty: val.novelty,
        explanation: val.explanation,
      };
    });

    let docData = {
      responses: firebaseOutput,
      email: email,
    };

    addDoc(collection(db, "nliResponses"), docData);
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
                <Highlight>Context:</Highlight> {questions[index - 1].context}
              </Content>
              <Content>
                <Highlight>Hypothesis:</Highlight>{" "}
                {questions[index - 1].hypothesis}
              </Content>
              <Content>
                <Highlight>Label:</Highlight> {questions[index - 1].label}
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
          )}
        </ContainerInner>
      </Container>
    </div>
  );
};

export default NliSurvey;
