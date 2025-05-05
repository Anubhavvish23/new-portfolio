import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// @desc    Get about me info
// @route   GET /api/about
// @access  Public
export const getAboutMe = async (req: Request, res: Response) => {
  try {
    const aboutMe = await prisma.aboutMe.findFirst({
      include: {
        education: true,
        experience: true,
      },
    });

    if (!aboutMe) {
      return res.status(404).json({ message: 'About me information not found' });
    }

    res.json(aboutMe);
  } catch (error) {
    console.error('Error getting about me:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update about me info
// @route   PUT /api/about
// @access  Private/Admin
export const updateAboutMe = async (req: Request, res: Response) => {
  try {
    const {
      education,
      experience,
      ...aboutMeData
    } = req.body;

    // Clean education and experience arrays to remove aboutMeId
    const cleanEducation = (education || []).map(({ aboutMeId, ...rest }) => rest);
    const cleanExperience = (experience || []).map(({ aboutMeId, ...rest }) => rest);

    // Get the current AboutMe record
    const currentAboutMe = await prisma.aboutMe.findFirst();

    if (!currentAboutMe) {
      // Create new AboutMe with relations
      const aboutMe = await prisma.aboutMe.create({
        data: {
          ...aboutMeData,
          education: {
            create: cleanEducation,
          },
          experience: {
            create: cleanExperience,
          },
        },
        include: {
          education: true,
          experience: true,
        },
      });
      return res.json(aboutMe);
    }

    // Update existing AboutMe
    // First, delete existing relations
    await prisma.education.deleteMany({
      where: { aboutMeId: currentAboutMe.id },
    });
    await prisma.experience.deleteMany({
      where: { aboutMeId: currentAboutMe.id },
    });

    // Then update AboutMe with new relations
    const aboutMe = await prisma.aboutMe.update({
      where: { id: currentAboutMe.id },
      data: {
        ...aboutMeData,
        education: {
          create: cleanEducation,
        },
        experience: {
          create: cleanExperience,
        },
      },
      include: {
        education: true,
        experience: true,
      },
    });

    res.json(aboutMe);
  } catch (error) {
    console.error('Error updating about me:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 