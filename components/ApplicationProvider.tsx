"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ApplicationModal } from "./ApplicationModal";
import { VolunteerModal } from "./VolunteerModal";
import { PartnerModal } from "./PartnerModal";

type ModalState =
  | { type: "application"; programId?: string }
  | { type: "volunteer" }
  | { type: "partner" }
  | null;

interface AppCtx {
  openApplication: (programId?: string) => void;
  openVolunteer: () => void;
  openPartner: () => void;
}

const ApplicationContext = createContext<AppCtx>({
  openApplication: () => {},
  openVolunteer: () => {},
  openPartner: () => {},
});

export function useApplication() {
  return useContext(ApplicationContext);
}

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>(null);

  const close = () => setModal(null);

  return (
    <ApplicationContext.Provider value={{
      openApplication: (id?) => setModal({ type: "application", programId: id }),
      openVolunteer:   ()    => setModal({ type: "volunteer" }),
      openPartner:     ()    => setModal({ type: "partner" }),
    }}>
      {children}

      {modal?.type === "application" && (
        <ApplicationModal programId={modal.programId} onClose={close} />
      )}
      {modal?.type === "volunteer" && (
        <VolunteerModal onClose={close} />
      )}
      {modal?.type === "partner" && (
        <PartnerModal onClose={close} />
      )}
    </ApplicationContext.Provider>
  );
}
