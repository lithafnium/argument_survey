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
} from "./styles";
import { Button } from "@app/shared/components/index";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import ReactSlider from "react-slider";
import styled from "styled-components";
import { colors } from "@app/styles/styles";

interface Response {
  classification: string;
  novelty: string | null;
  explanation: string;
}

const CATEGORIES = [
  "A. I can come up with a counterargument",
  "B. I'm not sure whether I can come up with a counter-argument but someone else can probably come up with a good counter-argument.",
  "C. I don't think there is a plausible argument, and I don’t think anyone else can come up with a good counterargument.",
  "D. Either context or premise does not make sense, or the context and premise are not related to each other.",
];

const NOVELTY = [
  "Almost everyone can come up with my counterargument.",
  "Most people can come up with my counterargument.",
  "About half people can come up with my counterargument.",
  "Most people cannot come up with my counterargument.",
  "Almost no one can come up with my counterargument.",
];

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 30px;
`;

const StyledThumb = styled.div`
  font-family: "Source Sans Pro", sans-serif;

  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: #ddd;
  color: #000;
  border-radius: 50%;
  border: 1px solid ${colors.PRIMARY};
  cursor: grab;
`;
//@ts-ignore
const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledMark = styled.div`
  cursor: pointer;
  top: 6px;
  width: 5px;
  height: 8px;
  background-color: ${colors.PRIMARY};
`;
//@ts-ignore
const Mark = (props) => <StyledMark {...props} />;

const StyledTrack = styled.div`
  top: 9px;
  bottom: 0;
  background: ${colors.PRIMARY};
  border-radius: 999px;
  height: 5px;
`;

//@ts-ignore
const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const StyledContainer = styled.div`
  // resize: horizontal;
  overflow: auto;
  width: 100%;
  max-width: 100%;
  padding-right: 8px;
`;

const RedditSurvey = () => {
  const [currentValue, setCurrentValue] = useState(0);

  const [responses, setResponses] = useState<Response[]>([]);
  const [showA, setShowA] = useState(false);
  const [current, setCurrent] = useState(null);
  const [index, setIndex] = useState(1);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");

  const updateIndex = (adder: number) => {
    setIndex(index + adder);
    // if (
    //   // @ts-ignore
    //   (index + adder <= output.length && adder > 0) ||
    //   (index + adder >= 1 && adder < 0)
    // ) {
    //   let next = index + adder;
    //   if (index + adder == output.length) {
    //     setFinished(true);
    //   } else {
    //     setFinished(false);
    //   }
    //   setIndex(index + adder);
    // }
  };

  return (
    <div>
      <Container>
        <ContainerInner>
          <Arrows>
            <Arrow onClick={() => updateIndex(-1)} disabled={index - 1 === 0}>
              <BsFillCaretLeftFill />
            </Arrow>
            Question {index} of {10}
            <Arrow
              onClick={() => {
                updateIndex(1);
              }}
              // disabled={
              //   !questionHighlight[index - 1] || index === output.length
              // }
            >
              <BsFillCaretRightFill />
            </Arrow>
          </Arrows>
          <h3>
            Based on your reasoning, please classify the data point into one of
            the following categories.
          </h3>
          <div style={{ fontSize: "1em", margin: "1em 0 1em 0" }}>
            {CATEGORIES.map((e, i) => {
              return (
                <SelectionRow key={i}>
                  <input
                    onChange={(_) => {
                      if (e === CATEGORIES[0]) setShowA(true);
                      else setShowA(false);
                    }}
                    name="categories"
                    style={{ marginRight: "1em" }}
                    type="radio"
                    value={e}
                  />
                  <label htmlFor={e}>{e}</label>
                </SelectionRow>
              );
            })}
          </div>
          <Divider />
          {showA && (
            <div>
              <h3>Enter in the "novelty" level of your counterargument</h3>
              <StyledContainer>
                <StyledSlider
                  // defaultValue={[50, 75]}
                  min={1}
                  max={5}
                  marks
                  renderTrack={Track}
                  renderThumb={Thumb}
                  renderMark={Mark}
                  onChange={(value, index) =>
                    console.log(`onChange: ${JSON.stringify({ value, index })}`)
                  }
                />
              </StyledContainer>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <p style={{ width: "15%" }}>
                  Almost everyone can come up with my counterargument.
                </p>
                <p style={{ width: "15%" }}>
                  Almost no one can come up with my counterargument.
                </p>
              </div>
            </div>
          )}
          <div>
            <h3>
              Enter in your explanation. If you have chosen A, please write your
              counterargument.
            </h3>
            <Feedback
              placeholder="Enter in your explanation here"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </ContainerInner>
      </Container>
    </div>
  );
};

export default RedditSurvey;
