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
import { doc, collection, addDoc, getDoc, setDoc } from "firebase/firestore";
import reddit from "@app/shared/constants/reddit_sample_filtered_1800.json";
import { ArrowContainer, SurveyForm } from "@app/pages/survey";
import { Response, RedditQuestion } from "@app/@types/survey";

const RedditSurvey = () => {
  const [questions, setQuestions] = useState<RedditQuestion[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [index, setIndex] = useState(1);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [argumentIndex, setArgumentIndex] = useState(1);

  // @ts-ignore
  const total = reddit.length;
  useEffect(() => {
    const getCount = async () => {
      const docRef = doc(db, "indexes", "reddit");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let count = docSnap.data().count;
        let arr = [];
        for (let i = count * 10; i < count * 10 + 10; i++) {
          arr.push(i % total);
        }
        let qs: RedditQuestion[] = [];
        arr.forEach((e, _) => {
          // @ts-ignore
          let redditObj = reddit[e];
          let questionObj = {
            title: redditObj["title"],
            context: redditObj["selftext"],
            response: redditObj["good_comments"][0]["body"],
            jsonIndex: e,
          };
          qs.push(questionObj);
        });

        let copy: Response[] = [];
        [...qs].forEach(() => {
          copy.push({
            classification: "",
            novelty: 1,
            explanation: "",
            evaluation: [],
            showGenerated: false,
            postClassification: "",
            postNovelty: 1,
            postExplanation: "",
            argumentFinished: false,
          });
        });

        setQuestions(qs);
        setResponses(copy);
        await setDoc(docRef, { count: count + 1 });
      }
    };
    getCount();
  }, []);
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
  const updateIndex = async (adder: number) => {
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

    addDoc(collection(db, "redditResponses"), docData);
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
                  response.classification != "" &&
                  response.explanation != "" &&
                  response.argumentFinished
                );
              }}
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
              argumentIndex={argumentIndex}
              setArgumentIndex={updateArgumentIndex}
              questions={[]}
              updateIndex={updateIndex}
            />
          )}
        </ContainerInner>
      </Container>
    </div>
  );
};

export default RedditSurvey;
