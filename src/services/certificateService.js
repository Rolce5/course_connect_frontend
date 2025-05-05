import apiClient from "./apiClient";

export const fetchCertificate = async (certificateId) => {
  const response = await apiClient.get(`/certificates/${certificateId}`);
  return response.data;
};

export const generateCertificate = async (courseId) => {
  const response = await apiClient.post(`/certificates/course/${courseId}`);
  return response.data;
};

export const verifyCertificate = async (verificationCode) => {
  const response = await apiClient.get(
    `/certificates/verify/${verificationCode}`
  );
  return response.data;
};
