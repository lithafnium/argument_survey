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
import { doc, collection, addDoc, setDoc, getDoc } from "firebase/firestore";
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
  jsonIndex: number;
  isSnli: boolean;
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
    const getCount = async () => {
      const mnliRef = doc(db, "indexes", "mnli");
      const snliRef = doc(db, "indexes", "snli");
      const mnliSnap = await getDoc(mnliRef);
      const snliSnap = await getDoc(snliRef);

      if (mnliSnap.exists() && snliSnap.exists()) {
        let mnliCount = mnliSnap.data().count;
        let snliCount = snliSnap.data().count;

        let arr = [];

        for (let i = mnliCount * 5; i < mnliCount * 5 + 5; i++) {
          arr.push(i % mnlitotal);
        }
        for (let i = snliCount * 5; i < snliCount * 5 + 5; i++) {
          arr.push(i % snlitotal);
        }

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
            isSnli: i < 5,
            jsonIndex: e,
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
        await setDoc(mnliRef, { count: mnliCount + 1 });
        await setDoc(snliRef, { count: snliCount + 1 });
      }
    };

    getCount();
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
        isSnli: question.isSnli,
        jsonIndex: question.jsonIndex,
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
          {responses.length > 0 && (
            <ArrowContainer
              index={index}
              updateIndex={updateIndex}
              length={questions.length}
              responses={responses}
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
