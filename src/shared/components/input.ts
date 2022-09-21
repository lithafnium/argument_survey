import styled from "styled-components";
import { colors } from "@app/styles/styles";

export const Input = styled.input<{ borderRadius?: string; width: string }>`
  background-color: #ffffff;
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderRadius};
  font-size: 1.1em;
  text-align: left;
  padding-right: 30px;
  padding-left: 20px;
  height: 40px;
  border: 1px solid #dddddd;
  transition: 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: 0;
    border: 1px solid ${colors.PRIMARY};
    box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.08);
  }

  font-family: "Source Sans Pro", sans-serif;
  font-weight: 300 !important;
`;
