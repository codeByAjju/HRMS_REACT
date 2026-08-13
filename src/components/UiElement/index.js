import loadable from "@loadable/component";

export const SweetAlert = loadable(()=>import("./SweetAlert/index"));
export const Toaster = loadable(()=>import("./Toaster/index"));