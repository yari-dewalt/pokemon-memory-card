import "../styles/Modal.css";

function Modal({ headerText, description, buttons })
{
  return (
    <div className="overlay">
      <div className="modal">
        <h1>{headerText}</h1>
        <p>{description}</p>
        <div className="buttons">
          {buttons}
        </div>
      </div>
    </div>
  )
}

export default Modal;
