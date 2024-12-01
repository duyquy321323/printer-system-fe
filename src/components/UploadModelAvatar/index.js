import {
    Backdrop,
    Button,
    CircularProgress,
    RadioGroup
  } from "@mui/material";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import CloseIcon from "../../assets/icon/CloseIcon.svg";
  import ImageIcon from "../../assets/icon/ImageIcon.svg";
  import UploadIcon from "../../assets/icon/UploadIcon.svg";
  import { closeBackDrop, closeUpload, openBackDrop } from "../../redux/action";
  import api from "../api";
  
  function UploadModel(props) {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.uploadFormAction);
    const [filesSelected, setFileSelected] = useState(null);
    const { getNewListFile } = props;
    const open = useSelector(state => state.backdropAction);
  
    async function upload() {
      try {
        dispatch(openBackDrop());
        await api.put(`account/information`, {avatar: filesSelected},{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        getNewListFile();
        dispatch(closeUpload());
      } catch (e) {
        console.error(e);
      }
      dispatch(closeBackDrop());
    }
  
    function handleFiles(e) {
      setFileSelected(e.target.files);
    }
  
    return (
      <>
      <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {isOpen ? (
          <section className="container-upload-form">
            <div className="header-upload-form">
              <h3>Upload Document</h3>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                // onChange={handleChange}
              >
              </RadioGroup>
              <button onClick={() => dispatch(closeUpload())}>
                <img src={CloseIcon} alt="CloseIcon" />
              </button>
            </div>
            <div className="body-upload-form">
              <img src={ImageIcon} alt="ImageIcon" />
              <p>Drag and Drop Files here or</p>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                style={{
                  borderRadius: "6px",
                  border: "1px solid #0162E8",
                  background: "#ECF0FA",
                  color: "#0162E8",
                  fontFamily: "Afacad",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "14px" /* 100% */,
                  width: "144px",
                  height: "40px",
                }}
              >
                Browse Files
                <input
                  type="file"
                  onChange={handleFiles}
                  multiple
                />
              </Button>
            </div>
            <div className="footer-upload-form">
              <button onClick={() => dispatch(closeUpload())}>Cancel</button>
              <button onClick={() => upload()}>
                <img src={UploadIcon} alt="UploadIcon" />
                <p>Upload</p>
              </button>
            </div>
          </section>
        ) : (
          <></>
        )}
      </>
    );
  }
  
  export default UploadModel;
  