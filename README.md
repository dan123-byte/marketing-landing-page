# GrowthSpur Landing Page
- A fast, responsive, and data-driven lead-generation landing page built with vanilla HTML5, CSS3, and JavaScript.

🌐 **Live Demo: https://dan123-byte.github.io/marketing-landing-page/ **

## What the Website Does
- Captures Business Leads: Collects user information (Name, Work Email, Company, Phone, and Message) through an interactive contact form.

- Validates User Input: Checks that all required fields are filled out and that email and phone numbers are correctly formatted before allowing submission.

- Simulates CRM Integration: Sends validated lead data to a simulated CRM backend API (mockCRMRequest), complete with success and error handling.

- Prevents Duplicate Submissions: Disables the submit button while a request is processing so users cannot accidentally submit the form twice.

- Tracks User Interactions: Centralizes analytics tracking across key touchpoints (Page View, CTA Clicks, Form Start, and Form Submission). Meta Pixel Lead events and Google Analytics conversions fire only after a successful CRM response.

- Handles Errors Gracefully: Displays dynamic success messages when a submission succeeds or clear error alerts if the request fails, allowing users to retry.

## Tech Stack
- HTML5: Semantic layout structure (Header, Hero, Services, Testimonials, Form, Footer).

- CSS3: Custom responsive layout, modern typography, component styling, and mobile optimization.

- Vanilla JavaScript: Form validation, state management, CRM request simulation, and analytics tracking logic.