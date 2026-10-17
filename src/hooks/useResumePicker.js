import { createContext, useContext } from "react";

// Opens the résumé picker (components/ResumePicker); App provides it
export const ResumePickerContext = createContext(() => {});

export default function useResumePicker() {
  return useContext(ResumePickerContext);
}
