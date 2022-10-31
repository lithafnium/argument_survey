import React from "react";
import {
  Arrow,
  Arrows,
  SelectionRow,
  Feedback,
  ContentCard,
} from "@app/pages/surveyStyles";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import { Slider } from "@app/shared/components/slider";
import { Input, Button } from "@app/shared/components/index";
import { CATEGORIES } from "@app/shared/constants/survey";
import CounterArguments from "@app/pages/counterArguments";
import { Response, NliQuestion } from "@app/@types/survey";
interface Props {
  header: string;
  index: number;
  updateIndex: (adder: number) => void;
  length: number;
  disableForward: () => boolean;
}
export const ArrowContainer = ({
  header,
  index,
  updateIndex,
  length,
  disableForward,
}: Props) => {
  return (
    <Arrows>
      <Arrow onClick={() => updateIndex(-1)} disabled={index - 1 === 0}>
        <BsFillCaretLeftFill />
      </Arrow>
      {header} {index} of {length}
      <Arrow
        onClick={() => {
          if (!(index === length || !disableForward())) updateIndex(1);
        }}
        disabled={index === length || !disableForward()}
      >
        <BsFillCaretRightFill />
      </Arrow>
    </Arrows>
  );
};

interface SurveyProps {
  responses: Response[];
  setResponses: React.Dispatch<React.SetStateAction<Response[]>>;
  index: number;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  submitted: boolean;
  finished: boolean;
  handleSubmit: () => void;
  argumentIndex: number;
  setArgumentIndex: (adder: number) => void;
  updateIndex: (adder: number) => void;
  questions: NliQuestion[];
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
  argumentIndex,
  setArgumentIndex,
  updateIndex,
  questions,
}: SurveyProps) => {
  const updateData = (value: number | readonly number[], type: string) => {
    let copy = [...responses];
    let evaluation = copy[index - 1]["evaluation"][argumentIndex - 1];

    let copyEvaluation = { ...evaluation, [type]: value };

    copy[index - 1]["evaluation"][argumentIndex - 1] = copyEvaluation;

    setResponses(copy);
  };

  const Response = (useNew: boolean) => {
    return (
      <div>
        <ContentCard>
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
                      useNew
                        ? responses[index - 1]["postClassification"] ==
                          CATEGORIES[i]
                        : responses[index - 1]["classification"] ==
                          CATEGORIES[i]
                    }
                    onChange={(_) => {
                      let copy = [...responses];
                      copy[index - 1]["postClassification"] = CATEGORIES[i];
                      if (!useNew) {
                        copy[index - 1]["classification"] = CATEGORIES[i];
                      }
                      if (i !== 0) {
                        copy[index - 1]["postNovelty"] = 1;
                        if (!useNew) {
                          copy[index - 1]["novelty"] = 1;
                        }
                      }

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
        </ContentCard>
        {(useNew
          ? responses[index - 1]["postClassification"] === CATEGORIES[0]
          : responses[index - 1]["classification"] === CATEGORIES[0]) && (
          <Slider
            header={"Enter in the 'novelty' level of your counterargument"}
            min={1}
            max={5}
            value={
              useNew
                ? responses[index - 1]["postNovelty"]
                : responses[index - 1]["novelty"]
            }
            beforeChange={(value: number | readonly number[], i: number) => {
              let copy = [...responses];
              // @ts-ignore
              copy[index - 1]["postNovelty"] = value;
              // @ts-ignore
              if (!useNew) copy[index - 1]["novelty"] = value;
              setResponses(copy);
            }}
            onChange={(value: number | readonly number[], i: number) => {
              let copy = [...responses];
              // @ts-ignore
              copy[index - 1]["postNovelty"] = value;
              // @ts-ignore
              if (!useNew) copy[index - 1]["novelty"] = value;
              setResponses(copy);
            }}
            headers={[
              "Almost everyone can come up with my counterargument.",
              "",
              "",
              "",
              "Almost no one can come up with my counterargument.",
            ]}
          />
        )}
        <ContentCard>
          <h3>
            Enter in your explanation. If you have chosen A, please write your
            counterargument.
          </h3>
          <Feedback
            placeholder="Enter in your explanation here"
            value={
              useNew
                ? responses[index - 1]["postExplanation"]
                : responses[index - 1]["explanation"]
            }
            onChange={(e) => {
              let copy = [...responses];
              copy[index - 1]["postExplanation"] = e.target.value;
              if (!useNew) copy[index - 1]["explanation"] = e.target.value;
              setResponses(copy);
            }}
          />
        </ContentCard>
      </div>
    );
  };

  const showNew = () => {
    return (
      <div>
        <div>
          <h3>
            Based off of the generated counter-arguments, please reevaluate your
            responses if you have changed your opinion.
          </h3>
        </div>
        {Response(true)}
      </div>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "1em" }}>
        {!responses[index - 1]["showGenerated"] && Response(false)}
        {responses[index - 1]["explanation"] !== "" &&
          responses[index - 1]["classification"] !== "" && (
            <Button
              // !finished
              // !(finished && validHit)
              onClick={() => {
                let copy = [...responses];
                copy[index - 1]["showGenerated"] = true;
                setResponses(copy);
              }}
              padding="10px 20px"
              borderRadius="5px"
              backgroundColor="#004c7d"
              color="#eeeeee"
              margin="1em 0"
            >
              Commit Responses and View Generated Counter Arguments
            </Button>
          )}
        {responses[index - 1]["showGenerated"] && (
          <ContentCard>
            <ArrowContainer
              header={"Counterargument"}
              index={argumentIndex}
              updateIndex={setArgumentIndex}
              length={responses[index - 1]["evaluation"].length}
              disableForward={() => {
                return true;
              }}
            />
            <CounterArguments
              counterArgument={
                questions[index - 1]["counterarguments"][argumentIndex - 1]
              }
              updateData={updateData}
              argumentData={
                responses[index - 1]["evaluation"][argumentIndex - 1]
              }
            />
          </ContentCard>
        )}
      </div>
      {responses[index - 1]["argumentFinished"] && showNew()}
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
      {finished && (
        <>
          <p>
            Enter in your email (optional) before submitting your responses!
          </p>
          <Input
            value={email}
            placeholder="Enter your email here..."
            borderRadius="3px"
            width="100%"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
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
        </>
      )}
      {submitted && (
        <div>
          <p>Submitted! Thank you for testing out our survey!</p>
        </div>
      )}
    </div>
  );
};
