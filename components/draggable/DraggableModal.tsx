import { useRef } from 'react'
import Draggable from 'react-draggable'
import styled, { keyframes } from 'styled-components'

export default function DraggableModal() {
  const nodeRef = useRef(null)

  return (
    <Draggable
      nodeRef={nodeRef}
      // cancel=".not-draggable"
      axis="y"
      defaultPosition={{ x: 0, y: 0 }}
      bounds={{
        top: 0,
        bottom: 0,
      }}
      position={{ x: 0, y: 100 }}
      // onDrag={onDrag}
    >
      <Modal.Container ref={nodeRef}>zz</Modal.Container>
    </Draggable>
  )
}

const DrawIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(100px);
  }
`

const Modal = {
  Container: styled.div`
    position: absolute;
    background-color: red;
    height: 100%;
    width: 100%;
    border-radius: 1.25rem 1.25rem 0 0;
    animation: ${DrawIn} 0.3s linear alternate;
  `,
}

// const Draw = styled.div`
//   position: absolute;
//   height: 100vh;
//   background-color: ${({ theme }) => theme.colors.white};
//   right: 0;
//   left: 0;
//   bottom: 0;
//   border-radius: 1.25rem 1.25rem 0 0;
//   animation: ${DrawIn} 0.3s linear alternate;
// `
