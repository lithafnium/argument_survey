import React from "react";
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
import {
  BsFillCaretLeftFill,
  BsFillCaretRightFill,
  BsTextParagraph,
} from "react-icons/bs";
import {
  StyledContainer,
  StyledSlider,
  Track,
  Mark,
  Thumb,
} from "@app/shared/components/slider";
import { Input, Button } from "@app/shared/components/index";
import { CATEGORIES, NOVELTY } from "@app/shared/constants/survey";

interface Props {
  index: number;
  updateIndex: (adder: number) => void;
  length: number;
}
export const ArrowContainer = ({ index, updateIndex, length }: Props) => {
  return (
    <Arrows>
      <Arrow onClick={() => updateIndex(-1)} disabled={index - 1 === 0}>
        <BsFillCaretLeftFill />
      </Arrow>
      Question {index} of {length}
      <Arrow
        onClick={() => {
          updateIndex(1);
        }}
        disabled={index === length}
      >
        <BsFillCaretRightFill />
      </Arrow>
    </Arrows>
  );
};

interface Response {
  classification: string;
  novelty: string;
  explanation: string;
}

interface SurveyProps {
  responses: Response[];
  setResponses: React.Dispatch<React.SetStateAction<Response[]>>;
  index: number;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  submitted: boolean;
  finished: boolean;
  handleSubmit: () => void;
}

export const SurveyForm = ({
  responses,
  setResponses,
  index,
  email,
  setEmail,
  submitted,
  finished,
  handleSubmit,
}: SurveyProps) => {
  return (
    <div>
      <div>
        <h3>
          Based on your reasoning, please classify the data point into one of
          the following categories.
        </h3>
        <div style={{ fontSize: "1em", margin: "1em 0 1em 0" }}>
          {CATEGORIES.map((e, i) => {
            return (
              <SelectionRow key={i}>
                <input
                  checked={
                    responses[index - 1]["classification"] == CATEGORIES[i]
                  }
                  onChange={(_) => {
                    let copy = [...responses];
                    copy[index - 1]["classification"] = CATEGORIES[i];

                    if (i !== 0) copy[index - 1]["novelty"] = "";
                    setResponses(copy);
                  }}
                  name={"categories" + i}
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
        {responses[index - 1]["classification"] === CATEGORIES[0] && (
          <div>
            <h3>Enter in the "novelty" level of your counterargument</h3>
            <StyledContainer>
              <StyledSlider
                // defaultValue={[50, 75]}
                value={
                  NOVELTY.indexOf(responses[index - 1]["novelty"]) !== -1
                    ? NOVELTY.indexOf(responses[index - 1]["novelty"]) + 1
                    : 1
                }
                min={1}
                max={5}
                marks
                renderTrack={Track}
                renderThumb={Thumb}
                renderMark={Mark}
                onBeforeChange={(value, _) => {
                  let copy = [...responses];
                  // @ts-ignore
                  copy[index - 1]["novelty"] = NOVELTY[value - 1];
                  setResponses(copy);
                }}
                onChange={(value, _) => {
                  let copy = [...responses];
                  // @ts-ignore
                  copy[index - 1]["novelty"] = NOVELTY[value - 1];
                  setResponses(copy);
                }}
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
            value={responses[index - 1]["explanation"]}
            onChange={(e) => {
              let copy = [...responses];
              copy[index - 1]["explanation"] = e.target.value;
              setResponses(copy);
            }}
          />
        </div>
      </div>
      <p>Enter in your email (optional) before submitting your responses!</p>
      <Input
        value={email}
        placeholder="Enter your email here..."
        borderRadius="3px"
        width="100%"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        // !finished
        // !(finished && validHit)
        disabled={submitted || !finished}
        onClick={() => handleSubmit()}
        padding="10px 20px"
        borderRadius="5px"
        backgroundColor="#004c7d"
        color="#eeeeee"
        margin="1em 0"
      >
        Submit
      </Button>
      {submitted && (
        <div>
          <p>Submitted! Thank you for testing out our survey!</p>
        </div>
      )}
    </div>
  );
};
