import {Toast, Row,Col,Body,Header} from "react-bootstrap";
function Example({showA,toggleShowA}) {
  
    return (
      <Row>
        <Col xs={6}>
          <Toast show={showA} onClose={toggleShowA}>
          <div
  aria-live="polite"
  aria-atomic="true"
  style={{
    position: 'relative',
    minHeight: '100px',
  }}
>
  <Toast
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
    }}
  >
    <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
      <strong className="mr-auto">Bootstrap</strong>
      <small>just now</small>
    </Toast.Header>
    <Toast.Body>See? Just like this.</Toast.Body>
  </Toast>
</div>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
        </Col>  
      </Row>
    );
  }
  
  export default Toast