// API Response Models

export interface LoginResponse {
  sessionId: string;
  user?: User;
}

export interface RegisterResponse {
  message: string;
  user?: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

