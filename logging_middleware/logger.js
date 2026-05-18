
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJha3NoYXJhZ2FkZTExQGdtYWlsLmNvbSIsImV4cCI6MTc3OTEwMzM3MywiaWF0IjoxNzc5MTAyNDczLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNmUyMDFjZWYtYzM1Yi00ZWFlLWFjYTctOTllOWIzY2FlZWY2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWtzaGFyYSBnYWRlIiwic3ViIjoiZWEzZGFiOWQtYjZiMS00MDk1LWE1NGEtNThkOGRlMmVmMTI1In0sImVtYWlsIjoiYWtzaGFyYWdhZGUxMUBnbWFpbC5jb20iLCJuYW1lIjoiYWtzaGFyYSBnYWRlIiwicm9sbE5vIjoidGl0MzgiLCJhY2Nlc3NDb2RlIjoiZnpFUVNRIiwiY2xpZW50SUQiOiJlYTNkYWI5ZC1iNmIxLTQwOTUtYTU0YS01OGQ4ZGUyZWYxMjUiLCJjbGllbnRTZWNyZXQiOiJSQmtjVnN2dlZ0VVZaQWFLIn0.LQmWwlgvPof2vv1OgeO5bzshjkdU3Be1PnIwAu5dEOU"; 
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