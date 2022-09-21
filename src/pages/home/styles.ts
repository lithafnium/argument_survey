import styled, { keyframes } from "styled-components";
import { device } from "@app/shared/components/layout/layout";
import { colors, fonts } from "@app/styles/styles";

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding-top: 2.5em;
  padding-bottom: 2.5em;
  justify-content: center;
  // align-items: center;
  min-height: 100vh;

  // background-color: ${colors.TERNARY};
`;

export const ContainerInner = styled.div`
  max-width: 1080px;

  @media ${device.mobileS} {
    box-sizing: border-box;
    width: 80%;
  }

  @media ${device.laptopM} {
    padding: 0px 0px;
    width: 100%;
  }
`;

export const Heading = styled.h1`
  @media ${device.mobileS} {
    font-size: 36px;
  }

  @media ${device.tablet} {
    font-size: 72px;
  }
  font-size: 72px;
  margin: 0px;
  font-weight: 700;
  color: ${colors.DARK};
`;

export const Description = styled.p`
  font-family: ${fonts.SECONDARY};
  font-size: 17px;
  margin: 0px;
  margin-bottom: 1em;
  color: ${colors.HIGHLIGHT};
  line-height: 1.1;
`;

export const Paragraph = styled.p`
  font-size: 17px;
  margin: 0px;
  color: #1e3d59;
  line-height: 1.3;
  margin-top: 1em;
`;

export const Inputs = styled.div`
  display: flex;
  width: 100%;
`;

export const Links = styled.div`
  width: 100%;
  margin-top: 2em;
  display: flex;
  flex-wrap: wrap;

  font-family: ${fonts.SECONDARY};
  & a {
    margin-right: 2em;
    margin-bottom: 1em;
    color: ${colors.HIGHLIGHT};
    text-decoration: none;
  }
`;

export const Content = styled.p`
  font-size: 1.2em;
`;

export const List = styled.ul<{ bold?: boolean; color?: string }>`
  margin-top: 0px;

  & li {
    font-size: 1.1em;
    margin-bottom: 0.8em;
    font-weight: ${(props) => (props.bold ? "400" : "300")};
    color: ${(props) => (props.color ? props.color : "black")};
  }
`;

export const NumberedList = styled.ol<{ bold?: boolean; color?: string }>`
  margin-top: 0px;

  & li {
    font-size: 1.1em;
    margin-bottom: 0.8em;
    font-weight: ${(props) => (props.bold ? "400" : "300")};
    color: ${(props) => (props.color ? props.color : "black")};
  }
`;

export const Highlight = styled.span`
  font-weight: bold !important;
  text-decoration: underline;
`;

export const Highlight1 = styled.span`
  color: red;
  font-weight: bold !important;
`;

export const Highlight2 = styled.span`
  color: blue;
  font-weight: bold !important;
`;

export const Highlight3 = styled.span`
  color: purple;
  font-weight: bold !important;
`;
export const ContentContainer = styled.div``;

export const GroupContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1em;
`;

export const Divider = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${colors.PRIMARY};
`;

export const Arrows = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Arrow = styled.div`
  color: #cccccc;
  font-size: 2em;
  display: flex;
  align-items: center;

  &:hover {
    color: ${colors.PRIMARY};
    cursor: pointer;
  }

  transition: 0.12s;
`;
