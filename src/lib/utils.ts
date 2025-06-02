import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ActionState<T = unknown, S = unknown> = {
  success: boolean;
  error?: string;
  form?: T;
  data?: S;
};

export type Document = {
  id: string;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type Resource = {
  id: string;
  name: string;
  url: string;
  description: string;
  createdAt: string;
};
