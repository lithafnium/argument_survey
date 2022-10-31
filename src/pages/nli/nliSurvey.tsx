import React, { useState, useEffect } from "react";
import {
  Container,
  ContainerInner,
  Content,
  Highlight,
  ContentCard,
} from "@app/pages/surveyStyles";

import { ArrowContainer, SurveyForm } from "@app/pages/survey";

import { db } from "@app/firebase";
import { doc, collection, addDoc, setDoc, getDoc } from "firebase/firestore";
import nli_train from "@app/shared/constants/nli_train_test.json";
import { Response, NliQuestion } from "@app/@types/survey";
import { CATEGORIES } from "@app/shared/constants/survey";

const NliSurvey = () => {
  const [questions, setQuestions] = useState<NliQuestion[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [index, setIndex] = useState(1);
  const [finished, setFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [argumentIndex, setArgumentIndex] = useState(1);

  // @ts-ignore
  const nlitotal = Object.keys(nli_train["context"]).length;
  useEffect(() => {
    const getCount = async () => {
      const nliRef = doc(db, "indexes", "nli");
      const nliSnap = await getDoc(nliRef);

      if (nliSnap.exists()) {
        let nliCount = nliSnap.data().index;
        // let arr = [];
        let qs: NliQuestion[] = [];
        for (let i = nliCount * 10; i < nliCount * 10 + 10; i++) {
          let questionObj = {
            // @ts-ignore
            context: nli_train["context"][i % nlitotal],
            // @ts-ignore
            hypothesis: nli_train["hypothesis"][i % nlitotal],
            // @ts-ignore
            label: nli_train["label"][i % nlitotal],
            // @ts-ignore
            isSnli:
              // @ts-ignore
              nli_train["dataset"][i % nlitotal] === "snli" ? true : false,
            jsonIndex: i % nlitotal,
            // @ts-ignore
            counterarguments: nli_train["counterargument"][i % nlitotal],
          };
          qs.push(questionObj);
        }

        let copy: Response[] = [];
        [...qs].forEach((e, _) => {
          let jsonIndex = e.jsonIndex;
          // @ts-ignore
          // let evaluation = nli_train["counterargument"][jsonIndex];
          let evaluation = [];
          for (let i = 0; i < 4; i++) {
            evaluation.push({
              clarity: 1,
              coherence: 1,
              novelty: 1,
              relevance: 1,
            });
          }
          copy.push({
            classification: "",
            novelty: 1,
            explanation: "",
            evaluation: evaluation,
            showGenerated: false,
            postClassification: "",
            postNovelty: 1,
            postExplanation: "",
            argumentFinished: false,
          });
        });
        setQuestions(qs);
        setResponses(copy);
        await setDoc(nliRef, { index: nliCount + 1 });
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
      setArgumentIndex(1);
    }
  };

  const updateArgumentIndex = (adder: number) => {
    if (
      // @ts-ignore
      (argumentIndex + adder <= responses[index - 1]["evaluation"].length &&
        adder > 0) ||
      (argumentIndex + adder >= 1 && adder < 0)
    ) {
      if (argumentIndex + adder == responses[index - 1]["evaluation"].length) {
        let copy = [...responses];
        copy[index - 1]["argumentFinished"] = true;
        setResponses(copy);
      }
      setArgumentIndex(argumentIndex + adder);
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
              header={"Question"}
              index={index}
              updateIndex={updateIndex}
              length={questions.length}
              disableForward={() => {
                let response = responses[index - 1];
                return (
                  (response.classification != "" &&
                    response.explanation != "" &&
                    response.argumentFinished) ||
                  response.classification === CATEGORIES[3]
                );
              }}
            />
          )}
          {questions.length > 0 && (
            <ContentCard>
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
            </ContentCard>
          )}
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
              argumentIndex={argumentIndex}
              setArgumentIndex={updateArgumentIndex}
              updateIndex={updateIndex}
              questions={questions}
            />
          )}
        </ContainerInner>
      </Container>
    </div>
  );
};

export default NliSurvey;
