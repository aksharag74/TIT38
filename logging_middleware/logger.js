// logger.js

// Replace this with the exact token you saved from the previous step
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJha3NoYXJhZ2FkZTExQGdtYWlsLmNvbSIsImV4cCI6MTc3OTEwMDg4NSwiaWF0IjoxNzc5MDk5OTg1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNzk1NTEyM2QtYmI2OS00MTJhLWFiNDQtMGFhZjVmYjAxZTgyIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWtzaGFyYSBnYWRlIiwic3ViIjoiZWEzZGFiOWQtYjZiMS00MDk1LWE1NGEtNThkOGRlMmVmMTI1In0sImVtYWlsIjoiYWtzaGFyYWdhZGUxMUBnbWFpbC5jb20iLCJuYW1lIjoiYWtzaGFyYSBnYWRlIiwicm9sbE5vIjoidGl0MzgiLCJhY2Nlc3NDb2RlIjoiZnpFUVNRIiwiY2xpZW50SUQiOiJlYTNkYWI5ZC1iNmIxLTQwOTUtYTU0YS01OGQ4ZGUyZWYxMjUiLCJjbGllbnRTZWNyZXQiOiJSQmtjVnN2dlZ0VVZaQWFLIn0.wwqL6fd724l8ZCvW32LG5EjEgSB0ZjAP3TqxX1v2pFw"; 
const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";

/**
 * Reusable function to send application logs to the test server
 * @param {string} stack - 'backend' | 'frontend'
 * @param {string} level - 'debug' | 'info' | 'warn' | 'error' | 'fatal'
 * @param {string} pkg - The respective package component name
 * @param {string} message - Descriptive context string
 */
export async function Log(stack, level, pkg, message) {
  try {
    const response = await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}` // Passing your authentication token
      },
      body: JSON.stringify({
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: pkg.toLowerCase(),
        message: message
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log(`[Remote Log Success] LogID: ${data.logID}`);
    } else {
      console.error("[Remote Log Failed]:", data);
    }
  } catch (error) {
    console.error("[Remote Log Error]:", error.message);
  }
}