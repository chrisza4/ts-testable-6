export type DeleteResponse = {
  success: boolean;
}

export function deleteView(success: boolean): DeleteResponse {
  return {
    success
  }
}
