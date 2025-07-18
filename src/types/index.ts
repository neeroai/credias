import React from 'react';

// Global types for CrediAS website

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

export interface CardProps {
  variant: 'default' | 'elevated' | 'outlined';
  padding: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  hover?: boolean;
  shadow?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface InputProps {
  type: 'text' | 'email' | 'password' | 'tel' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
} 