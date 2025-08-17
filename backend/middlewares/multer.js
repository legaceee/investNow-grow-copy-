import multer from "multer";
const upload = multer({ dest: "uploads/" });

app.post(
  "/upload-kyc",
  requireAuth,
  upload.single("kycDocument"),
  uploadKycHandler
);
