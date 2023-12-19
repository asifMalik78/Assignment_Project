"use client";
import { useUserContext } from "@/provider/ContextProvider";
import { uploadEpisode } from "@/utlis/apiCall";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

function UploadModal({ children, text , projectId}) {
  const {setEpisodes} = useUserContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState({ name: "", desc: "" });
  const [error, setError] = useState({ name: false, desc: false });

  function inputChangeHandler(e) {
    if (error.name) {
      setError((prev) => ({ ...prev, name: !error.name }));
    }

    if (error.desc) {
      setError((prev) => ({ ...prev, desc: !error.desc }));
    }

    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function uploadHandler(onClose) {
    if (data?.name === "" && data?.desc === "") {
      setError({ name: !error.name, desc: !error.desc });
      return;
    }
    
    if (data?.name === "") {
      setError((prev) => ({ ...prev, name: !error.name }));
      return;
    }

    if (data?.desc === "") {
      setError((prev) => ({ ...prev, desc: !error.desc }));
      return;
    }

    const episode = await uploadEpisode({...data , projectId});
    setEpisodes(prev => ([episode , ...prev]));
    setData({ name: "", desc: "" });
    onClose();
  }
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"3xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl text-black">
                Upload on {text}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="text-input">Name</label>
                  <input
                    id="text-input"
                    type="text"
                    name="name"
                    placeholder="Enter Name..."
                    className="p-2 rounded-lg border border-[#999999] focus:outline-none"
                    value={data?.name}
                    onChange={inputChangeHandler}
                  />
                  {error?.name && (
                    <p className="text-xs text-red-600">Name Can't be empty</p>
                  )}
                  <label htmlFor="text-input">Description</label>
                  <textarea
                    rows="6"
                    id="text-input"
                    type="text"
                    name="desc"
                    placeholder="Enter Description..."
                    className="p-2 rounded-lg border border-[#999999] focus:outline-none"
                    value={data?.desc}
                    onChange={inputChangeHandler}
                  />
                  {error?.desc && (
                    <p className="text-xs text-red-600">
                      Description Can't be empty
                    </p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={() => uploadHandler(onClose)}>
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default UploadModal;
