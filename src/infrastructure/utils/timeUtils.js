export const getCurrentTime = () => {
  const now = new Date();
  
  // Ensure that the Date is properly adjusted for the Philippines time zone
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila', // Set to the Philippines timezone
  };

  return now.toLocaleString('en-US', options);
}
