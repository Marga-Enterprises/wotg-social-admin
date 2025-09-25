// External deps
import dayjs from "dayjs";
import axios from "axios";

/* ===============================
   STRING HELPERS
================================= */

/**
 * Capitalize the first letter of a string
 * @param {string} str
 * @returns {string}
 */
export const capitalizeFirstLetter = (str) => {
  if (typeof str !== "string" || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Capitalize the first letter of each word in a string
 * @param {string} str
 * @returns {string}
 */
export const capitalizeWords = (str) => {
  if (typeof str !== "string" || str.length === 0) return str;
  return str
    .split(" ")
    .map((word) =>
      word.length === 0
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
};

/**
 * Check if a string is a valid email
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length === 0) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
};

/* ===============================
   DATE HELPERS
================================= */

/**
 * Convert date input into a YYYY-MM-DD string (safe for MySQL DATE)
 * Supports Date, string, or Excel serial number
 * @param {string|number|Date} input
 * @returns {string}
 */
export const convertDate = (input) => {
  if (!input) return "";

  let date;
  if (typeof input === "number") {
    // Excel serial → JS Date
    const utcDays = input - 25569;
    const utcValue = utcDays * 86400 * 1000;
    date = new Date(utcValue);
  } else {
    date = new Date(input);
    if (isNaN(date)) return "";
  }

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${year}-${month}-${day}`;
};

/**
 * Convert month number to month name
 * @param {number} monthNumber (0 = January, 11 = December)
 * @returns {string}
 */
export const convertMonthToName = (monthNumber) => {
  if (
    typeof monthNumber !== "number" ||
    monthNumber < 0 ||
    monthNumber > 11
  ) {
    return "";
  }
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber];
};

/**
 * Group a value into age buckets based on how many days old the date is
 * @param {string|Date} date
 * @param {number|string} amount
 * @param {Array<{ label: string, key: string, min: number, max?: number }>} buckets
 * @returns {Object}
 */
export const bucketByAge = (date, amount, buckets) => {
  const daysOld = dayjs().diff(dayjs(date), "day");
  const parsedAmount = parseFloat(amount).toFixed(2);

  return buckets.reduce((acc, bucket) => {
    const inRange =
      bucket.max !== undefined
        ? daysOld >= bucket.min && daysOld <= bucket.max
        : daysOld >= bucket.min;
    acc[bucket.key] = inRange ? `₱${parsedAmount}` : null;
    return acc;
  }, {});
};

/* ===============================
   NUMBER / CURRENCY HELPERS
================================= */

/**
 * Format number as Philippine Peso with commas and 2 decimals
 * @param {number} amount
 * @returns {string}
 */
export const formatPeso = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) return "₱0.00";
  return `₱${amount
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

/* ===============================
   NETWORK HELPERS
================================= */

/**
 * Convert object params to query string
 * @param {Object} params
 * @returns {string}
 */
export const convertQueryString = (params) => {
  if (!params || typeof params !== "object") return "";
  return Object.keys(params)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
};

/**
 * Upload a file to DigitalOcean Spaces (or S3) via presigned URL
 * @param {File|Blob} file
 * @param {string} presignedUrl
 * @returns {Promise}
 */
export const uploadFileToSpaces = async (file, presignedUrl) => {
  const isolatedAxios = axios.create();
  return isolatedAxios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
      "x-amz-acl": "public-read",
    },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    transformRequest: [
      (data, headers) => {
        Object.keys(headers).forEach((key) => delete headers[key]);
        headers["Content-Type"] = file.type;
        headers["x-amz-acl"] = "public-read";
        return data;
      },
    ],
  });
};
