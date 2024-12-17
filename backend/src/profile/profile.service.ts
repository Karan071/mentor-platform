import prisma from "../utils/prismaClient";

const getProfileService = async (userId: string) => {
  const profile = await prisma.profile.findUnique({ where: { userId: Number(userId) } });
  if (!profile) {
    throw new Error("Profile not found");
  }
  return profile;
};

export default getProfileService;