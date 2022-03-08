export interface BaseEntry {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface BaseResponse {
  status: boolean;
  message: string;
}

export interface Notification {
  id: string;
  variant: "info" | "warning" | "success" | "error";
  title: string;
  message?: string;
}
