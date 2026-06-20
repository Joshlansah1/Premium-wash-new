import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import usePageTitle from "../hooks/usePageTitle";
import { usePageMeta } from "../hooks/usePageMeta";
import Spinner from "../ui/Spinner";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-number-input/style.css";
import { useState } from "react";

const SchedulePickup = () => {
  usePageTitle("Schedule Pickup");
  usePageMeta({
    title: "Schedule Pickup - Premium Wash Laundry",
    description:
      "Schedule your laundry pickup with Premium Wash. Fast, convenient, and reliable service with free delivery.",
    keywords: "schedule pickup, book laundry, laundry booking, free pickup",
    canonical: "https://www.premiumwashgh.com/schedule-pickup",
    ogImage: "https://www.premiumwashgh.com/pickup.avif",
  });
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const RATE_LIMIT_MS = 3000; // 3 seconds between submissions
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  // Validate pickup time against business hours
  // Monday-Saturday: 7:30am-8:30pm, Sunday: 12pm-8pm (Ghana Time - GMT)
  const validateBusinessHours = (value) => {
    if (!value) return true;

    const selectedDate = new Date(value);
    // Convert to Ghana time (GMT+0)
    const ghanaTime = new Date(
      selectedDate.toLocaleString("en-US", { timeZone: "Africa/Accra" }),
    );

    const dayOfWeek = ghanaTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hours = ghanaTime.getHours();
    const minutes = ghanaTime.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Sunday: 12pm-8pm (720-1320 minutes)
    if (dayOfWeek === 0) {
      const openTime = 12 * 60; // 12pm
      const closeTime = 19 * 60; // 7pm
      if (totalMinutes < openTime || totalMinutes >= closeTime) {
        return "We operate on Sundays from 12:00 PM to 7:00 PM (Ghana Time)";
      }
    }
    // Monday-Saturday: 7:30am-8:30pm (450-1230 minutes)
    else if (dayOfWeek >= 1 && dayOfWeek <= 6) {
      const openTime = 7.5 * 60; // 7:30am
      const closeTime = 20.5 * 60; // 8:30pm
      if (totalMinutes < openTime || totalMinutes >= closeTime) {
        return "We operate Monday-Saturday from 7:30 AM to 8:30 PM (Ghana Time)";
      }
    }

    return true;
  };

  // Sanitize input to prevent XSS attacks
  const sanitizeInput = (str) => {
    if (typeof str !== "string") return str;
    const element = document.createElement("div");
    element.textContent = str;
    return element.innerHTML;
  };

  const onSubmit = async (data) => {
    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      toast.error("Please wait a few seconds before submitting again.");
      return;
    }
    setLastSubmitTime(now);

    // Sanitize all inputs to prevent XSS attacks
    const formattedData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      phone: sanitizeInput(data.phone),
      pickupTime: data.pickupTime,
      address: sanitizeInput(data.address),
      services: (data.services || []).join(", "),
    };

    try {
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
      if (!formspreeId) {
        toast.error("Configuration error. Please contact support.");
        console.error("Formspree ID not configured");
        return;
      }

      const formspreeEndpoint =
        import.meta.env.VITE_FORMSPREE_ENDPOINT ||
        `https://formspree.io/f/${formspreeId}`;
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        toast.success("Thank you! Your pickup has been scheduled.");
        reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <section id="request" className="py-20 sm:py-34 px-4 bg-[var(--white-bg)]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-6">
          Schedule a Pickup
        </h2>
        <p className="text-[var(--text-secondary)] mb-10 max-w-2xl">
          Book your laundry or cleaning service in seconds. Choose a time that
          works for you and we’ll take care of the rest.
        </p>

        <div className="bg-[var(--primary-light)] text-[var(--text-primary)] p-5 rounded-lg mb-8 border-2 border-[var(--primary-color)]">
          <h3 className="text-xl font-semibold mb-2">💸 Pricing Information</h3>

          <ul className="text-sm leading-relaxed">
            <li>
              • Laundry is charged at <strong>GH₵12.00 per kg</strong> at KNUST
              branch and <strong>GH₵15.00 per kg</strong> at Danyame branch.
            </li>
            <li>
              • Express Service: <strong>2–4 hours</strong>.
            </li>
            <li>
              • Standard Service: <strong>24 hours</strong>.
            </li>
            <li>• We use a weighing scale for bulk laundry.</li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white border-2 border-[var(--primary-color)] rounded-xl p-8 shadow-xl"
        >
          {/* Name */}
          <div className="col-span-1">
            <label htmlFor="pickup-name" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              id="pickup-name"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--primary-color)]"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="col-span-1">
            <label htmlFor="pickup-phone" className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Please enter your phone number",
                validate: (value) => {
                  if (!value) return "Please enter your phone number";
                  if (!isValidPhoneNumber(value)) {
                    return "Please enter a valid phone number";
                  }
                  return true;
                },
              }}
              render={({ field: { onChange, value } }) => (
                <div>
                  <PhoneInput
                    id="pickup-phone"
                    value={value}
                    onChange={onChange}
                    defaultCountry="GH"
                    international
                    countryCallingCodeEditable={true}
                    name="phone"
                    inputProps={{
                      autoComplete: "tel",
                      name: "phone",
                    }}
                    className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:border-[var(--primary-color)] ${
                      errors?.phone ? "!border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter phone number"
                  />
                </div>
              )}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Pickup Date & Time */}
          <div className="col-span-1">
            <label htmlFor="pickup-datetime" className="block text-sm font-medium mb-1">
              Pickup Date & Time
            </label>
            <div>
              <input
                id="pickup-datetime"
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                {...register("pickupTime", {
                  required: "Pickup time is required",
                  validate: (value) => {
                    const selectedTime = new Date(value);
                    if (selectedTime <= new Date()) {
                      return "Pickup time must be in the future";
                    }
                    return validateBusinessHours(value);
                  },
                })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--primary-color)]"
              />
              <p className="text-xs text-gray-600 mt-2">
                ⏰ Operating Hours: Mon-Sat 7:30 AM - 8:30 PM | Sun 12:00 PM -
                7:00 PM (Ghana Time)
              </p>
            </div>

            {errors.pickupTime && (
              <p className="text-sm text-red-500 mt-1">
                {errors.pickupTime.message}
              </p>
            )}
          </div>

          {/* Address - Full width */}
          <div className="col-span-1 sm:col-span-2">
            <label htmlFor="pickup-address" className="block text-sm font-medium mb-1">
              Pickup Address{" "}
              <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <textarea
              id="pickup-address"
              rows={3}
              {...register("address")}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--primary-color)]"
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Services */}
          <div className="w-full">
            <label className="block mb-2 font-medium">Select Services</label>
            <div className="flex flex-wrap w-full gap-2">
              {[
                "Laundry",
                "Drying",
                "Shoe care",
                "Ironing",
                "Folding or hanging",
                "Carpet maintenance",
                "Apartment cleaning",
                "Office hygiene",
                "Quick express service",
                "Move-in/move-out cleanup",
                "Pickup and delivery assistance",
              ].map((service, index) => (
                <label key={index} className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    value={service}
                    {...register("services", {
                      validate: (value) =>
                        value?.length > 0 || "Select at least one service",
                    })}
                    className="peer sr-only"
                  />
                  <span className="inline-flex items-center px-4 py-2 rounded-full border-2 border-gray-200 text-sm font-medium text-gray-500 transition-all duration-200 peer-checked:bg-[var(--primary-color)] peer-checked:text-white peer-checked:border-[var(--primary-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] peer-checked:hover:text-white select-none">
                    {service}
                  </span>
                </label>
              ))}
            </div>
            {errors.services && (
              <p className="text-red-500 text-sm mt-1">
                {errors.services.message}
              </p>
            )}
          </div>

          {/* Email - Last field */}
          <div className="col-span-1 sm:col-span-2">
            <label htmlFor="pickup-email" className="block text-sm font-medium mb-1">
              Email <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <input
              id="pickup-email"
              type="email"
              {...register("email", {
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-[var(--primary-color)]"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="col-span-1 sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white px-6 py-3 rounded-lg font-medium transition"
            >
              {isSubmitting ? (
                <>
                  <Spinner />
                  <span className="sr-only">Confirming...</span>
                </>
              ) : (
                "Confirm Pickup"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SchedulePickup;
