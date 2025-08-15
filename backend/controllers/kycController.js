import prisma from "../prisma/client.js";

export const uploadKyc = async (req, res) => {
  try {
    const userId = req.user.id;
    const documentUrl = req.file.path; // assuming file upload middleware

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        kycDocument: documentUrl,
        kycStatus: "PENDING",
      },
    });

    res.json({ message: "KYC submitted successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
