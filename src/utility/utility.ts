// src/utils/toast.ts
import { toast } from "react-toastify";

/**
 * Displays a success toast notification.
 *
 * @param {string} msg - Message to be displayed in the success toast.
 *
 * @returns {void}
 */
export const showSuccess = (msg: string) => toast.success(msg, { position: "top-center", autoClose: 3000, toastId: msg,});

/**
 * Displays an error toast notification.
 *
 * @param {string} msg - Message to be displayed in the error toast.
 *
 * @returns {void}
 */
export const showError = (msg: string) => toast.error(msg, { position: "top-center", autoClose: 3000, toastId: msg });

/**
 * Encodes a string into Base64 format.
 *
 * @param {string} stringText - The plain text string to encode.
 *
 * @returns {string} - Returns the Base64 encoded string.
 */
export const base64Encode = (stringText: string) => window.btoa(stringText);

/**
 * Decodes a Base64 encoded string back to plain text.
 *
 * @param {string} stringText - The Base64 encoded string to decode.
 *
 * @returns {string} - Returns the decoded plain text string.
 */
export const base64Decode = (stringText: string) => window.atob(stringText);