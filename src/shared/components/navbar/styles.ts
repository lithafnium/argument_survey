import styled from "styled-components";
import { device } from "@app/shared/components/layout/layout";

export const NavbarContainer = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  /* justify-content: left; */
  z-index: 20;
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.1);
`;

export const NavbarInner = styled.div`
  max-width: 1080px;

  @media ${device.mobileS} {
    box-sizing: border-box;
    width: 80%;
  }

  @media ${device.laptopM} {
    padding: 0px 0px;
    width: 100%;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Links = styled.div`
  @media ${device.mobileS} {
    display: none;
  }

  @media ${device.laptop} {
    display: flex;
    align-items: center;
  }

  & a {
    color: #fefefe !important;
    font-size: 1.1em;
    text-decoration: none;
    transition: 0.2s;
  }

  & a:hover {
    color: rgba(230, 230, 230, 1) !important;
  }

  & a:visited {
    color: black;
  }
`;

export const NavItem = styled.p`
  position: relative;
  margin: 0px;
  margin-left: 20px;
  margin-right: 20px;
  transition: 0.2s;
  width: fit-content;
  text-align: center;
`;

export const Brand = styled.h1`
  font-weight: 300;
`;
