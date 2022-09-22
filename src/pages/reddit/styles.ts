import styled, { keyframes } from "styled-components";
import { device } from "@app/shared/components/layout/layout";
import { colors, fonts } from "@app/styles/styles";

export const RowContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 1em;
`;

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

export const ContentContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1em;
`;

export const Group = styled.div`
  width: 100%;
  box-sizing: border-box;

  & li {
    font-size: 1.1em;
    margin-top: 0.5em;
  }
`;

export const Row = styled.div<{ border?: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 3fr 0.5fr;
  column-gap: 1em;

  margin-top: 1em;

  padding: 1em;
  border: ${(props) => (props.border ? `1px solid ${colors.PRIMARY}` : "none")};
  border-radius: 5px;
  box-sizing: border-box;
`;

export const InputContainer = styled.div`
  width: 100%;
`;

export const Icon = styled.div`
  color: #cccccc;
  height: fit-content;
  font-size: 1.5em;
  &:hover {
    color: red;
    cursor: pointer;
  }

  transition: 0.12s;
`;

export const Arrows = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Arrow = styled.div<{ disabled?: boolean }>`
  color: #cccccc;
  font-size: 2em;
  display: flex;
  align-items: center;

  color: ${(props) => (props.disabled ? "none" : colors.PRIMARY)};

  &:hover {
    cursor: pointer;
  }

  transition: 0.12s;
`;

export const Content = styled.p`
  font-size: 1.2em;
`;

export const List = styled.ul`
  margin-top: 0px;

  & li {
    font-size: 1.1em;
    margin-bottom: 0.2em;
  }
`;
export const Highlight = styled.span`
  font-weight: 1000 !important;
  text-decoration: underline;
`;

export const Dropdown = styled.select`
  width: 100%;
  border-radius: 3px;
  font-size: 1.1em;
  border: 1px solid #dddddd;
  height: 40px;
  outline: none;
  font-family: "Source Sans Pro", sans-serif;
  padding: 2px 10px;
  font-weight: 300 !important;
`;

export const Checks = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1em;

  & p {
    margin: 0px 0px 1em 0px;
  }
`;

export const ChecksContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 2fr 3fr;
  column-gap: 1em;
`;

export const SelectionRow = styled.div`
  width: 100%;
  // display: grid;
  // column-gap: 1em;

  // margin-bottom: 1em;

  & p {
    margin: 0px;
  }
`;

export const CheckboxIcon = styled.div<{ topBottomIndex: number }>`
  color: ${(props) => (!props.topBottomIndex ? colors.PRIMARY : colors.RED)};
  height: fit-content;
  font-size: 1.2em;
  &:hover {
    cursor: pointer;
  }

  transition: 0.12s;
`;

export const Feedback = styled.textarea`
  background-color: #ffffff;
  width: 100%;
  border-radius: 3px;
  font-size: 1.1em !important;
  text-align: left;
  padding: 1em;

  height: 40px;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  height: 300px;

  resize: vertical;

  &:focus {
    outline: 0;
    border: 1px solid ${colors.PRIMARY};
    box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.08);
  }

  font-family: "Source Sans Pro", sans-serif;
  font-weight: 300 !important;
`;

export const Divider = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${colors.PRIMARY};
`;
