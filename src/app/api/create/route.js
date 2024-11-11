import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json(); // Get data from the request body
    console.log("Received data:", data); // Log the received data

    const response = await fetch("http://localhost/bedo/signup_emplyee.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Send employee data directly
    });

    // Check if the response is ok (status code in the range 200-299)
    if (!response.ok) {
      const errorResult = await response.json();
      console.log("Error response from PHP API:", errorResult); // Log the error
      return NextResponse.json({ message: "Signup failed", details: errorResult }, { status: response.status });
    }

    const result = await response.json(); // Parse the successful response
    console.log("Response from PHP API:", result); // Log the successful response

    return NextResponse.json({ message: "Signup successful", result }, { status: 201 }); // Forward the successful response
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
