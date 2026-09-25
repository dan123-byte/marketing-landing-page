// ----------------------------------
// MARKETING TRACKING
// ----------------------------------

function trackEvent(eventName, data = {}) {
    console.log("Tracking event:", eventName, data);

    // Google Analytics 4 Integration
    if (typeof gtag === "function") {
        gtag("event", eventName, data);
    }
}

trackEvent("page_view");

// ----------------------------------
// LEAD FORM
// ----------------------------------

const leadForm = document.getElementById("leadForm");
const formStatus = document.getElementById("formStatus");
const submitButton = document.getElementById("submitButton");

const ctaButton = document.querySelector(".nav-cta");

ctaButton.addEventListener("click", function () {
    trackEvent("cta_click", {
        button_text: "Get Started"
    });
});

let isSubmitting = false;

let formStarted = false;

leadForm.addEventListener("input", function () {
    if (!formStarted) {
        formStarted = true;

        trackEvent("form_started", {
            form_name: "lead_generation_form"
        });
    }
});

leadForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (isSubmitting) {
        return;
    }

    clearErrors();
    formStatus.textContent = "";
    formStatus.className = "form-status";

    const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        company: document.getElementById("company").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    let isValid = true;

    if (!formData.name) {
        showError("name", "Full name is required.");
        isValid = false;
    }

    if (!formData.email) {
        showError("email", "Work email is required.");
        isValid = false;
    } else if (!isValidEmail(formData.email)) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
    }

    if (!formData.phone) {
        showError("phone", "Phone number is required.");
        isValid = false;
    } else if (!isValidPhone(formData.phone)) {
        showError("phone", "Please enter a valid phone number.");
        isValid = false;
    }

    if (!isValid) {
        formStatus.textContent = "Please fix the errors below.";
        formStatus.className = "form-status error";
        return;
    }

    isSubmitting = true;

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    try {

        const response = await mockCRMRequest(formData);

        if (!response.success) {
            throw new Error(response.message);
        }

        trackEvent("form_submitted", {
            form_name: "lead_generation_form"
        });

        // Meta Pixel conversion
        if (typeof fbq === "function") {
            fbq("track", "Lead");
        }

        window.dataLayer = window.dataLayer || [];

        window.dataLayer.push({
            event: "lead_submission_success"
        });

        formStatus.textContent = response.message;
        formStatus.className = "form-status success";

        leadForm.reset();

    } catch (error) {

         trackEvent("form_submission_failure", {
            form_name: "lead_generation_form"
        });

        formStatus.textContent =
            error.message || "Something went wrong. Please try again.";

        formStatus.className = "form-status error";

    } finally {

        isSubmitting = false;

        submitButton.disabled = false;
        submitButton.textContent = "Get My Free Strategy";
    }
});


// ----------------------------------
// VALIDATION
// ----------------------------------

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function isValidPhone(phone) {

    const phonePattern = /^[0-9+\-\s().]{7,20}$/;

    return phonePattern.test(phone);
}


function showError(fieldName, message) {

    const input = document.getElementById(fieldName);
    const error = document.getElementById(`${fieldName}Error`);

    if (error) {
        error.textContent = message;
    }

    input.setAttribute("aria-invalid", "true");
}


function clearErrors() {

    document.querySelectorAll(".error-message").forEach(error => {
        error.textContent = "";
    });

    document.querySelectorAll("input, textarea").forEach(input => {
        input.removeAttribute("aria-invalid");
    });
}


// ----------------------------------
// MOCK CRM INTEGRATION
// ----------------------------------

async function mockCRMRequest(lead) {

    console.log("Sending lead to simulated CRM:", lead);

    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
        // Comment out to simulate Success
        success: true,
        message: "Thank you! We'll be in touch shortly.",

        // Comment out to simulate Failure
        // success: false,
        // message: "Simulated CRM failure.",
        data: {
            crmId: `MOCK-CRM-${Date.now()}`,
            lead: lead
        }
    };
}