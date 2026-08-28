/**
 * API service — centralized HTTP client for calling the backend.
 */

const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:8000/api';

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('access_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle HTTP errors that come with { detail: ... } from FastAPI
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body.detail || body.message || `Error ${res.status}`;
    throw new ApiError(res.status, message);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export interface TokenData {
  access_token: string;
  token_type: string;
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export async function apiRegister(data: {
  username: string;
  email: string;
  password: string;
  display_name: string;
}) {
  return request<UserData>('/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiLogin(username: string, password: string) {
  return request<TokenData>('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function apiLogout() {
  return request<null>('/logout', { method: 'POST' });
}

export async function apiGetMe() {
  return request<UserData>('/me');
}

export async function apiChangePassword(oldPassword: string, newPassword: string) {
  return request<null>('/change-password', {
    method: 'POST',
    body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
  });
}

export async function apiCheckUsername(name: string) {
  return request<{ username: string; available: boolean }>(`/check-username/${name}`);
}

export async function apiUpdateUser(userId: string, data: { display_name?: string; avatar_url?: string }) {
  return request<UserData>(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// ---------------------------------------------------------------------------
// Books
// ---------------------------------------------------------------------------

export interface BookData {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  condition: string;
  description: string | null;
  tags: string[];
  status: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  owner: UserData | null;
}

export interface PaginatedBooksData {
  books: BookData[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export async function apiGetBooks(params?: { page?: number; limit?: number; status?: string; search?: string }) {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', params.page.toString());
  if (params?.limit) query.append('limit', params.limit.toString());
  if (params?.status) query.append('status', params.status);
  if (params?.search) query.append('search', params.search);
  
  const queryString = query.toString() ? `?${query.toString()}` : '';
  return request<PaginatedBooksData>(`/books${queryString}`);
}

export async function apiGetMyBooks() {
  return request<BookData[]>('/books/me');
}

export async function apiGetBook(id: string) {
  return request<BookData>(`/books/${id}`);
}

export async function apiCreateBook(data: Partial<BookData>) {
  return request<BookData>('/books', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiUpdateBook(id: string, data: Partial<BookData>) {
  return request<BookData>(`/books/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function apiDeleteBook(id: string) {
  return request<null>(`/books/${id}`, {
    method: 'DELETE',
  });
}

export interface BookRequestData {
  id: string;
  title: string;
  author: string;
  description: string;
  owner_id: string;
  created_at: string;
  offers: number;
  owner: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
}

export async function apiGetRequests(params?: {
  page?: number;
  limit?: number;
  search?: string;
  mine?: boolean;
}) {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', params.page.toString());
  if (params?.limit) query.append('limit', params.limit.toString());
  if (params?.search) query.append('search', params.search);
  if (params?.mine) query.append('mine', 'true');
  
  return request<{ requests: BookRequestData[]; total: number; page: number; limit: number; total_pages: number }>(`/requests?${query.toString()}`);
}

export async function apiCreateRequest(data: {
  title: string;
  author: string;
  description?: string;
}) {
  return request<BookRequestData>('/requests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function apiDeleteRequest(id: string) {
  return request<null>(`/requests/${id}`, {
    method: 'DELETE',
  });
}

export { ApiError };
