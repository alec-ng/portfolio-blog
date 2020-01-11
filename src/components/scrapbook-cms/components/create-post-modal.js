import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

/*
 * Renders a button that opens up a modal to create a new post
 */
export default function CreatePostModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="btn btn-success" type="button" onClick={handleOpen}>
        Create New Post
      </button>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <ModalContainer>
            <h2>Create a new post</h2>
            <p>
              Enter a unique title and date combination.
              <br />
              Titles can only be alphanumeric with spaces.
            </p>
            <ModalForm
              existingIdList={props.existingIdList}
              closeModal={handleClose}
              onSubmit={props.onSubmit}
            />
          </ModalContainer>
        </Fade>
      </Modal>
    </div>
  );
}

function ModalForm(props) {
  const [showKeyError, setShowKeyError] = useState(false);

  const formRef = React.useRef(null);
  const idList = props.existingIdList.map(id => id.toUpperCase());

  // On success, execute the submit cb, clear the form of all data, and close the modal
  function validateForm(e) {
    e.preventDefault();

    if (formRef.current.reportValidity()) {
      // check if date/title combination is unique
      let title = formRef.current
        .querySelector("[data-val=title]")
        .value.trim();
      let date = formRef.current.querySelector("[data-val=date]").value;
      let id = `${date}-${title}`;
      let hasDuplicateKey = idList.indexOf(id.toUpperCase()) !== -1;
      setShowKeyError(hasDuplicateKey);
      if (hasDuplicateKey) {
        return;
      }

      let newData = {};
      formRef.current.querySelectorAll("input").forEach(input => {
        newData[input.dataset.val] = input.value;
      });
      props.onSubmit(newData);
      props.closeModal();
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={validateForm}>
        <div className="form-group">
          <label style={{ width: "100%" }}>
            Title
            <input
              required
              minLength="3"
              maxLength="50"
              data-val="title"
              pattern="[a-zA-Z0-9\s]+"
              type="text"
              className="form-control"
            />
          </label>
          <label style={{ width: "100%" }}>
            Date
            <input
              required
              type="date"
              data-val="date"
              className="form-control"
            />
          </label>
        </div>
        {showKeyError && (
          <div className="text-center mb-4" style={{ color: "red" }}>
            <i>
              The title and date combination already exists. Please change
              either the title or date.
            </i>
          </div>
        )}
        <div className="text-right">
          <button
            type="button"
            onClick={props.closeModal}
            className="mr-2 btn btn-danger"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Create
          </button>
        </div>
      </form>
    </>
  );
}

const ModalContainer = styled.div`
  background: white;
  padding: 30px;
  width: 350px;
  border-radius: 5px;
`;
