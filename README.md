# Dast-E-Yaar — Prescription Fulfillment & Logistics Pipeline

[![Client: CCL Pharmaceuticals](https://img.shields.io/badge/Client-CCL_Pharmaceuticals-blue?style=flat-square)]()
[![Partner: Softsols Pakistan](https://img.shields.io/badge/Partner-Softsols_Pakistan-slate?style=flat-square)]()
[![Backend: Express 5 / TypeScript](https://img.shields.io/badge/Backend-Express_5_%2F_TypeScript-green?style=flat-square)]()
[![Integration: Shopify REST API](https://img.shields.io/badge/Integration-Shopify_REST_API-teal?style=flat-square)]()
[![Type: Case Study](https://img.shields.io/badge/Type-Systems_Case_Study-purple?style=flat-square)]()

Systems architecture and integration case study for **Dast-E-Yaar**, a direct-to-patient medication ordering and fulfillment pipeline engineered for **CCL Pharmaceuticals** via Softsols Pakistan.

---

## Role & Scope

* **Role:** Sole Backend Developer
* **Context:** Built under Softsols Pakistan for CCL Pharmaceuticals. Engineered the ordering and dispatch service from scratch.
* **Scope of Ownership:** Built the Express 5 and TypeScript backend, integrated the Shopify Admin API for automated order placement, configured WhatsApp notification webhooks, and implemented order fulfillment scripts (`fulfillOrder.ts`, `markOrderAsPaid.ts`).

---

## System Flow

```mermaid
flowchart TD
    subgraph Clinic Entry [Medical Assistant Console]
        ASSIST[Assistant Inputs Patient Details]
        PRESC[Prescription Item Selection]
        SAVE[Save Record to System]
        ASSIST --> PRESC --> SAVE
    end

    subgraph Backend Core [Express 5 & TypeScript API]
        VAL[Validate Prescription & Medicine Availability]
        WA[WhatsApp Notification Dispatch]
        SHOPIFY[Shopify Admin API Order Placement]
        SAVE --> VAL
        VAL --> WA
        VAL --> SHOPIFY
    end

    subgraph Fulfillment [Warehouse & Patient]
        PATIENT[Patient Receives Order Confirmation]
        CCL[CCL Pharma Central Warehouse]
        DISPATCH[Direct Delivery to Patient]
        WA --> PATIENT
        SHOPIFY --> CCL --> DISPATCH
    end
```

---

## Technical Highlights

* **Clinic Prescription Intake:** Clinic assistants enter patient demographics and prescribed medications into the system, validating inventory items before submission.
* **Shopify Order Automation:** Programmatically creates orders via the Shopify REST Admin API, attaching customer addresses, medication line items, and fulfillment tags for the warehouse team.
* **WhatsApp Notification Dispatch:** Sends real-time WhatsApp confirmation messages to patients with order details, instructions, and delivery notices upon prescription entry.
* **Order Management Tooling:** Built operational scripts for marking orders as paid, updating fulfillment statuses, and tracking warehouse dispatch.

---

## Tech Stack

* **Backend:** Node.js, Express 5, TypeScript
* **Database:** MongoDB, Mongoose
* **Integrations:** Shopify Admin REST API (`@shopify/shopify-api`), WhatsApp Business Webhooks
* **Security & Logging:** Winston, Helmet, CORS

---

## Notice

Proprietary patient prescription records, customer identities, and corporate API credentials belong to CCL Pharmaceuticals and Softsols Pakistan. This repository documents software architecture and integration workflows.
