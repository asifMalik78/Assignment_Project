"use client";
import { useUserContext } from "@/provider/ContextProvider";
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
import { createProject as createProjectApi } from "@/utlis/apiCall";

function CreateProjectModal({ children }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [error, setError] = useState(false);
  const { user, setProjects } = useUserContext();
  const [projectName, setProjectName] = useState("");

  function inputChangeHandler(e) {
    if (error) {
      setError(!error);
    }

    setProjectName(e.target.value);
  }
  async function createProject(onClose) {
    if (projectName === "") {
      setError(true);
      return;
    }

    const project = await createProjectApi({ userId: user._id, projectName });
    setProjects((prev) => [project, ...prev]);
    setProjectName("");
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
                Create Project
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full gap-2">
                  <label htmlFor="text-input">Enter Project Name</label>
                  <input
                    id="text-input"
                    type="text"
                    placeholder="Type here..."
                    className="p-2 focus:outline-none rounded-lg border border-[#999999]"
                    value={projectName}
                    onChange={inputChangeHandler}
                  />
                  {error && (
                    <p className="text-xs text-red-600">
                      Project Name Can't be empty
                    </p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={() => createProject(onClose)}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateProjectModal;
