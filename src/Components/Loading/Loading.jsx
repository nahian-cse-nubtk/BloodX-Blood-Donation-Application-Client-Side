import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff5f5; /* change to your theme background */
  overflow: hidden; /* prevents extra scroll space */

  .loader {
    position: relative;
    width: 2.5em;
    height: 2.5em;
    transform: rotate(165deg);
  }

  .loader:before,
  .loader:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 5.5em;
    height: 5.5em;
    border-radius: 1.25em;
    transform: translate(-50%, -50%);
  }

  .loader:before {
    animation: before8 2s infinite;
  }

  .loader:after {
    animation: after6 2s infinite;
  }

  @keyframes before8 {
    0% { width: .5em; box-shadow: 1em -.5em rgba(225,20,98,.75), -1em .5em rgba(111,202,220,.75); }
    35% { width: 2.5em; box-shadow: 0 -.5em rgba(225,20,98,.75), 0 .5em rgba(111,202,220,.75); }
    70% { width: .5em; box-shadow: -1em -.5em rgba(225,20,98,.75), 1em .5em rgba(111,202,220,.75); }
    100% { box-shadow: 1em -.5em rgba(225,20,98,.75), -1em .5em rgba(111,202,220,.75); }
  }

  @keyframes after6 {
    0% { height: .5em; box-shadow: .5em 1em rgba(61,184,143,.75), -.5em -1em rgba(233,169,32,.75); }
    35% { height: 2.5em; box-shadow: .5em 0 rgba(61,184,143,.75), -.5em 0 rgba(233,169,32,.75); }
    70% { height: .5em; box-shadow: .5em -1em rgba(61,184,143,.75), -.5em 1em rgba(233,169,32,.75); }
    100% { box-shadow: .5em 1em rgba(61,184,143,.75), -.5em -1em rgba(233,169,32,.75); }
  }
`;

export default Loading;
