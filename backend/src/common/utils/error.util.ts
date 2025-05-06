/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
export function extractErrorMessage(error: any): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (error?.response?.data) {
    const data = error.response.data;

    return (
      data.message ||
      data.status_message ||
      JSON.stringify(data) ||
      'Unknown error'
    );
  }

  return 'Internal server error';
}
