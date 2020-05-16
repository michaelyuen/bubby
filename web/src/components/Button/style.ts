import styled from "styled-components";

export const ButtonContainer = styled.button`
  line-height: 1rem;
  user-select: none;
  position: relative;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  background-image: none;
  cursor: pointer;
  filter: none;
  font-weight: 600;
  color: rgb(255, 255, 255);
  background-color: black;
  font-size: 1rem;
  min-height: 48px;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  text-decoration: none;
  border-color: black;
  padding: 0.9rem 2rem;
  &:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(47, 140, 174);
    border-color: rgb(47, 140, 174);
    text-decoration: none !important;
  }
`;
