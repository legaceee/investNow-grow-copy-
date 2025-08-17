import prisma from "../prisma/client.js";

// User uploads KYC document → status stays PENDING
export const uploadKyc = async (req, res) => {
  try {
    const userId = req.user.id;
    const documentUrl = req.file?.path || req.body.documentUrl; // multer or URL

    if (!documentUrl)
      return res.status(400).json({ message: "Document required" });

    const user = await prisma.user.update({
      where: { id: userId },
      data: { kycDocument: documentUrl, kycStatus: "PENDING" },
      select: { id: true, kycStatus: true, kycDocument: true },
    });

    res.json({ message: "KYC submitted", user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Admin approves/rejects
export const reviewKyc = async (req, res) => {
  try {
    const { userId } = req.params;
    const { decision } = req.body; // "APPROVED" | "REJECTED"
    if (!["APPROVED", "REJECTED"].includes(decision)) {
      return res.status(400).json({ message: "Invalid decision" });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { kycStatus: decision },
      select: { id: true, kycStatus: true },
    });

    res.json({ message: `KYC ${decision}`, user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// (Optional) get my KYC status
export const getMyKyc = async (req, res) => {
  const me = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, kycStatus: true, kycDocument: true },
  });
  res.json(me);
};
