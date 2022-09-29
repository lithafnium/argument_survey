import ReactSlider from "react-slider";
import styled from "styled-components";
import { colors } from "@app/styles/styles";
import React from "react";

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 30px;
`;

export const StyledThumb = styled.div`
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
export const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

export const StyledMark = styled.div`
  cursor: pointer;
  top: 6px;
  width: 5px;
  height: 8px;
  background-color: ${colors.PRIMARY};
`;
//@ts-ignore
export const Mark = (props) => <StyledMark {...props} />;

export const StyledTrack = styled.div`
  top: 9px;
  bottom: 0;
  background: ${colors.PRIMARY};
  border-radius: 999px;
  height: 5px;
`;

//@ts-ignore
export const Track = (props, state) => (
  <StyledTrack {...props} index={state.index} />
);

export const StyledContainer = styled.div`
  // resize: horizontal;
  overflow: auto;
  width: 100%;
  max-width: 100%;
  padding-right: 8px;
`;
