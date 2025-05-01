export  const saveNote = () => {
    try {
        
    }catch (error) {
    // Convert to standardized error format
    throw new Error(
      error.response?.data?.message || error.message || "Network error occurred"
    );
  }
}

export  const getNote = () => {
  try {
  } catch (error) {
    // Convert to standardized error format
    throw new Error(
      error.response?.data?.message || error.message || "Network error occurred"
    );
  }
};