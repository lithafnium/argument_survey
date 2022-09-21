import React from "react";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { colors } from "@app/styles/styles";
import { IconContext } from "react-icons";
import { CheckboxIcon } from "./styles";

interface Props {
  groupIndex: number;
  questionIndex: number;
  sentenceIndex: number;
  hypothesisIndex: number;
  topBottomIndex: number;
  singleHypothesis: boolean;
  checkDisabled: (
    groupIndex: number,
    questionIndex: number,
    sentenceIndex: number,
    hypothesisIndex: number,
    topBottomIndex: number
  ) => boolean;
  checkGroup: (
    groupIndex: number,
    questionIndex: number,
    sentenceIndex: number,
    hypothesisIndex: number,
    topBottomIndex: number,
    checked: boolean,
    sentence: string
  ) => void;
  isChecked: (
    groupIndex: number,
    questionIndex: number,
    sentenceIndex: number,
    hypothesisIndex: number,
    topBottomIndex: number
  ) => boolean;
  sentence: string;
}

const Checkbox = ({
  groupIndex,
  questionIndex,
  sentenceIndex,
  hypothesisIndex,
  topBottomIndex,
  checkDisabled,
  checkGroup,
  isChecked,
  sentence,
  singleHypothesis,
}: Props) => {
  if (
    !singleHypothesis &&
    isChecked(
      groupIndex,
      questionIndex,
      sentenceIndex,
      hypothesisIndex,
      topBottomIndex
    )
  ) {
    return (
      <CheckboxIcon
        onClick={(e) =>
          checkGroup(
            groupIndex,
            questionIndex,
            sentenceIndex,
            hypothesisIndex,
            topBottomIndex,
            false,
            sentence
          )
        }
        topBottomIndex={topBottomIndex}
      >
        <IconContext.Provider
          value={{
            color: topBottomIndex === 0 ? colors.PRIMARY : colors.RED,
            style: { verticalAlign: "middle" },
            size: "2em",
          }}
        >
          {topBottomIndex === 0 ? (
            <BsFillArrowUpCircleFill />
          ) : (
            <BsFillArrowDownCircleFill />
          )}
        </IconContext.Provider>
      </CheckboxIcon>
    );
  }
  return (
    <input
      disabled={checkDisabled(
        groupIndex,
        questionIndex,
        sentenceIndex,
        hypothesisIndex,
        topBottomIndex
      )}
      onChange={(e) =>
        checkGroup(
          groupIndex,
          questionIndex,
          sentenceIndex,
          hypothesisIndex,
          topBottomIndex,
          e.target.checked,
          sentence
        )
      }
      type="checkbox"
      checked={isChecked(
        groupIndex,
        questionIndex,
        sentenceIndex,
        hypothesisIndex,
        topBottomIndex
      )}
    />
  );
};

export default Checkbox;
