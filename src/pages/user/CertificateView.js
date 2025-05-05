// React component to display certificate
// function CertificateView({ certificate }) {
//   const handleDownload = () => {
//     window.open(certificate.download_url, "_blank");
//   };

//   return (
//     <div className="certificate-container">
//       <h2>{certificate.course.title} Certificate</h2>
//       <p>
//         Issued to: {certificate.user.first_name} {certificate.user.last_name}
//       </p>
//       <p>Certificate ID: {certificate.certificate_number}</p>

//       <button onClick={handleDownload}>Download Certificate</button>

//       <div className="certificate-preview">
//         <iframe
//           src={certificate.download_url}
//           title="Certificate Preview"
//           width="100%"
//           height="500px"
//         />
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import { PDFViewer } from "@react-pdf/renderer";
// import { saveAs } from "file-saver";
// import { fetchCertificate } from "../../services/certificateService";
// import LoadingSpinner from "../../components/LoadingSpinner";
// import { Document, Page } from "@react-pdf/renderer";

// const CertificateViewer = () => {
//   const { certificateId } = useParams();
//   const [pdfUrl, setPdfUrl] = useState(null);

//   const {
//     data: certificate,
//     isLoading,
//     error,
//   } = useQuery(["certificate", certificateId], () =>
//     fetchCertificate(certificateId)
//   );

//   useEffect(() => {
//     if (certificate?.download_url) {
//       setPdfUrl(certificate.download_url);
//     }
//   }, [certificate]);

//   const handleDownload = () => {
//     saveAs(pdfUrl, `Certificate-${certificate.certificate_number}.pdf`);
//   };

//   if (isLoading) return <LoadingSpinner />;
//   if (error) return <div>Error loading certificate</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="bg-white rounded-lg shadow-md p-6 mb-4">
//         <h1 className="text-2xl font-bold mb-4">Certificate of Completion</h1>

//         <div className="mb-4">
//           <p className="text-gray-600">Certificate Number:</p>
//           <p className="font-semibold">{certificate?.certificate_number}</p>
//         </div>

//         <div className="mb-4">
//           <p className="text-gray-600">Awarded To:</p>
//           <p className="font-semibold">
//             {certificate?.user.first_name} {certificate?.user.last_name}
//           </p>
//         </div>

//         <div className="mb-4">
//           <p className="text-gray-600">For Completing:</p>
//           <p className="font-semibold">{certificate?.course.title}</p>
//         </div>

//         <div className="mb-4">
//           <p className="text-gray-600">Completed On:</p>
//           <p className="font-semibold">
//             {new Date(certificate?.completion_date).toLocaleDateString()}
//           </p>
//         </div>

//         <button
//           onClick={handleDownload}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Download Certificate
//         </button>
//       </div>

//       {/* {pdfUrl && (
//         <div className="border rounded-lg overflow-hidden">
//           <PDFViewer width="100%" height="600px">
//             <iframe
//               src={pdfUrl}
//               title="Certificate PDF"
//               width="100%"
//               height="600px"
//               style={{ border: "none" }}
//             />
//           </PDFViewer>
//         </div>
//       )} */}
//       {pdfUrl && (
//         <div className="border rounded-lg overflow-hidden">
//           {/* ❌ PDFViewer shouldn't wrap an iframe */}
//           <iframe
//             src={pdfUrl}
//             title="Certificate PDF"
//             width="100%"
//             height="600px"
//             style={{ border: "none" }}
//           />
//         </div>
//       )}
//       {pdfUrl ? (
//         <div className="border rounded-lg overflow-hidden h-[600px]">
//           <PDFViewer width="100%" height="100%">
//             <Document file={pdfUrl}>
//               <Page pageNumber={1} />
//             </Document>
//           </PDFViewer>
//         </div>
//       ) : (
//         <div className="text-center py-10">Certificate loading...</div>
//       )}
//     </div>
//   );
// };

// export default CertificateViewer;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
import { PDFViewer } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { fetchCertificate } from "../../services/certificateService";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Document, Page } from "@react-pdf/renderer";

const CertificateViewer = () => {
  const { certificateId } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCertificate(certificateId);
        setCertificate(data);
        setPdfUrl(data.download_url);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [certificateId]);
    
     const handleDownload = () => {
    saveAs(pdfUrl, `Certificate-${certificate.certificate_number}.pdf`);
  };

  // Rest of your component remains the same...
  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading certificate</div>;

    return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h1 className="text-2xl font-bold mb-4">Certificate of Completion</h1>

        <div className="mb-4">
          <p className="text-gray-600">Certificate Number:</p>
          <p className="font-semibold">{certificate?.certificate_number}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Awarded To:</p>
          <p className="font-semibold">
            {certificate?.user.first_name} {certificate?.user.last_name}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">For Completing:</p>
          <p className="font-semibold">{certificate?.course.title}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Completed On:</p>
          <p className="font-semibold">
            {new Date(certificate?.completion_date).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download Certificate
        </button>
      </div>
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum deleniti magnam explicabo vel alias sit voluptatum dignissimos. Aliquid, quo eligendi magnam assumenda dicta doloremque ea officia. Esse eveniet officia officiis!
      {/* {pdfUrl && (
        <div className="border rounded-lg overflow-hidden">
          <PDFViewer width="100%" height="600px">
            <iframe
              src={pdfUrl}
              title="Certificate PDF"
              width="100%"
              height="600px"
              style={{ border: "none" }}
            />
          </PDFViewer>
        </div>
      )} */}
      {pdfUrl && (
        <div className="border rounded-lg overflow-hidden">
          {/* ❌ PDFViewer shouldn't wrap an iframe */}
          <iframe
            src={pdfUrl}
            title="Certificate PDF"
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        </div>
      )}
      {pdfUrl ? (
        <div className="border rounded-lg overflow-hidden h-[600px]">
          <PDFViewer width="100%" height="100%">
            <Document file={pdfUrl}>
              <Page pageNumber={1} />
            </Document>
          </PDFViewer>
        </div>
      ) : (
        <div className="text-center py-10">Certificate loading...</div>
      )}
    </div>
  );
};

export default CertificateViewer;
