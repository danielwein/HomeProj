
interface AuthResponse {
  token?: string;
}

const API_URL = "http://localhost:3000/auth"; // Update with your backend URL

// Async function to handle sign-up
export async function signup(name: string, email: string, password: string): Promise<Response> {
  
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  // You can handle different responses based on the status of the request
  return response;
}

// Async function to handle login
export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    
    throw new Error("Invalid credentials");
  }
  console.log("youre in")
  const data: AuthResponse = await response.json();
  if (data.token) {
    localStorage.setItem("token", data.token); // Save JWT to localStorage
    localStorage.setItem("email", email); // Save JWT to localStorage
  } else {
    throw new Error("Failed to log in");
  }

  return data; // You can return the token or other user data if needed
}

export function logout(): void {
  localStorage.removeItem("token"); // Delete JWT from localStorage
  localStorage.removeItem("email"); // Delete JWT from localStorage

}
