"use client";

import { useUserContext } from "@/provider/ContextProvider";
import { loginUser } from "@/utlis/apiCall";
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

function LoginModal({ children }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { updateUser } = useUserContext();
  const [error, setError] = useState({ username: false, email: false });
  const [data, setData] = useState({ username: "", email: "" });
  function inputChangeHandler(e) {
    if (error.username) {
      setError((prev) => ({ ...prev, username: false }));
    }

    if (error.email) {
      setError((prev) => ({ ...prev, email: false }));
    }

    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function creatAccount(onClose) {
    if (data.email === "" && data.username === "") {
      setError({ email: true, username: true });
      return;
    }

    if (data.email === "") {
      setError((prev) => ({ ...prev, email: true }));
      return;
    }

    if (data.username === "") {
      setError((prev) => ({ ...prev, username: true }));
      return;
    }

    const res = await loginUser(data);
    updateUser(res);
    setData({ username: "", email: "" });
    onClose();
  }

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl">
                Create Account
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col w-full gap-2">
                    <label htmlFor="text-input">Username</label>
                    <input
                      id="text-input"
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="p-2 focus:outline-none rounded-lg border border-[#999999]"
                      value={data.username}
                      onChange={inputChangeHandler}
                    />
                    {error.username && (
                      <p className="text-xs text-red-600">
                        Email Can't be empty
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <label htmlFor="text-input">Email</label>
                    <input
                      id="text-input"
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="p-2 focus:outline-none rounded-lg border border-[#999999]"
                      value={data.email}
                      onChange={inputChangeHandler}
                    />
                    {error.email && (
                      <p className="text-xs text-red-600">
                        Email Can't be empty
                      </p>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    creatAccount(onClose);
                  }}
                >
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

export default LoginModal;
