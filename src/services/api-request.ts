/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpMethod } from "../models/datatypes";

const baseUrl = "http://universities.hipolabs.com";

export const sendRequestEx = async (
  url: string,
  method: HttpMethod = "GET",
  body: any = null,
  headers: Record<string, string> = {}
) => {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method,
      body,
      headers,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (err: any) {
    throw err;
  }
};
