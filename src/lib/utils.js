import { IMAGE_BASE_URL } from "@/redux/feature/baseApi";
import { clsx } from "clsx";
import { format } from "date-fns";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Success Toast
export const SuccessToast = (msg) => {
  toast.success(msg)
}

// Error Toast 
export const ErrorToast = (msg) => {
  toast.error(msg)
}

// Get Initials
export const getInitials = (name) => {
  if (!name) return "NA";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "N";
  const second = parts[1]?.[0] || parts[0]?.[1] || "A";
  return (first + second).toUpperCase();
};

// Format Date 
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return format(new Date(dateString), 'MMMM d, yyyy');
};

// Get Image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  return imagePath.startsWith('/') ? `${IMAGE_BASE_URL}${imagePath}` : `${IMAGE_BASE_URL}/${imagePath}`;
};
