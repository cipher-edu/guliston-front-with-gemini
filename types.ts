// Fix: Import React to resolve React.ReactNode namespace error
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Protocol {
  id: string;
  clientName: string;
  productName: string;
  date: string;
  results: TestResult[];
}

export interface TestResult {
  parameter: string;
  unit: string;
  requirement: string;
  actual: string;
}