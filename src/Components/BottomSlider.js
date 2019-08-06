import React from 'react';
import PropTypes from 'prop-types';
import styled, {keyframes} from 'styled-components';

import Close from '../Images/close.png';

const slideIn = keyframes`
    from {
        -webkit-transform:  translate(0%, 300px);
        -ms-transform:  translate(0%, 300px);
        transform:  translate(0%, 300px);
        opacity: 0
        }
    to {
        -webkit-transform:  translate(0px,0%);
        -ms-transform:  translate(0px,0%);
        transform:  translate(0px,0%);
        opacity: 1
        }
`;

const fadeIn = keyframes`
    from { opacity: 0 }
    to { opacity: 1 }
`;

const Modal = styled.div`
    display: ${(props) => props.show ? 'block' : 'none'};
    position: fixed; 
    z-index: 999; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgba(40,41,40,0.3);
    animation-name: ${fadeIn}; 
    animation-duration: 0.2s;
`;

const ModalBody = styled.div`
    /* overflow-y: auto;  */
    position: fixed;
    bottom: 0;
    padding-bottom: 20px;
    border-radius: 20px 20px 0 0%;
    background-color: #fff;
    height: ${(props) => props.modalHeight || '9%'};
    width: 100%;
    animation-name: ${slideIn};
    animation-duration: 0.2s;
`;

const ModalContent = styled.div`
    overflow: auto;
    height: ${(props) => props.contentHeight || '85%'};
    padding-bottom: ${(props) => props.padBottom || '10px'};
    -webkit-overflow-scrolling: touch; 
`;

const ModalHeader = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr;
    height: 50px;
    margin-top: 10px;
    border-bottom:  ${(props) => props.shadow ? '1px solid rgba(0,0,0,0.1)' : 'none'};
`;

const Heading = styled.div`
    vertical-align: middle;
    line-height: 50px;
    padding-left: 20px;
    color: #030F09;
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
`;

const CloseIcon = styled.img`
    height: 20px;
    width: 20px;
`;

const CloseIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BottomSlideModalWrapper = (props) => {
  return (
    <Modal show={props.show}>
      <ModalBody modalHeight={props.modalHeight}>
        <ModalHeader>
          <Heading>{props.heading}</Heading>
          <CloseIconWrapper>
            <CloseIcon src={Close} alt={'Close'} onClick={props.closeModal} />
          </CloseIconWrapper>
        </ModalHeader>
        <ModalContent contentHeight={props.contentHeight}>
          {props.children}
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

BottomSlideModalWrapper.propTypes = {
  show: PropTypes.bool,
  modalHeight: PropTypes.string,
  shadow: PropTypes.bool,
  heading: PropTypes.string,
  closeModal: PropTypes.func,
  children: PropTypes.node,
  contentHeight: PropTypes.string,
  padBottom: PropTypes.string,
};

export default BottomSlideModalWrapper;