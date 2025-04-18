const AZURE_FUNCTION_URL = import.meta.env.VITE_AZURE_FUNCTION_URL;
const FUNCTION_CODE = import.meta.env.VITE_AZURE_FUNCTION_KEY;

export const subscribeToNewsletter = async (email) => {
  try {
    console.log('Attempting to subscribe with email:', email);

    const response = await fetch(
      `${AZURE_FUNCTION_URL}/api/subscribers?code=${FUNCTION_CODE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      }
    );

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed response data:', data);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      console.error('Raw response that failed to parse:', responseText);
      throw new Error('Invalid response from server: ' + responseText);
    }

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to subscribe');
    }

    return {
      success: true,
      message: data.message || 'Successfully subscribed to newsletter!',
      data
    };
  } catch (error) {
    console.error('Newsletter subscription error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    return {
      success: false,
      message: error.message || 'An unexpected error occurred. Please try again later.'
    };
  }
};
