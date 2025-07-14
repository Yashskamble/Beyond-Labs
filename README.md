# Backlink Marketplace – Frontend Assignment

This is the submission for the **Senior Frontend Developer Assignment** at **Beyond Labs**. The project simulates a real-world feature for a **Backlink Marketplace**, where users can list websites and define multiple types of backlink-related offers.

## Live Demo

> [View Deployed App on Vercel](https://beyond-labs-two.vercel.app/)  

---

## Assignment Objectives

- Pixel-perfect implementation of provided Figma designs.
- Scalable multi-section form with controlled inputs and validation.
- Global state sync between form and website table.
- Modern tech stack including **Next.js**, **Tailwind CSS**, **Zustand**, **React Hook Form**, and **Zod**.

---

## Features Implemented

### 🔹 Website List Page (`/`)
- Paginated table showing:
  - Website URL
  - Primary Language (with flag)
  - Country
  - Offers Summary (e.g. Normal/Grey Niche/Homepage)
- “Add Website” button opens the website form in create mode.
- Clicking a row opens the form in edit mode with data pre-filled.
- Uses Zustand store to persist websites and sync updates instantly.

### 🔹 Website Details Page (`/add-website`)
- A multi-section form divided into:


    #### A. Website Details
    - **Website URL** (validated)
    - **Primary Language** (searchable dropdown with flag)
    - **Country** (searchable dropdown with flag)
    - **Categories** (multi-select tags)
    - **Description** (textarea)

    #### B. Offers
    - **Normal Offer**
    - Guest Post Price
    - Link Insertion Price
    - **Grey Niche Offer**
    - Same Price toggle
    - Price inputs for 6 grey niches (Gambling, Crypto, Adult, etc.)
    - **Homepage Offer**
    - Price
    - Guidelines

    #### C. Article Specifications
    - Radio groups and input fields according to Figma specs.
    - Conditional logic and field validation handled per section.


---

## Tech Stack

| Area                | Technology                     |
|---------------------|--------------------------------|
| Framework           | Next.js (App Router)           |
| Styling             | Tailwind CSS                   |
| UI Components       | shadcn/ui                      |
| Form Handling       | React Hook Form                |
| Schema Validation   | Zod                            |
| Global State        | Zustand                        |
| Language            | JavaScript                     |
| Icons & Images      | Lucide Icons, Next Image       |

---

## Folder Structure

```
/components
├── atoms/                      // Reusable form inputs (PriceInput, LabelComponent, etc.)
├── molecules/                  // Grouped components like RadioItem
├── organisms/                  // Large sections like Form, Table, Header
└── ui/                         // shadcn/ui components (Button, Card, Tabs, etc.)
/store                          // Zustand store for global state
/schema                         // Zod Schema
/lib                            // Utility functions (e.g., cn)
/app
├── layout.tsx
├── page.tsx
└── [id]/
  ├── page.tsx                  // add/edit website

```

## Validation Logic

All validations are schema-driven via Zod:
- **URL:** Valid URL format.
- **Text inputs:** Required for description/guidelines.
- **Prices:** Must be non-negative numbers.
- **Grey Niche categories:** Conditionally validated based on toggle state.
- **Article Spec fields:** Required radio selections and ranges.

---


## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/backlink-marketplace.git
cd backlink-marketplace
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```