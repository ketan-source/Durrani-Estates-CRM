import { api } from '@/http/api';

/**
 * Fetches a list of pages using the provided query string.
 *
 * @param {string} [queryString] - Optional query string beginning with `?`.
 */
export const getStudentsList = async (queryString = '') => api.get(`test/${queryString}`);


/**

 * This function sends a DELETE request to remove
 * a specific student record from the backend.
 *
 * @param {string} id - Unique ID of the student to be deleted.
 *
 * @returns {Promise<any>} - Returns the API response promise.
 */
export const deleteStudentBasedOnId = async (id: string) => api.delete(`test/${id}/delete/`);

/**
 * Create a new .
 *
 * @param {any} payload - Student data payload.
 *
 * @returns {Promise<any>} - Returns the API response promise.
 */
export const createStudent = async (payload: any) => api.post(`test`, payload);

/**
 * Update an existing student.
 *
 * @param {string} id - Unique ID of the student to be updated.
 * @param {any} payload - Student data payload.
 *
 * @returns {Promise<any>} - Returns the API response promise.
 */
export const updateStudent = async (id: string, payload: any) => api.put(`test/${id}/update/`, payload);

/**
 * Get a student by ID.
 *
 * @param {string} id - Unique ID of the student.
 *
 * @returns {Promise<any>} - Returns the API response promise.
 */
export const getStudentById = async (id: string) => api.get(`test/${id}/`);