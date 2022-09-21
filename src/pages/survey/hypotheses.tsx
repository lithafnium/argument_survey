import React from "react";
import { Row, Icon, Dropdown } from "./styles";
import { colors } from "@app/styles/styles";
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";
import { Input } from "@app/shared/components/index";

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

const defaultTopBottom = [
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
];

interface Props {
  disabled: boolean;
  array: arrayName;
  questionIndex: number;
  hypotheses: Answer[];
  setHypotheses: React.Dispatch<React.SetStateAction<Answer[]>>;
  setHypothesisIndex: React.Dispatch<React.SetStateAction<number>>;
  setHypothesisIntro: React.Dispatch<React.SetStateAction<string>>;
  setIsIndividual: React.Dispatch<React.SetStateAction<boolean>>;
  hypothesisIndex: number;
  preview: boolean;
}

const Hypotheses = ({
  disabled,
  array,
  questionIndex,
  hypotheses,
  setHypotheses,
  setHypothesisIndex,
  setHypothesisIntro,
  setIsIndividual,
  hypothesisIndex,
  preview,
}: Props) => {
  const options = [
    "Compared to sentences from Group B, each sentence from Group A",
    "Compared to sentences from Group A, each sentence from Group B",
    "Each sentence from Group A",
    "Each sentence from Group B",
  ];

  const deleteHypotheses = (i: number) => {
    if (i === hypotheses[questionIndex][array].length - 1) {
      setHypothesisIndex(i - 1);
    } else if (
      hypothesisIndex ===
      hypotheses[questionIndex][array].length - 1
    ) {
      setHypothesisIndex(hypothesisIndex - 1);
    }
    let copy = [...hypotheses];
    copy[questionIndex][array].splice(i, 1);
    setHypotheses(copy);
  };

  const addHeader = (header: string, input: JSX.Element) => {
    return (
      <div>
        <p style={{ margin: "0 0 0.5em 0" }}>{header}</p>
        {input}
      </div>
    );
  };

  const renderOption = (option: string, key: number) => (
    <option key={key} value={option}>
      {option}
    </option>
  );
  return (
    <div aria-disabled={disabled}>
      <ol>
        {hypotheses[questionIndex][array].map((content, i) => {
          return (
            <li key={i}>
              <Row key={i} border={!disabled && hypothesisIndex === i}>
                {addHeader(
                  "Hypothesis format",
                  <Dropdown
                    disabled={disabled}
                    onFocus={() => setHypothesisIndex(i)}
                    onChange={(e) => {
                      let copy = [...hypotheses];
                      copy[questionIndex][array][i] = {
                        ...copy[questionIndex][array][i],
                        topbottom: JSON.parse(JSON.stringify(defaultTopBottom)),
                        intro: e.target.value,
                        groupCountTop: 0,
                        groupCountBottom: 0,
                      };
                      setHypotheses(copy);
                    }}
                  >
                    {options.map((o, i) => renderOption(o, i))}
                  </Dropdown>
                )}
                {addHeader(
                  "Hypothesis",
                  <Input
                    onFocus={() => {
                      if (!disabled) setHypothesisIndex(i);
                    }}
                    disabled={preview || disabled}
                    value={content.hypothesis}
                    placeholder="Enter your hypothesis here..."
                    borderRadius="3px"
                    width="100%"
                    onChange={(e) => {
                      let copy = [...hypotheses];
                      copy[questionIndex][array][i] = {
                        hypothesis: e.target.value,
                        notes: copy[questionIndex][array][i].notes,
                        topbottom: copy[questionIndex][array][i].topbottom,
                        groupCountTop:
                          copy[questionIndex][array][i].groupCountTop,
                        groupCountBottom:
                          copy[questionIndex][array][i].groupCountBottom,
                        intro: copy[questionIndex][array][i].intro,
                        topThree: copy[questionIndex][array][i].topThree,
                        bottomThree: copy[questionIndex][array][i].bottomThree,
                      };
                      setHypotheses(copy);
                    }}
                  />
                )}
                <Icon
                  onClick={() => {
                    if (!disabled) deleteHypotheses(i);
                  }}
                >
                  <IconContext.Provider
                    value={{
                      color: colors.PRIMARY,
                      style: { verticalAlign: "middle" },
                      size: "2em",
                    }}
                  >
                    <AiFillCloseCircle />
                  </IconContext.Provider>
                </Icon>
              </Row>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Hypotheses;
