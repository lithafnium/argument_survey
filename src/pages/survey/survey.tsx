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
} from "./styles";
import { Button } from "@app/shared/components/index";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import output from "@app/shared/constants/output2.json";
import Hypotheses from "./hypotheses";
import Checkbox from "./checkbox";

import sha256 from "crypto-js/sha256";

import { db } from "@app/firebase";
import { doc, collection, addDoc, setDoc } from "firebase/firestore";
import { Highlight2, Highlight1, NumberedList } from "@app/pages/home/styles";
import { Input } from "@app/shared/components/index";

import moment from "moment";

type arrayName = "hypotheses" | "highlightHypotheses";

interface Answer {
  hypotheses: Hypothesis[];
  highlightHypotheses: Hypothesis[];
}

interface Hypothesis {
  hypothesis: string;
  notes: string;
  topbottom: boolean[][][];
  groupCountTop: number;
  groupCountBottom: number;
  intro: string;
  topThree: Set<string>;
  bottomThree: Set<string>;
}

interface Group {
  GroupA: string[];
  GroupB: string[];
}

const options = [
  "Compared to sentences from Group B, each sentence from Group A",
  "Compared to sentences from Group A, each sentence from Group B",
  "Each sentence from Group A",
  "Each sentence from Group B",
];

const Survey = () => {
  const groupColors = ["#C67838", "#7C9647"];
  //@ts-ignore
  const [hypotheses, setHypotheses] = useState<Array<Answer>>(null);
  const [questionHighlight, setQuestionHighlight] = useState(
    new Array(output.length).fill(false)
  );
  const [showInstructions, toggleInstructions] = useState(false);
  const [hypothesisIndex, setHypothesisIndex] = useState(0);
  const [current, setCurrent] = useState<Group>({ GroupA: [], GroupB: [] });
  const [index, setIndex] = useState(1);
  const [workerId, setWorkerId] = useState("");
  const [preview, setPreview] = useState(false);
  const [validHit, setValidHit] = useState(false);
  const [finished, setFinished] = useState(false);
  const [hypothesisIntro, setHypothesisIntro] = useState(options[0]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [startTime, setStartTime] = useState(null);
  const [isIndividual, setIsIndividual] = useState(false);

  useEffect(() => {
    // @ts-ignore
    setStartTime(moment());
  }, []);
  // TODO: REMOVE
  const [feedback, setFeedback] = useState("Enter in your feedback here");

  // @ts-ignore
  const total = output.length;
  useEffect(() => {
    // @ts-ignore
    let copy = [];
    // @ts-ignore
    [...output].forEach(() => {
      copy.push({
        hypotheses: [
          {
            hypothesis: "",
            notes: "",
            topbottom: [
              [
                [false, false],
                [false, false],
                [false, false],
                [false, false],
                [false, false],
              ],
              [
                [false, false],
                [false, false],
                [false, false],
                [false, false],
                [false, false],
              ],
            ],
            groupCountTop: 0,
            groupCountBottom: 0,
            intro: options[0],
            topThree: new Set(),
            bottomThree: new Set(),
          },
        ],
        highlightHypotheses: [
          {
            hypothesis: "",
            notes: "",
            topbottom: [
              [
                [false, false],
                [false, false],
                [false, false],
                [false, false],
                [false, false],
              ],
              [
                [false, false],
                [false, false],
                [false, false],
                [false, false],
                [false, false],
              ],
            ],
            groupCountTop: 0,
            groupCountBottom: 0,
            intro: options[0],
            topThree: new Set(),
            bottomThree: new Set(),
          },
        ],
      });
    });
    // @ts-ignore
    setHypotheses(copy);
    setCurrent({
      // @ts-ignore
      GroupA: output[0].A,
      // @ts-ignore
      GroupB: output[0].B,
    });

    // const urlParams = new URLSearchParams(window.location.search);
    // setValidHit(!!urlParams.get("hitId"));

    // let assignmentId = urlParams.get("assignmentId");
    // setPreview(!assignmentId || assignmentId === "ASSIGNMENT_ID_NOT_AVAILABLE");

    // if (urlParams.has("workerId")) {
    //   // @ts-ignore
    //   setWorkerId(sha256(urlParams.get("workerId")).toString());
    // }
  }, []);

  const updateIndex = (adder: number) => {
    if (
      // @ts-ignore
      (index + adder <= output.length && adder > 0) ||
      (index + adder >= 1 && adder < 0)
    ) {
      let next = index + adder;
      if (questionHighlight[next - 1]) {
        setCurrent({
          GroupA: output[next - 1].A_Highlight,
          GroupB: output[next - 1].B_Highlight,
        });
      } else {
        setCurrent({ GroupA: output[next - 1].A, GroupB: output[next - 1].B });
      }
      // @ts-ignore
      if (index + adder == output.length) {
        setFinished(true);
      } else {
        setFinished(false);
      }
      setIndex(index + adder);
      setHypothesisIndex(0);
    }
  };

  const addHypotheses = (questionIndex: number) => {
    let copy = [...hypotheses];
    let array: arrayName = questionHighlight[questionIndex]
      ? "highlightHypotheses"
      : "hypotheses";

    let questionCopy = copy[questionIndex][array];
    questionCopy.push({
      hypothesis: "",
      notes: "",
      topbottom: [
        [
          [false, false],
          [false, false],
          [false, false],
          [false, false],
          [false, false],
        ],
        [
          [false, false],
          [false, false],
          [false, false],
          [false, false],
          [false, false],
        ],
      ],
      groupCountTop: 0,
      groupCountBottom: 0,
      intro: options[0],
      topThree: new Set(),
      bottomThree: new Set(),
    });
    setHypothesisIndex(questionCopy.length - 1);
    setHypotheses(copy);
  };

  const handleSubmit = () => {
    let firebaseOutput = hypotheses.map((val, index) => {
      const groupA = output[index].A;
      const groupB = output[index].B;
      const groupAHighlight = output[index].A_Highlight;
      const groupBHighlight = output[index].B_Highlight;

      let newHypothses = val.hypotheses.map((hypothesis, _) => {
        return {
          hypothesis: hypothesis.intro + " " + hypothesis.hypothesis,
          topThree: [...hypothesis.topThree],
          bottomThree: [...hypothesis.bottomThree],
        };
      });

      let highlightHypotheses = val.highlightHypotheses.map((hypothesis, _) => {
        return {
          hypothesis: hypothesis.intro + " " + hypothesis.hypothesis,
          topThree: [...hypothesis.topThree],
          bottomThree: [...hypothesis.bottomThree],
        };
      });

      return {
        workerId,
        groupA,
        groupB,
        groupAHighlight,
        groupBHighlight,
        highlightHypotheses,
        hypotheses: newHypothses,
      };
    });

    let endTime = moment();
    let difference = endTime.diff(startTime, "minutes", true);

    var docData = {
      workerIdHash: workerId,
      hypotheses: firebaseOutput,
      feedback,
      email,
      minutesTook: difference,
    };
    addDoc(collection(db, "proposer-responses"), docData);
    setSubmitted(true);
    // const urlParams = new URLSearchParams(window.location.search);

    // // create the form element and point it to the correct endpoint
    // const form = document.createElement("form");
    // let turkSubmitTo = urlParams.get("turkSubmitTo");
    // if (turkSubmitTo) {
    //   form.action = new URL("mturk/externalSubmit", turkSubmitTo).href;
    // }
    // form.method = "post";

    // // attach the assignmentId
    // const inputAssignmentId = document.createElement("input");
    // inputAssignmentId.name = "assignmentId";

    // let assignmentId = urlParams.get("assignmentId");
    // if (assignmentId) {
    //   inputAssignmentId.value = assignmentId;
    // }
    // inputAssignmentId.hidden = true;
    // form.appendChild(inputAssignmentId);

    // // attach data I want to send back
    // const inputCoordinates = document.createElement("input");
    // inputCoordinates.name = "output";
    // inputCoordinates.value = "output";
    // inputCoordinates.hidden = true;
    // form.appendChild(inputCoordinates);

    // // attach the form to the HTML document and trigger submission
    // document.body.appendChild(form);
    // form.submit();
  };

  const displayCheckboxes = (
    groupIndex: number,
    sentenceIndex: number,
    hypothesisIndex: number,
    sentence: string
  ) => {
    let array: arrayName = questionHighlight[index - 1]
      ? "highlightHypotheses"
      : "hypotheses";
    if (
      hypothesisIndex >= 0 &&
      (hypotheses[index - 1][array][hypothesisIndex].intro === options[0] ||
        hypotheses[index - 1][array][hypothesisIndex].intro === options[1])
    )
      return (
        <>
          <div>
            <Checkbox
              groupIndex={groupIndex}
              questionIndex={index - 1}
              sentenceIndex={sentenceIndex}
              hypothesisIndex={hypothesisIndex}
              topBottomIndex={0}
              checkDisabled={checkDisabled}
              checkGroup={checkGroup}
              isChecked={isChecked}
              sentence={sentence}
              singleHypothesis={false}
            />
          </div>
          <div>
            <Checkbox
              groupIndex={groupIndex}
              questionIndex={index - 1}
              sentenceIndex={sentenceIndex}
              hypothesisIndex={hypothesisIndex}
              topBottomIndex={1}
              checkDisabled={checkDisabled}
              checkGroup={checkGroup}
              isChecked={isChecked}
              sentence={sentence}
              singleHypothesis={false}
            />
          </div>
        </>
      );
    else {
      return (
        <>
          <div>
            <Checkbox
              groupIndex={groupIndex}
              questionIndex={index - 1}
              sentenceIndex={sentenceIndex}
              hypothesisIndex={hypothesisIndex}
              topBottomIndex={0}
              checkDisabled={checkDisabled}
              checkGroup={checkGroup}
              isChecked={isChecked}
              sentence={sentence}
              singleHypothesis={true}
            />
          </div>
          <div />
        </>
      );
    }
  };

  const checkGroup = (
    groupIndex: number,
    questionIndex: number,
    sentenceIndex: number,
    hypothesisIndex: number,
    topBottomIndex: number,
    checked: boolean,
    sentence: string
  ) => {
    let array: arrayName = questionHighlight[index - 1]
      ? "highlightHypotheses"
      : "hypotheses";
    let hypothesisObj = hypotheses[questionIndex][array][hypothesisIndex];
    let copy = [...hypotheses];

    if (
      hypothesisObj.intro === options[2] ||
      hypothesisObj.intro === options[3]
    ) {
      if (checked) {
        hypothesisObj.topThree.add(sentence);
      } else {
        hypothesisObj.topThree.delete(sentence);
      }
      hypothesisObj.topbottom[topBottomIndex][sentenceIndex][
        groupIndex
      ] = checked;

      copy[questionIndex][array][hypothesisIndex] = hypothesisObj;
      setHypotheses(copy);
      return;
    }

    if (
      checked &&
      ((topBottomIndex && hypothesisObj.groupCountBottom == 3) ||
        (!topBottomIndex && hypothesisObj.groupCountTop == 3))
    )
      return;
    else {
      if (checked) {
        if (topBottomIndex) {
          hypothesisObj.bottomThree.add(sentence);
          hypothesisObj.groupCountBottom++;
        } else {
          hypothesisObj.topThree.add(sentence);
          hypothesisObj.groupCountTop++;
        }
      } else {
        if (topBottomIndex) {
          hypothesisObj.bottomThree.delete(sentence);
          hypothesisObj.groupCountBottom--;
        } else {
          hypothesisObj.topThree.delete(sentence);
          hypothesisObj.groupCountTop--;
        }
      }
      hypothesisObj.topbottom[topBottomIndex][sentenceIndex][
        groupIndex
      ] = checked;

      copy[questionIndex][array][hypothesisIndex] = hypothesisObj;
      setHypotheses(copy);
    }
  };

  const checkDisabled = (
    groupIndex: number,
    questionIndex: number,
    sentenceIndex: number,
    hypothesisIndex: number,
    topBottomIndex: number
  ) => {
    let array: arrayName = questionHighlight[questionIndex]
      ? "highlightHypotheses"
      : "hypotheses";
    if (hypotheses[questionIndex][array].length > 0 && hypothesisIndex >= 0) {
      let opposite = topBottomIndex === 1 ? 0 : 1;
      if (
        hypotheses[questionIndex][array][hypothesisIndex].topbottom[opposite][
          sentenceIndex
        ][groupIndex]
      ) {
        return true;
      }
      return (
        !hypotheses[questionIndex][array][hypothesisIndex].topbottom[
          topBottomIndex
        ][sentenceIndex][groupIndex] &&
        ((topBottomIndex &&
          hypotheses[questionIndex][array][hypothesisIndex].groupCountBottom ==
            3) ||
          (!topBottomIndex &&
            hypotheses[questionIndex][array][hypothesisIndex].groupCountTop ==
              3))
      );
    }
    return true;
  };

  const isChecked = (
    groupIndex: number,
    questionIndex: number,
    sentenceIndex: number,
    hypothesisIndex: number,
    topBottomIndex: number
  ) => {
    let array: arrayName = questionHighlight[questionIndex]
      ? "highlightHypotheses"
      : "hypotheses";
    if (hypotheses[questionIndex][array].length > 0 && hypothesisIndex >= 0) {
      return hypotheses[questionIndex][array][hypothesisIndex].topbottom[
        topBottomIndex
      ][sentenceIndex][groupIndex];
    }
    return false;
  };

  const displayHeader = (questionIndex: number, hypothesisIndex: number) => {
    let array: arrayName = questionHighlight[questionIndex]
      ? "highlightHypotheses"
      : "hypotheses";
    if (hypotheses[questionIndex][array].length > 0 && hypothesisIndex >= 0) {
      let hypothesisObj = hypotheses[questionIndex][array][hypothesisIndex];
      if (
        hypothesisObj.intro === options[0] ||
        hypothesisObj.intro === options[1]
      ) {
        return (
          <SelectionRow>
            <p>Top</p>
            <p>Bottom</p>
            <p></p>
          </SelectionRow>
        );
      }
    }
  };

  return (
    <div>
      {hypotheses && (
        <Container>
          <ContainerInner>
            <Arrows>
              <Arrow onClick={() => updateIndex(-1)} disabled={index - 1 === 0}>
                <BsFillCaretLeftFill />
              </Arrow>
              Question {index} of {total}
              <Arrow
                onClick={() => {
                  if (questionHighlight[index - 1]) updateIndex(1);
                }}
                disabled={
                  !questionHighlight[index - 1] || index === output.length
                }
              >
                <BsFillCaretRightFill />
              </Arrow>
            </Arrows>
            <ContentContainer>
              <Group>
                <h2>Group A</h2>
                {displayHeader(index - 1, hypothesisIndex)}
                {current &&
                  current.GroupA.map((e, i) => {
                    return (
                      <SelectionRow key={i}>
                        {displayCheckboxes(0, i, hypothesisIndex, e)}
                        <p
                          key={i}
                          style={{ color: groupColors[0], fontWeight: "bold" }}
                          dangerouslySetInnerHTML={{ __html: e }}
                        ></p>
                      </SelectionRow>
                    );
                  })}
              </Group>
              <Group>
                <h2>Group B</h2>
                {displayHeader(index - 1, hypothesisIndex)}
                {current &&
                  current.GroupB.map((e, i) => {
                    return (
                      <SelectionRow key={i}>
                        {displayCheckboxes(1, i, hypothesisIndex, e)}

                        <p
                          key={i}
                          style={{ color: groupColors[1], fontWeight: "bold" }}
                          dangerouslySetInnerHTML={{ __html: e }}
                        ></p>
                      </SelectionRow>
                    );
                  })}
              </Group>
            </ContentContainer>
            <h3 style={{ marginBottom: "0px" }}>
              Selecting top 3 and bottom 3 for hypothesis: {hypothesisIndex + 1}
            </h3>
            <Hypotheses
              disabled={questionHighlight[index - 1]}
              array={"hypotheses"}
              questionIndex={index - 1}
              hypotheses={hypotheses}
              setHypothesisIndex={setHypothesisIndex}
              setHypotheses={setHypotheses}
              hypothesisIndex={hypothesisIndex}
              preview={false}
              setHypothesisIntro={setHypothesisIntro}
              setIsIndividual={setIsIndividual}
            />
            {questionHighlight[index - 1] && (
              <>
                <Divider />
                <h3 style={{ marginBottom: "0px" }}>
                  New Hypotheses for highlight:
                </h3>
              </>
            )}
            {questionHighlight[index - 1] && (
              <Hypotheses
                disabled={!questionHighlight[index - 1]}
                array={"highlightHypotheses"}
                questionIndex={index - 1}
                hypotheses={hypotheses}
                setHypothesisIndex={setHypothesisIndex}
                setHypotheses={setHypotheses}
                hypothesisIndex={hypothesisIndex}
                preview={false}
                setHypothesisIntro={setHypothesisIntro}
                setIsIndividual={setIsIndividual}
              />
            )}
            <Button
              disabled={false}
              onClick={() => addHypotheses(index - 1)}
              padding="10px 20px"
              borderRadius="5px"
              backgroundColor="#004c7d"
              color="#eeeeee"
              margin="1em 0"
            >
              Add additional hypothesis
            </Button>
            <Button
              disabled={false}
              onClick={() => toggleInstructions(!showInstructions)}
              padding="10px 20px"
              borderRadius="5px"
              backgroundColor="#004c7d"
              color="#eeeeee"
              margin="1em 0 1em 1em"
            >
              Show Instructions
            </Button>
            <Button
              // !finished
              // !(finished && validHit)
              disabled={questionHighlight[index - 1]}
              onClick={() => {
                let copy = questionHighlight;
                copy[index - 1] = true;
                setHypothesisIndex(0);
                setQuestionHighlight(copy);
                setCurrent({
                  GroupA: output[index - 1].A_Highlight,
                  GroupB: output[index - 1].B_Highlight,
                });
              }}
              padding="10px 20px"
              borderRadius="5px"
              backgroundColor="#004c7d"
              color="#eeeeee"
              margin="1em 0 1em 1em"
            >
              Commit Hypotheses and show highlight
            </Button>
            <Button
              // !finished
              // !(finished && validHit)
              disabled={submitted || !(finished && email !== "")}
              onClick={() => handleSubmit()}
              padding="10px 20px"
              borderRadius="5px"
              backgroundColor="#004c7d"
              color="#eeeeee"
              margin="1em 1em"
            >
              Submit
            </Button>
            {submitted && (
              <div>
                <p>Submitted! Thank you for testing out our survey!</p>
              </div>
            )}
            <div>
              <p>
                Go through all questions and enter in your email to submit your
                response
              </p>
              <Input
                value={email}
                placeholder="Enter your email here..."
                borderRadius="3px"
                width="100%"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              {
                // TODO: REMOVE
              }
              <p>Enter in your feedback here:</p>
              <Feedback
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            {showInstructions && (
              <>
                {" "}
                <Content>
                  Your responses need to fulfill the requirements below. We
                  color good responses in <Highlight2>blue</Highlight2> and bad
                  responses in <Highlight1>red</Highlight1>.
                </Content>
                <NumberedList>
                  <li>
                    <Highlight>
                      The hypothesis needs to be meaningfully different from the
                      description (in purple)
                    </Highlight>
                    . For example, a response such as "each snippet from Group A{" "}
                    <Highlight1>"is a spam email"</Highlight1>"" may be true,
                    but doesn’t tell us what the difference is. When we want you
                    to avoid stating the obvious, we will provide relevant
                    background information.
                  </li>
                  <li>
                    <Highlight>Don’t be too specific:</Highlight> for example,{" "}
                    <Highlight1>“contains ‘congratulations!’</Highlight1> or{" "}
                    <Highlight1>‘Redeem your code’</Highlight1> or{" "}
                    <Highlight1>contains ‘offering 50% off’”</Highlight1>.
                  </li>
                  <li>
                    <Highlight>
                      The hypothesis needs to be true on most sentences from
                      group A and false on most sentences from group B.
                    </Highlight>{" "}
                    For example, <Highlight2>“contains a URL”</Highlight2>
                    is a good response since every sentence from group A{" "}
                    <Highlight2>“contains a URL”</Highlight2>, and it’s not true
                    for any sentence in group B. On the other hand,{" "}
                    <Highlight1>“contains two sentences”</Highlight1> is a bad
                    response, because each snippet group B also{" "}
                    <Highlight1>“contains two sentences”</Highlight1>.
                  </li>
                  <li>
                    <Highlight>
                      The hypothesis needs to be unambiguous
                    </Highlight>
                    . Here are some specific guidelines for writing unambiguous
                    hypotheses:
                    <List>
                      <li>
                        <Highlight>Do not</Highlight> draw on expert knowledge
                        (e.g. <Highlight1>"contains HTML tags"</Highlight1>) or
                        cultural references (e.g.{" "}
                        <Highlight1>"from the Enron scandal"</Highlight1>) .
                        Where knowledge of details is required, please provide
                        the information as relevant.
                      </li>
                      <li>
                        <Highlight>Do not</Highlight> use analogies (e.g.{" "}
                        <Highlight1>"reads like garbage"</Highlight1>), favoring
                        direct responses instead (e.g.{" "}
                        <Highlight2>"contains grammatical errors</Highlight2>)
                      </li>
                      <li>
                        <Highlight>Do</Highlight> be as specific as possible
                        without compromising the plausibility of the hypothesis
                        (e.g. instead of{" "}
                        <Highlight1>
                          "has different sentence length,"
                        </Highlight1>{" "}
                        prefer{" "}
                        <Highlight2>
                          "tends to be much longer in length"
                        </Highlight2>
                        )
                      </li>
                      <li>
                        <Highlight>Do not</Highlight> make judgements that are
                        matter of taste, which depend on your opinion (e.g.{" "}
                        <Highlight1>
                          “is a good political take”, “talks about cool topics”
                        </Highlight1>
                        )
                      </li>
                      <li>
                        As a rule of thumb, ask yourself whether someone else,
                        with different knowledge and perspectives, would agree
                        with your statement.
                      </li>
                    </List>
                  </li>
                  <li>
                    Grammatical. Make sure that hypothesis adheres to correct
                    formatting. This survey supports two kinds of hypotheses:
                    <NumberedList>
                      <li>
                        <Highlight>Comparison:</Highlight> Is it true that
                        compared to sentence B, sentence A [your hypothesis]
                        (e.g., <Highlight2>is longer.</Highlight2> )
                      </li>
                      <li>
                        <Highlight>Individual:</Highlight> Is it true that this
                        sentence [your hypothesis] (e.g.,{" "}
                        <Highlight2>is sports-related.</Highlight2>)
                      </li>
                    </NumberedList>
                  </li>
                </NumberedList>
                <Content>
                  A hypothesis that is correctly formatted should also fit the
                  verifier prompt template, which we will show in the next
                  section.
                </Content>
              </>
            )}
          </ContainerInner>
        </Container>
      )}
    </div>
  );
};

export default Survey;
